'use strict';

// const Zookeeper = require('node-zookeeper-client');
import Zookeeper from 'node-zookeeper-client';
import { EventEmitter } from 'events';
import Axios from 'axios';
import FEProps from '@bizfe/fe-prop';

// const EventEmitter = require('events').EventEmitter;
// const Axios = require('axios');
// const FEProps = require('@bizfe/fe-prop');
import getTaskLock from './lock';
import { set } from './share';
import { getDataFromZKNode } from './zkUtil';
import { KoalaConfig, OriginFEProperties, ZKMonitorCache } from './type';

let myLogger;
let client;
let zkConfig: KoalaConfig;
let connected: Boolean = false;

const zkInstancesMap = {};
const LOGGER_TAG_KOALA_ZOOKEEPER = 'KOALA-ZK';
const {
  getServiceList, getErrorMessages, isValid, diff
} = FEProps;

// 配置中心获取fe.properties内容的接口url
const BIZCONF_QUERY_FE_URL =
  '/api/resource/query?groupKey=fe.properties&resourceType=configItem&appId=';

/**
 * 初始化zk客户端信息
 * @param {object} config zk 配置
 * @param {object} logger 日志对象
 */
function init(config: KoalaConfig, logger: any) {
  // 如果已经连接成功，则该方法无需再次执行
  if (connected) {
    return;
  }
  zkConfig = config;

  // 兼容koala用的logger组件
  if (logger && logger.TagLogger) {
    myLogger = new logger.TagLogger(LOGGER_TAG_KOALA_ZOOKEEPER);
  } else if (logger && logger.getLogger) {
    // 使用默认的biz-logger
    myLogger = logger.getLogger(LOGGER_TAG_KOALA_ZOOKEEPER);
  } else {
    myLogger = console;
  }
  set('logger', myLogger);
  initZKClient();
}

function initZKClient() {
  // 初始化全局唯一一个client, 发起连接
  client = Zookeeper.createClient(zkConfig.hosts, {
    sessionTimeout: 30000, // 过期时间
    spinDelay: 1000, // 重连间隔
    retries: 1 // 重试次数
  });

  //   console.log(Buffer.from(zkConfig.auth));
  client.addAuthInfo('digest', Buffer.from(zkConfig.auth));
  client.connectionManager.on('state', state => {
    switch (state) {
      case 0: // DISCONNECTED auto reconnect
        myLogger.error(
          'zookeeper create client timeout,hosts:' + zkConfig.hosts + ',trying to reconnect'
        );
        break;
      case 1: // CONNECTING
        break;
      case 2: // CONNECTED
      case 3: // CONNECTED_READ_ONLY
        myLogger.info('zookeeper CONNECTED');
        Object.keys(zkInstancesMap).forEach(zk => {
          zkInstancesMap[zk].getData();
        });
        connected = true;
        break;
      case -1: // CLOSING
      case -2: // CLOSED
        break;
      case -3: // SESSION_EXPIRED
        myLogger.error('zookeeper SESSION_EXPIRED,trying to reconnect');
        break;
      case -4: // AUTHENTICATION_FAILED
        myLogger.error('zookeeper AUTHENTICATION_FAILED,please check you auth');
        break;
      default:
        break;
    }
  });
  client.connect();
}

/**
 * ZK监听实例
 * 该实例会实现fe.properties节点的自动监听，每当节点有热更新消息时，则会自动拉取最新的fe.properties内容
 */
class ZKMonitor extends EventEmitter {
  public cache: ZKMonitorCache = {
    // old: [{'fe.static.app': 'atlas-fe',...}, {'fe.static.app': 'atlas-new-fe',...}]
  };

  constructor(private readonly nodePath: string) {
    super();

    // 增加观测path
    if (!zkInstancesMap[nodePath]) {
      zkInstancesMap[nodePath] = this;
    }

    if (connected) {
      this.getData();
    }
  }

  private getData() {
    client.getData(
      this.nodePath,
      () => {
        this.getData();
      },
      (error, data) => {
        if (error) {
          myLogger.error(`zookeeper NO_AUTH,please add auth ${error}`);
          return;
          //   return this.emit('update', `zookeeper:NO_AUTH,please add auth${error}`, null);
        }
        if (!data) {
          myLogger.error(`zookeeper Node:${this.nodePath} Data dose not exit`);
          return;
        }
        fetchFEPropertyByAppId(getAppIdFromFENodeInfo(data))
          .then((result: OriginFEProperties) => {
            myLogger.info('result:', result);

            // 配置不符合规范，会emit error事件，业务代码里需要监听该事件，并发送邮件
            if (!isValid(result)) {
              const errorMsg = getErrorMessages(result);
              myLogger.error(errorMsg);
              this.emit('error', errorMsg);
              return;
            }

            this.cache.old = this.cache.latest;
            this.cache.oldOrigin = this.cache.latestOrigin;
            this.cache.latest = addSomeUsefulInfo(getServiceList(result), result);
            this.cache.latestOrigin = result;
            if (this.cache.old) {
              this.cache.diff = diff(this.cache.oldOrigin, this.cache.latestOrigin);
            }

            this.emit('update', null, this.cache.latest);
          })
          .catch(err => {
            this.emit('update', err, null);
          });
      }
    );
  }
}

/**
 * 一次新获取fe.properties的配置信息
 * 有些场景，可能不必监听节点，只是需要动态获取一下zk节点的信息，这个时候可以使用这个方法
 * @param {string} zkNodePath 指定系统的fe.properties zk节点路径
 * @returns {Promise<SimpleFEProperties>} A promise to the token.
 */
function getFEPropertyContent(zkNodePath: string) {
  return new Promise((resolve, reject) => {
    promiseConnected(client, async () => {
      try {
        const data = await getDataFromZKNode(client, zkNodePath);
        const content = await fetchFEPropertyByAppId(getAppIdFromFENodeInfo(data));
        resolve(addSomeUsefulInfo(getServiceList(content), content));
      } catch (err) {
        myLogger.error('getFEPropertyContent invoke failed due to :', err);
        reject(err);
      }
    });
  });
}

// 给结果添加一个后端服务名称字段
function addSomeUsefulInfo(serviceList: any = [], originResult: any = {}) {
  serviceList.forEach(service => {
    service.beApp = originResult.appName;
    service.appId = originResult.appId;
  });
  return serviceList;
}
// 从fe.properties文件的节点信息里提取出appId
function getAppIdFromFENodeInfo(nodeInfo) {
  return nodeInfo.toString('utf8').match(/.+?appId=(\d+)/)[1];
}

// 根据应用实例的appId获取fe.properties文件的配置内容 @param {number} appId 应用实例的id，对应到服务树上的服务实例ID
function fetchFEPropertyByAppId(appId: number) {
  const url = `http://${zkConfig.hostname}/${BIZCONF_QUERY_FE_URL}${appId}`;
  return new Promise((resolve, reject) => {
    Axios.get(url)
      .then(({ data }) => {
        // console.log(data);
        resolve(data);
      })
      .catch(e => {
        myLogger.error(`request[${url}] failed:`, e);
        reject(e);
      });
  });
}

/**
 * 获取ZK的分布式事务锁。
 * 该方法可以用来解决分布式场景中，只允许单个节点执行某一任务的问题。先获取事务锁，获取成功后才可以执行。
 *
 * 一个典型的场景是：koala-version有两台机器负载均衡，同时监听了同一个zk节点，当zk节点更新时，两台机器都会收到消息，都会处理一遍后续的数据库更新逻辑，导致资源浪费、逻辑错误等
 *
 * @param {string} zkPath  zk节点
 * @param {function} callback 获取锁成功或者失败后的回调
 */
function getZKTaskLock(zkPath, callback) {
  promiseConnected(client, () => {
    getTaskLock(client, zkPath)
      .then(result => {
        callback(result);
      })
      .catch(err => {
        callback(false);
        myLogger.error(err);
      });
  });
}

/**
 * 判断给定的zk节点信息是否已经监听过
 * @param {string} zkpath
 * @returns {boolean} 传入的zk节点是否已经在监听
 */
function ZKRegisterd(zkpath) {
  return !!zkInstancesMap[zkpath];
}

function promiseConnected(zkClient, fn) {
  const sessionId = zkClient.getSessionId().toString('hex');
  myLogger.info(parseInt(sessionId, 16));
  if (parseInt(sessionId, 16)) {
    myLogger.info(`promiseConnected sessionId:${sessionId}. client is already connected!`);
    fn();
  } else {
    zkClient.once('connected', fn);
  }
}
export default {
  init,
  ZK: ZKMonitor,
  ZKRegisterd,
  getFEPropertyContent,
  getZKTaskLock
};
