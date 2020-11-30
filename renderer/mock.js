/*
 * @Description: mock
 * @Author: tkiddo
 * @Date: 2020-11-24 14:54:19
 * @LastEditTime: 2020-11-30 16:27:34
 * @LastEditors: tkiddo
 */
const Mock = require('mockjs');

exports.mockData = (template) => {
  const data = Mock.mock('http:localhost:9100/data', {
    'data|1-30': [template]
  });

  fetch('http://localhost:9100/data')
    .then((res) => res.json())
    .then((res) => console.log(res));
  console.log(data);
};
