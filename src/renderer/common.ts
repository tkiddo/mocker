/*
 * @Author: tkiddo
 * @Date: 2020-11-25 15:48:35
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-10 14:39:13
 * @Description: 公共
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';

import { showToast } from './toast';

// 主进程任务反馈
ipcRenderer.on('task-feedback', (event, feedback) => {
  showToast(feedback);
});
