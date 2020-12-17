/*
 * @Author: tkiddo
 * @Date: 2020-12-02 16:20:17
 * @LastEditTime: 2020-12-17 14:24:02
 * @LastEditors: tkiddo
 * @Description: 数据生成
 */

import Mock from 'mockjs';

export default function mockData(template: object) {
  const data = Mock.mock({
    'data|1-10': [template]
  });

  return data;
}
