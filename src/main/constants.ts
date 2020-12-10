/*
 * @Author: tkiddo
 * @Date: 2020-12-03 09:30:05
 * @LastEditTime: 2020-12-10 10:07:51
 * @LastEditors: tkiddo
 * @Description: 常量
 */

import { resolve } from 'path';

export const rootDirectory = `${
  process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']
}/.mocker`;

export const mockDirectory = resolve(rootDirectory, './mock');

export const listFilePath = resolve(rootDirectory, './tplList.json');
