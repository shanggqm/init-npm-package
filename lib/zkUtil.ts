// import { OriginFEProperties } from './type';
// import { pick } from 'lodash';

const ZKClient = require('node-zookeeper-client');
const Share = require('./share');

/**
 * 获取指定zk节点上的数据
 *
 * @param {object} client zk 客户端实例
 * @param {string} nodePath zk节点路径
 */
export function getDataFromZKNode(client: any, nodePath: string) {
  return new Promise(resolve => {
    client.getData(
      nodePath,
      event => {
        Share.get('logger').debug(` getData watcher triggered： ${event}`);
      },
      (error, data /*    , stat */) => {
        if (error) {
          throw new Error(`获取zk节点${nodePath}数据失败，原因：${error}`);
        }

        resolve(data.toString('utf8'));
      }
    );
  });
}

/**
 * 判断给定的zk节点路径是否已经存在
 *
 * @param {object} client zk 客户端实例
 * @param {string} dir  待判断是否存在的zk节点路径
 */
export function isExistZKNode(client, dir: string) {
  return new Promise(resolve => {
    client.exists(dir, (error, stat) => {
      if (error) {
        // myLogger.error('isExistZKNode: ', error);
        throw new Error(`判断zookeeper节点是否存在发生异常: ${error}`);
      }
      resolve(stat);
    });
  });
}

/**
 *
 * @param {object} client zk 客户端实例
 * @param {string} path  zk节点路径
 * @param {object} data 节点数据
 * @param {string} mode 节点类型，默认是持久类型
 */
export function createZKNode(
  client,
  path: string,
  data = null,
  mode = ZKClient.CreateMode.PERSISTENT
) {
  return new Promise((resolve, reject) => {
    client.create(path, data, mode, error => {
      if (error) {
        // myLogger.error('createZKNode: ', error);
        reject(`Failed to create zk node: ${path} due to: ${error}`);
      }

      resolve(true);
    });
  });
}
