const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "MesMind-Map 1.0",
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Загрузка графического ядра
  win.loadURL('https://web.sxmind.cn/');

  // Принудительное включение русского языка и удаление китайского
  win.webContents.on('did-finish-load', () => {
    win.setTitle("MesMind-Map 1.0");

    win.webContents.executeJavaScript(`
      // 1. Принудительно устанавливаем русский язык в локальное хранилище
      localStorage.setItem('SIMPLE_MIND_MAP_LANG', 'ru');
      localStorage.setItem('MIND_MAP_LANG', 'ru');
      localStorage.setItem('lang', 'ru');

      // 2. Скрываем китайские элементы интерфейса и логотипы
      const style = document.createElement('style');
      style.innerHTML = \`
        /* Скрываем китайские баннеры и ссылки на сторонние сервисы */
        .header .logo { display: none !important; }
        .el-select-dropdown__item:has(span:contains("中文")) { display: none !important; }
      \`;
      document.head.appendChild(style);
    `);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
