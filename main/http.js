/*
 * @Description: http服务
 * @Author: tkiddo
 * @Date: 2020-12-02 16:06:35
 * @LastEditTime: 2020-12-03 10:36:25
 * @LastEditors: tkiddo
 */

// http-server
const express = require('express');

const path = require('path');
const { mockDirectory } = require('./constants');
const { readFile } = require('../utils/util');

const server = express();
const port = 8080;

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
server.use(allowCrossDomain);

server.get('/', (req, res) => res.send('Hello World!'));

server.get('/mock/:name', (req, res) => {
  const { name } = req.params;
  const result = readFile(path.join(mockDirectory, `./${name}.json`));
  res.json(result);
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
