/*
 * @Description: 程序初始化
 * @Author: tkiddo
 * @Date: 2020-12-03 09:22:38
 * @LastEditTime: 2020-12-03 10:13:54
 * @LastEditors: tkiddo
 */
const fs = require('fs');

const { listFilePath, rootDirectory, mockDirectory } = require('./constants');
const { mkdirSync } = require('../utils/util');

if (!fs.existsSync(rootDirectory)) {
  mkdirSync(rootDirectory);
}

if (!fs.existsSync(mockDirectory)) {
  mkdirSync(mockDirectory);
}

if (!fs.existsSync(listFilePath)) {
  fs.writeFileSync(listFilePath, JSON.stringify([], null, 2));
}
