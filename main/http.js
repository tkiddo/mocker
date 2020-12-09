/*
 * @Author: tkiddo
 * @Date: 2020-12-02 16:06:35
 * @LastEditTime: 2020-12-09 14:44:17
 * @LastEditors: tkiddo
 * @Description: http服务
 */

// http-server
const express = require('express');

const path = require('path');
const { mockDirectory } = require('./constants');
const { readFile } = require('../utils/util');

const server = express();
const port = 8080;

const allowCrossDomain = (req, res, next) => {
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

server.listen(port, () => console.log(`mocker listening on port ${port}!`));
