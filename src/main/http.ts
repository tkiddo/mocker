/*
 * @Author: tkiddo
 * @Date: 2020-12-02 16:06:35
 * @LastEditTime: 2020-12-10 14:01:38
 * @LastEditors: tkiddo
 * @Description: http服务
 */

// http-server
import express,{Request,Response} from 'express';

import path from 'path';
import { mockDirectory } from './constants';
import { readFile } from '../utils/util';

const server = express();
const port = 8080;

const allowCrossDomain = (req:Request, res:Response, next:Function) => {
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
