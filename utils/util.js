const fs = require('fs');
const { join } = require('path');

exports.readFile = (filePath) => JSON.parse(fs.readFileSync(join(filePath).toString()));

exports.writeFile = (filePath, content, cb = () => {}) => {
  fs.writeFile(filePath, JSON.stringify(content, null, 2), cb);
};

exports.isRepeated = (source, target) => source.findIndex((item) => item.name === target) !== -1;
