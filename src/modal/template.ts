/*
 * @Author: tkiddo
 * @Date: 2020-12-10 11:16:44
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-10 17:14:59
 * @Description: template 模板接口
 */

import Property from './property';

export default interface ITemplate {
  name: string;
  properties: Property[];
}
