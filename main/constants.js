/*
 * @Description: 常量
 * @Author: tkiddo
 * @Date: 2020-12-03 09:30:05
 * @LastEditTime: 2020-12-03 09:32:53
 * @LastEditors: tkiddo
 */
const path = require('path');

const rootDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}`;

const listFilePath = path.resolve(rootDirectory, './local/tplList.json');

module.exports = { rootDirectory, listFilePath };
