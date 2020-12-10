/*
 * @Author: tkiddo
 * @Date: 2020-12-02 16:20:17
 * @LastEditTime: 2020-12-10 14:23:34
 * @LastEditors: tkiddo
 * @Description: 数据生成
 */

import Mock from 'mockjs';
import Template from "../modal/template";

export default function mockData(template:Template) {
  const data = Mock.mock({
    'data|1-10': [template]
  });

  return data;
}
