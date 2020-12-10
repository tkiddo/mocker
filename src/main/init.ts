/*
 * @Author: tkiddo
 * @Date: 2020-12-03 09:22:38
 * @LastEditTime: 2020-12-10 10:25:04
 * @LastEditors: tkiddo
 * @Description: 程序初始化
 */
import * as fs from 'fs';

import { listFilePath, mockDirectory } from './constants';

if (!fs.existsSync(mockDirectory)) {
  fs.mkdirSync(mockDirectory, { recursive: true });
}

if (!fs.existsSync(listFilePath)) {
  fs.writeFileSync(listFilePath, JSON.stringify([], null, 2));
}
