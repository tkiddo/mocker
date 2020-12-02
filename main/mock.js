/*
 * @Description: 数据生成
 * @Author: tkiddo
 * @Date: 2020-12-02 16:20:17
 * @LastEditTime: 2020-12-02 16:20:36
 * @LastEditors: tkiddo
 */

const Mock = require('mockjs');

exports.mockData = (template) => {
  const data = Mock.mock({
    'data|1-10': [template]
  });

  return data;
};
