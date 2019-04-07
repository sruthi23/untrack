/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import {
  app,
  BrowserWindow,
  shell,
  dialog,
  Tray,
  Menu,
  nativeImage,
  ipcMain
} from 'electron';
import log from 'electron-log';
import MenuBuilder from './menu';

const path = require('path');

let mainWindow;
let tray;
let trayIcon;

// Determine appropriate icon for platform
if (process.platform == 'darwin') {
  trayIcon = path.join(__dirname, 'assets/icons/png', '16x16.png');
} else if (process.platform == 'win32') {
  trayIcon = path.join(__dirname, 'assets/icons/win', 'app.ico');
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.close();
  }
});

// Creates tray image & toggles window on click
const createTray = () => {
  tray = new Tray(trayIcon);
  tray.on('click', event => {
    toggleWindow();
  });

  tray.on('double-click', event => {
    toggleWindow();
  });
  tray.setToolTip('Untrack');
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Open Untrack',
        click() {
          mainWindow.show();
        }
      },
      {
        label: 'Quit',
        click() {
          app.isQuiting = true;
          app.quit();
        }
      }
    ])
  );
};

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
};

const showWindow = () => {
  mainWindow.show();
  mainWindow.focus();
  app.dock.show();
};

ipcMain.on('show-window', () => {
  showWindow();
});
ipcMain.on('toggle-untrack', (event, arg) => {
  arg === false
    ? tray.setImage(path.join(__dirname, 'assets/icons/png', '16x16-grey.png'))
    : tray.setImage(path.join(__dirname, 'assets/icons/png', '16x16.png'));
});

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    title: 'Untrack',
    titleBarStyle: 'hiddenInset',
    width: 800,
    height: 560,
    minWidth: 800,
    minHeight: 560,
    'node-integration': true,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  });
  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  mainWindow.on('close', event => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      mainWindow.setSkipTaskbar(true);
      app.dock.hide();
    }
    return false;
  });
};
app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }
  createWindow();
  createTray();
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

process.on('uncaughtException', error => {
  const messageBoxOptions = {
    type: 'error',
    title: 'Error in Main process',
    message: 'Error in Main process'
  };
  dialog.showMessageBox(messageBoxOptions);
  throw error;
});
