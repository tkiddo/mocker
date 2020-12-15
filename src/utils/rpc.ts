/*
 * @Author: tkiddo
 * @Date: 2020-12-15 16:02:08
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-15 16:17:14
 * @Description: rpc
 */

import { ipcMain, ipcRenderer, IpcMainEvent } from 'electron';
import IPayload from '../model/payload';

export const send = <T>(event: string, payload: IPayload<T>) => {
  ipcRenderer.send(event, payload);
};

interface Callback<T> {
  (event: IpcMainEvent, payload: IPayload<T>): void;
}

export const register = <T>(event: string, cb: Callback<T>) => {
  ipcMain.on(event, cb);
};
