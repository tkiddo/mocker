/*
 * @Description: main.js
 * @Author: tkiddo
 * @Date: 2020-11-19 14:43:04
 * @LastEditTime: 2020-12-17 14:31:04
 * @LastEditors: tkiddo
 */
// Modules to control application life and create native browser window

// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const debug = /--debug/.test(process.argv[2]);

if (process.mas) app.setName('Mocker');

let mainWindow: BrowserWindow | null = null;
// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance(): void {
  if (process.mas) return;

  app.requestSingleInstanceLock();

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function initialize() {
  const windowOptions = {
    width: 1080,
    minWidth: 680,
    height: 840,
    title: app.getName(),
    webPreferences: {
      preload: path.join(__dirname, 'preload'),
      nodeIntegration: true
    }
  };
  function createWindow() {
    makeSingleInstance();
    // Create the browser window.
    mainWindow = new BrowserWindow(windowOptions);

    // and load the index.html of the app.
    mainWindow.loadURL(path.join('file://', __dirname, '../index.html'));

    if (debug) {
      // Open the DevTools.
      mainWindow.webContents.openDevTools();
    }

    // mainWindow.on('close', () => {
    //   mainWindow = null;
    // });
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
  // eslint-disable-next-line global-require
  require('./main/index.ts');
}

initialize();

console.log('hello');
