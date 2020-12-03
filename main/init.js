/*
 * @Description: 程序初始化
 * @Author: tkiddo
 * @Date: 2020-12-03 09:22:38
 * @LastEditTime: 2020-12-03 20:55:19
 * @LastEditors: tkiddo
 */
const fs = require('fs');

const { listFilePath, mockDirectory } = require('./constants');

if (!fs.existsSync(mockDirectory)) {
  fs.mkdirSync(mockDirectory, { recursive: true });
}

if (!fs.existsSync(listFilePath)) {
  fs.writeFileSync(listFilePath, JSON.stringify([], null, 2));
}
