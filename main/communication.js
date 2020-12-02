/*
 * @Description: 与渲染进程沟通
 * @Author: tkiddo
 * @Date: 2020-11-26 15:20:27
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-02 10:14:33
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
  original.unshift(item);
  writeFile(filePath, original);
  event.reply('tpl-item-added', item);
});

ipcMain.on('remove-tpl-item', (event, name) => {
  const original = readFile(filePath);
  original.splice(
    original.findIndex((item) => item.name === name),
    1
  );
  writeFile(filePath, original);
});

ipcMain.on('update-tpl-item', (event, payload) => {
  const original = readFile(filePath);
  const index = original.findIndex((item) => item.name === payload.name);
  original.splice(index, 1, payload);
  writeFile(filePath, original);
});
