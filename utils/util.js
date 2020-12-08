/*
 * @Author: tkiddo
 * @Date: 2020-11-25 15:33:00
 * @LastEditTime: 2020-12-08 14:48:51
 * @LastEditors: tkiddo
 * @Description: 工具函数
 */
const fs = require('fs');
const { join } = require('path');

/**
 * @description: 读取文件内容
 * @param {String} filePath
 * @return {Object}
 */
exports.readFile = (filePath) => JSON.parse(fs.readFileSync(join(filePath).toString()));

/**
 * @description: 写入文件内容
 * @param {String} filePath
 * @param {*} content
 * @param {Function} cb
 * @return {*}
 */
exports.writeFile = (filePath, content, cb = () => {}) => {
  fs.writeFile(filePath, JSON.stringify(content, null, 2), cb);
};

/**
 * @description: 判重
 * @param {Array} source
 * @param {Object} target
 * @return {Boolean}
 */
exports.isRepeated = (source, target) => source.findIndex((item) => item.name === target) !== -1;

/**
 * @description:删除文件
 * @param {String} filePath
 * @param {Function} cb
 * @return {*}
 */
exports.removeFile = (filePath, cb = () => {}) => {
  fs.unlink(filePath, cb);
};
