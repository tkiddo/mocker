/*
 * @Author: tkiddo
 * @Date: 2020-12-10 17:12:57
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-17 14:21:22
 * @Description: 进程间传递的数据
 */

export default interface IPayload<T> {
  target?: string;
  data: T;
}
