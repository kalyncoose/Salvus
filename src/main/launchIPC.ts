import { BrowserWindow, IpcMainEvent, app, ipcMain, shell } from 'electron';

export const exanimaSteamAppId = 362490

function launchGame() {
    // Open the folder using the default file manager
    shell.openExternal(`steam://launch/${exanimaSteamAppId}`).then(() => {
        console.log(`Launched steam game: ${exanimaSteamAppId}`)
    })
}

export const registerLaunchIpc = (mainWindow: BrowserWindow) => {
    // Tell ipcMain to listen to dialog:openFile channel and use handleFileOpen callback
    ipcMain.handle('launch-game', launchGame);
}
