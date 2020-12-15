/*
 * @Author: tkiddo
 * @Date: 2020-11-26 15:20:27
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-15 16:19:01
 * @Description: 与渲染进程沟通
 */

/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from 'electron';
import { join, resolve } from 'path';
import { readFile, writeFile, isRepeated, removeFile } from '../utils/util';
import mockData from './mock';

import { listFilePath, mockDirectory } from './constants';

import ITemplate from '../model/template';
import IProperty from '../model/property';
import IPayload from '../model/payload';

import { register } from '../utils/rpc';

ipcMain.on('get-tpl-list', (event) => {
  event.returnValue = readFile(listFilePath);
});

register('add-tpl-item', (event, payload: IPayload<ITemplate>) => {
  const original = readFile(listFilePath);
  const { data } = payload;
  if (isRepeated(original, data.name)) {
    event.reply('task-feedback', '名称已存在!');
    return;
  }
  original.unshift(data);
  writeFile(listFilePath, original);
  event.reply('tpl-item-added', data);
});

ipcMain.on('remove-tpl-item', (event, payload: IPayload<string>) => {
  const original = readFile(listFilePath);
  const { data } = payload;
  original.splice(
    original.findIndex((item: ITemplate) => item.name === data),
    1
  );
  writeFile(listFilePath, original);
  const file = join(mockDirectory, `./${data}.json`);
  removeFile(file);
});

ipcMain.on('mock-data', (event, payload) => {
  const { name, ITemplate } = payload;
  const data = mockData(ITemplate);
  const dest = resolve(mockDirectory, `./${name}.json`);
  writeFile(dest, data, () => {
    event.reply('task-feedback', '数据生成！');
  });
});

ipcMain.on('add-tpl-property', (event, tpl, data) => {
  const { name, type } = data;
  const list = readFile(listFilePath);
  const item = list.find((el: ITemplate) => el.name === tpl);
  if (isRepeated(item.properties, name)) {
    event.returnValue = null;
  } else {
    item.properties.push({ name, type });
    writeFile(listFilePath, list);
    event.returnValue = data;
  }
});

ipcMain.on('remove-tpl-property', (event, data) => {
  const { tpl, name } = data;
  const list = readFile(listFilePath);
  const item = list.find((el: ITemplate) => el.name === tpl);
  const idx = item.properties.findIndex((el: IProperty) => el.name === name);
  item.properties.splice(idx, 1);
  writeFile(listFilePath, list);
});
