/*
 * @Description: 程序初始化
 * @Author: tkiddo
 * @Date: 2020-12-03 09:22:38
 * @LastEditTime: 2020-12-03 09:28:44
 * @LastEditors: tkiddo
 */
const fs = require('fs');
const path = require('path');
const { writeFile } = require('../utils/util');

const rootDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}`;

const filePath = path.resolve(rootDirectory, './local/tplList.json');

if (!fs.existsSync(filePath)) {
  writeFile(filePath, []);
}
