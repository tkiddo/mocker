/*
 * @Author: tkiddo
 * @Date: 2020-11-26 15:20:27
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-17 14:26:50
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
import IMockOption from '../model/mockOption';

import { registerMain } from '../utils/rpc';

ipcMain.on('get-tpl-list', (event) => {
  event.returnValue = readFile(listFilePath);
});

registerMain('add-tpl-item', (event, payload: IPayload<ITemplate>) => {
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

registerMain('remove-tpl-item', (event, payload: IPayload<string>) => {
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

registerMain('mock-data', (event, payload: IPayload<IMockOption>) => {
  const {
    data: { template, destination }
  } = payload;
  const data = mockData(template);
  const dest = resolve(mockDirectory, `./${destination}.json`);
  writeFile(dest, data, () => {
    event.reply('task-feedback', '数据生成！');
  });
});

registerMain('add-tpl-property', (event, payload: IPayload<IProperty>) => {
  const {
    target,
    data: { name, type }
  } = payload;
  const list = readFile(listFilePath);
  const item = list.find((el: ITemplate) => el.name === target);
  if (isRepeated(item.properties, name)) {
    event.returnValue = null;
  } else {
    item.properties.push({ name, type });
    writeFile(listFilePath, list);
    event.returnValue = name;
  }
});

registerMain('remove-tpl-property', (event, payload: IPayload<IProperty>) => {
  const {
    target,
    data: { name }
  } = payload;
  const list = readFile(listFilePath);
  const item = list.find((el: ITemplate) => el.name === target);
  const idx = item.properties.findIndex((el: IProperty) => el.name === name);
  item.properties.splice(idx, 1);
  writeFile(listFilePath, list);
});
