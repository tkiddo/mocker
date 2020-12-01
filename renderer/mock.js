/*
 * @Description: mock
 * @Author: tkiddo
 * @Date: 2020-11-24 14:54:19
 * @LastEditTime: 2020-12-01 15:38:46
 * @LastEditors: tkiddo
 */
const Mock = require('mockjs');

exports.mockData = (template) => {
  const data = Mock.mock({
    'data|1-10': [template]
  });

  return data;
};
