/*
 * @Description: 与渲染进程沟通
 * @Author: tkiddo
 * @Date: 2020-11-26 15:20:27
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-11-26 16:00:05
 */
/* eslint-disable no-param-reassign */
const { ipcMain } = require('electron');
const { join } = require('path');
const { readFile, writeFile, isRepeated } = require('../utils/util');

const filePath = join(__dirname, '../share/tplList.json');

ipcMain.on('get-tpl-list', (event) => {
  event.returnValue = readFile(filePath);
});

ipcMain.on('add-tpl-item', (event, item) => {
  const original = readFile(filePath);
  if (isRepeated(original, item.name)) {
    event.reply('task-error', '名称已存在');
    return;
  }
  original.push(item);
  writeFile(filePath, original);
  event.reply('tpl-item-added', item);
});
