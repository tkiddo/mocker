/*
 * @Author: tkiddo
 * @Date: 2020-11-26 15:20:27
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-08 22:08:46
 * @Description: 与渲染进程沟通
 */

/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
const { join, resolve } = require('path');
const { readFile, writeFile, isRepeated, removeFile } = require('../utils/util');
const { mockData } = require('./mock');

const { listFilePath, mockDirectory } = require('./constants');

ipcMain.on('get-tpl-list', (event) => {
  event.returnValue = readFile(listFilePath);
});

ipcMain.on('add-tpl-item', (event, item) => {
  const original = readFile(listFilePath);
  if (isRepeated(original, item.name)) {
    event.reply('task-feedback', '名称已存在!');
    return;
  }
  original.unshift(item);
  writeFile(listFilePath, original);
  event.reply('tpl-item-added', item);
});

ipcMain.on('remove-tpl-item', (event, name) => {
  const original = readFile(listFilePath);
  original.splice(
    original.findIndex((item) => item.name === name),
    1
  );
  writeFile(listFilePath, original);
  const file = join(mockDirectory, `./${name}.json`);
  removeFile(file);
});

ipcMain.on('update-tpl-item', (event, payload) => {
  const original = readFile(listFilePath);
  const index = original.findIndex((item) => item.name === payload.name);
  original.splice(index, 1, payload);
  writeFile(listFilePath, original, () => {
    event.reply('task-feedback', '保存成功！');
  });
});

ipcMain.on('mock-data', (event, payload) => {
  const { name, template } = payload;
  const data = mockData(template);
  const dest = resolve(mockDirectory, `./${name}.json`);
  writeFile(dest, data, () => {
    event.reply('task-feedback', '数据生成！');
  });
});

ipcMain.on('add-tpl-property', (event, data) => {
  const { tpl, name, type } = data;
  const list = readFile(listFilePath);
  const item = list.find((el) => el.name === tpl);
  if (isRepeated(item.properties, name)) {
    event.returnValue = null;
  } else {
    item.properties.push({ name, type });
    writeFile(listFilePath, list);
    event.returnValue = data;
  }
});
