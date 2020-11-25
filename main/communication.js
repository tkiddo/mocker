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
  event.reply('task-done');
});
