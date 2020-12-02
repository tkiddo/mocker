/*
 * @Description:公共事件处理
 * @Author: tkiddo
 * @Date: 2020-11-25 15:48:35
 * @LastEditTime: 2020-12-02 15:47:35
 * @LastEditors: tkiddo
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');

const { showToast } = require('./toast');

// 主进程任务反馈
ipcRenderer.on('task-feedback', (event, feedback) => {
  showToast(feedback);
});
