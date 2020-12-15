/*
 * @Author: tkiddo
 * @Date: 2020-12-10 17:12:57
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-15 16:20:50
 * @Description: 进程间传递的数据
 */

export default interface IPayload<T> {
  type?: string;
  data: T;
}
