const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1366,
    height: 850,
    title: "MesMind-Map 1.0",
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Запуск русскоязычного полнофункционального движка
  win.loadURL('https://web.sxmind.cn/');

  win.webContents.on('did-finish-load', () => {
    win.setTitle("MesMind-Map 1.0");
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
