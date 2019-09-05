'use strict';

const { CreateMode } = require('node-zookeeper-client');
const ip = require('ip');
const { isExistZKNode, createZKNode, getDataFromZKNode } = require('./zkUtil');
const { get } = require('./share');
const ZKPATH_SPLITE = '/';

let invokeID = 0;
/**
 * 通过创建zk临时节点的方式来模拟分布式事务锁
 *
 * @param {object} client zk客户端实例
 * @param {string} path zk节点路径
 * @param {object} logger logger实例
 */
async function getTaskLock(client, path) {
  invokeID += 1;
  const currentInvokeID = invokeID;
  const { error, info } = get('logger');
  if (!path) {
    throw new Error(`[invokeID: ${currentInvokeID}] getTaskLock参数 path 不能为空`);
  }

  function infoWithInvoke(s) {
    info(`[invokeID: ${currentInvokeID}] ${s}`);
  }

  // 从给定的zk节点路径中截取倒数第二级路径
  // eg: /koala/tasklock/koala-version  -> /koala/tasklock
  const direction = path.substring(0, path.lastIndexOf(ZKPATH_SPLITE));
  infoWithInvoke(` direction: {${direction}}`);

  try {
    // 确保目标节点的路径目录存在，这个目录应该是持久化的
    const isDirExisted = await isExistZKNode(client, direction);
    if (!isDirExisted) {
      // 创建节点
      infoWithInvoke(` 目录节点${direction}不存在，尝试创建该节点...`);
      await createZKNode(client, direction);
      infoWithInvoke(` 目录节点${direction}创建完成`);
    }

    // 再次从云端确认目标临时zk节点是否存在，如果存在，尝试获取节点信息
    const isEphemeralNodeExisted = await isExistZKNode(client, path);
    if (isEphemeralNodeExisted) {
      infoWithInvoke(` 临时节点${path}存在，尝试获取节点${path}信息并进行比较...`);
      // getData，获取节点信息，看节点信息和本机ip是否相同，相同代表的是本机创建的，任务应该交由本机来完成
      let data = await getDataFromZKNode(client, path);
      data = data.toString('utf8');
      // 节点中存机器的ip
      infoWithInvoke(` 节点:${path}信息： ${data}`);
      const ipValue = ip.address();

      if (data === ipValue) {
        infoWithInvoke(
          ` 节点:${path}信息： ${data}和当前机器的ip值：${ipValue}匹配成功，获取任务锁成功！`
        );
        return true;
      } else {
        infoWithInvoke(
          ` 节点:${path}信息： ${data}和当前机器的ip值：${ipValue}匹配失败，获取任务锁失败！`
        );
      }
    } else {
      const bufferData = Buffer.from(ip.address());
      // 创建临时节点
      infoWithInvoke(` 临时节点${path}不存在，尝试创建临时节点，内容为：${bufferData.toString()}`);
      await createZKNode(client, path, bufferData, CreateMode.EPHEMERAL);
      infoWithInvoke(`临时节点${path}创建完成，获取任务锁成功！`);

      return true;
    }
  } catch (e) {
    error(
      `[invokeID: ${currentInvokeID}] getTaskLock on zk path：${direction} failed! due to ${e}`
    );
  }
  return false;
}

export default getTaskLock;
