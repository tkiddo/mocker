/*
 * @Description: 与渲染进程沟通
 * @Author: tkiddo
 * @Date: 2020-11-26 15:20:27
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-02 16:48:31
 */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
const { join, resolve } = require('path');
const { readFile, writeFile, isRepeated, removeFile } = require('../utils/util');
const { mockData } = require('./mock');

const filePath = join(__dirname, '../share/tplList.json');

ipcMain.on('get-tpl-list', (event) => {
  event.returnValue = readFile(filePath);
});

ipcMain.on('add-tpl-item', (event, item) => {
  const original = readFile(filePath);
  if (isRepeated(original, item.name)) {
    event.reply('task-feedback', '名称已存在');
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
  const file = join(__dirname, `../mock/${name}.json`);
  removeFile(file);
});

ipcMain.on('update-tpl-item', (event, payload) => {
  const original = readFile(filePath);
  const index = original.findIndex((item) => item.name === payload.name);
  original.splice(index, 1, payload);
  writeFile(filePath, original, () => {
    event.reply('task-feedback', '保存成功！');
  });
});

ipcMain.on('mock-data', (event, payload) => {
  const { name, template } = payload;
  const data = mockData(template);
  const dest = resolve(__dirname, `../mock/${name}.json`);
  writeFile(dest, data, () => {
    event.reply('task-feedback', '数据生成！');
  });
});
