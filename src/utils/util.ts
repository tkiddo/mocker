/*
 * @Author: tkiddo
 * @Date: 2020-11-25 15:33:00
 * @LastEditTime: 2020-12-10 14:31:59
 * @LastEditors: tkiddo
 * @Description: 工具函数
 */
import * as fs from 'fs';

/**
 * @description: 读取文件内容
 * @param {String} filePath
 * @return {Object}
 */
// eslint-disable-next-line max-len
export const readFile = (filePath:string):any => JSON.parse(fs.readFileSync(filePath).toString());

/**
 * @description: 写入文件内容
 * @param {String} filePath
 * @param {*} content
 * @param {Function} cb
 * @return {*}
 */
export const writeFile = (filePath:string, content:unknown, cb = () => {}):void => {
  fs.writeFile(filePath, JSON.stringify(content, null, 2), cb);
};

/**
 * @description: 判重
 * @param {Array} source
 * @param {String} target
 * @return {Boolean}
 */
interface Element{
  name:string;
}
// eslint-disable-next-line max-len
export const isRepeated = (source:[Element], target:string):boolean => source.findIndex((item) => item.name === target) !== -1;
/**
 * @description:删除文件
 * @param {String} filePath
 * @param {Function} cb
 * @return {*}
 */
export const removeFile = (filePath:string, cb = () => {}):void => {
  fs.unlink(filePath, cb);
};
