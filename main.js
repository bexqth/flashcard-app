const path = require('path');
const { app, BrowserWindow } = require('electron');

require('electron-reload')([
  path.join(__dirname, 'src/renderer'),           
  path.join(__dirname, 'src/main'),               
  path.join(__dirname, 'assets'),                 
], {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  ignored: /main\.js/,
});

const databaseHelper = require('./src/main/database/database_helper');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('src/renderer/views/window/index.html');
}

app.whenReady().then(createWindow);

app.on('before-quit', () => {
    databaseHelper.close();
});
