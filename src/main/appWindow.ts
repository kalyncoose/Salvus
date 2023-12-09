import { app, BrowserWindow, ipcMain } from 'electron';
import { registerTitlebarIpc } from '@misc/window/titlebarIPC';
import { registerTitleIpc } from '@misc/window/titleIPC';
import { registerFileIpc } from '@main/fileIPC';
import { registerGameIpc } from '@main/gameIPC';
import { getSavesDir, registerFolderIpc } from '@main/folderIPC';
import { registerLaunchIpc } from '@main/launchIPC';
import { registerBackUpIpc } from '@main/backUpIPC';
import { registerRestoreIpc } from '@main/restoreIPC';
import { registerDeleteIpc } from '@main/deleteIPC';
import * as fsp from 'node:fs/promises';
import path from 'path';
import { platform } from 'node:os';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

export const getIconPath = () => {
  const currentOS = process.platform
  switch (currentOS) {
    case 'win32':
      return path.resolve('assets/images/appIcon.ico')
    default:
      return path.resolve('assets/images/logo.png')
  }
}


/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 700,
    height: 400,
    minWidth: 700,
    minHeight: 400,
    backgroundColor: '#202020',
    show: true,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    icon: getIconPath(),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });
  // Enable inspector
  // appWindow.webContents.openDevTools()

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  appWindow.on('ready-to-show', () => appWindow.show());

  // Register Inter Process Communication for main process
  registerMainIPC(appWindow);

  // Handle auto refresh
  ipcMain.handle('start-auto-refresh', async () => {
    try {
        const savesDir = await getSavesDir()
        const watcher = fsp.watch(savesDir);
        for await (const event of watcher) {
            if (event.filename.endsWith('.rsg')) {
                console.log(`[watch] New event for ${event.filename}`)
                appWindow.webContents.send('trigger-refresh')
            }
        }
    } catch (err) {
        if (err.name === 'AbortError') return;
        throw err;
    }
  })

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC(appWindow: BrowserWindow) {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */
  registerTitlebarIpc(appWindow);

  // Register a new IPC channel
  registerTitleIpc(appWindow);

  // Register the File IPC channel
  registerFileIpc(appWindow);

  // Register the Game IPC channel
  registerGameIpc(appWindow);

  // Register the Folder IPC channel
  registerFolderIpc(appWindow);

  // Register the Launch IPC channel
  registerLaunchIpc(appWindow);

  // Register the Back Up IPC channel
  registerBackUpIpc(appWindow);

  // Register the Restore IPC channel
  registerRestoreIpc(appWindow);

  // Register the Delete IPC channel
  registerDeleteIpc(appWindow);
}
