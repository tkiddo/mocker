/*
 * @Author: tkiddo
 * @Date: 2020-11-25 15:48:35
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-08 14:40:26
 * @Description: 公共
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');

const { showToast } = require('./toast');

// 主进程任务反馈
ipcRenderer.on('task-feedback', (event, feedback) => {
  showToast(feedback);
});
