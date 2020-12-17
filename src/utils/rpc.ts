/*
 * @Author: tkiddo
 * @Date: 2020-12-15 16:02:08
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-17 14:08:07
 * @Description: rpc
 */

import { ipcMain, ipcRenderer, IpcMainEvent, IpcRendererEvent } from 'electron';
import IPayload from '../model/payload';

export const send = <T>(event: string, payload: IPayload<T>) => {
  ipcRenderer.send(event, payload);
};

interface IMainCallback<T> {
  (event: IpcMainEvent, payload: IPayload<T>): void;
}

interface IRendererCallback<T> {
  (event: IpcRendererEvent, payload: IPayload<T>): void;
}

export const registerMain = <T>(event: string, cb: IMainCallback<T>) => {
  ipcMain.on(event, cb);
};

export const registerRenderer = <T>(event: string, cb: IRendererCallback<T>) => {
  ipcRenderer.on(event, cb);
};
