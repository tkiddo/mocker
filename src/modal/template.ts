/*
 * @Author: tkiddo
 * @Date: 2020-12-10 11:16:44
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-10 15:30:01
 * @Description: template 模板接口
 */

import Property from './property';

export default interface Template {
  name: string;
  properties: Property[];
}
