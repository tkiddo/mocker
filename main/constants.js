/*
 * @Author: tkiddo
 * @Date: 2020-12-03 09:30:05
 * @LastEditTime: 2020-12-08 14:42:35
 * @LastEditors: tkiddo
 * @Description: 常量
 */

const path = require('path');

const rootDirectory = `${
  process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']
}/.mocker`;

const mockDirectory = path.resolve(rootDirectory, './mock');

const listFilePath = path.resolve(rootDirectory, './tplList.json');

module.exports = { rootDirectory, listFilePath, mockDirectory };
