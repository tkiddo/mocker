/*
 * @Description:
 * @Author: tkiddo
 * @Date: 2020-11-25 15:33:00
 * @LastEditTime: 2020-12-03 09:52:08
 * @LastEditors: tkiddo
 */
const fs = require('fs');
const { join, sep } = require('path');

exports.readFile = (filePath) => JSON.parse(fs.readFileSync(join(filePath).toString()));

exports.writeFile = (filePath, content, cb = () => {}) => {
  fs.writeFile(filePath, JSON.stringify(content, null, 2), cb);
};

exports.isRepeated = (source, target) => source.findIndex((item) => item.name === target) !== -1;

exports.removeFile = (filePath, cb = () => {}) => {
  fs.unlink(filePath, cb);
};

exports.mkdirSync = (dirpath) => {
  if (!fs.existsSync(dirpath)) {
    let pathtmp;
    dirpath.split(sep).forEach((dirname) => {
      if (pathtmp) {
        pathtmp = join(pathtmp, dirname);
      } else {
        pathtmp = dirname;
      }
      if (!fs.existsSync(pathtmp)) {
        if (!fs.mkdirSync(pathtmp)) {
          return false;
        }
      }
    });
  }
  return true;
};
