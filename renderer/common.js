/*
 * @Description:公共事件处理
 * @Author: tkiddo
 * @Date: 2020-11-25 15:48:35
 * @LastEditTime: 2020-11-26 10:34:32
 * @LastEditors: tkiddo
 */
const { ipcRenderer } = require('electron');

// 主进程错误处理
ipcRenderer.on('task-error', (event, msg) => {
  console.log('error:', msg);
});
