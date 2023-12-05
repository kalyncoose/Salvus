import { BrowserWindow, IpcMainEvent, app, ipcMain, shell } from 'electron';

function launchGame() {
    const appId = 362490
  
    // Open the folder using the default file manager
    shell.openExternal(`steam://launch/${appId}`).then(() => {
        console.log(`Launched steam game: ${appId}`)
    })
}

export const registerLaunchIpc = (mainWindow: BrowserWindow) => {
    // Tell ipcMain to listen to dialog:openFile channel and use handleFileOpen callback
    ipcMain.handle('launch-game', launchGame);
}
