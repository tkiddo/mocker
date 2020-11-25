const { ipcRenderer } = require('electron');

ipcRenderer.on('task-error', (event, msg) => {
  console.log('error:', msg);
});
