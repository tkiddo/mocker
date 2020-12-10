/*
 * @Author: tkiddo
 * @Date: 2020-12-02 16:20:17
 * @LastEditTime: 2020-12-10 17:16:18
 * @LastEditors: tkiddo
 * @Description: 数据生成
 */

import Mock from 'mockjs';
import ITemplate from '../modal/template';

export default function mockData(template: ITemplate) {
  const data = Mock.mock({
    'data|1-10': [template]
  });

  return data;
}
