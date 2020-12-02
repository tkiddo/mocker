/*
 * @Description:
 * @Author: tkiddo
 * @Date: 2020-11-25 15:33:00
 * @LastEditTime: 2020-12-02 16:47:13
 * @LastEditors: tkiddo
 */
const fs = require('fs');
const { join } = require('path');

exports.readFile = (filePath) => JSON.parse(fs.readFileSync(join(filePath).toString()));

exports.writeFile = (filePath, content, cb = () => {}) => {
  fs.writeFile(filePath, JSON.stringify(content, null, 2), cb);
};

exports.isRepeated = (source, target) => source.findIndex((item) => item.name === target) !== -1;

exports.removeFile = (filePath, cb = () => {}) => {
  fs.unlink(filePath, cb);
};
