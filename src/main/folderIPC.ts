import { BrowserWindow, IpcMainEvent, ipcMain, shell, app } from 'electron';
import { exanimaSteamAppId } from './launchIPC';
const path = require('node:path'); 

export const getSavesDir = () => {
    const currentOS = process.platform
        switch (currentOS) {
            case 'win32':
                return path.join(process.env.APPDATA, '/Exanima')
            case 'darwin':
                return path.join(`"~/Library/Application Support/Steam/steamapps/common"`, '/Exanima')
            case 'linux':
                return path.join(`~/.steam/steam/steamapps/compatdata/${exanimaSteamAppId}/pfx`, '/Exanima')
            default:
                throw(`getSavesDir: Current platform "${currentOS}" is not supported yet.`)
        }
}

export const getBackupsDir = () => {
    const userDataPath = app.getPath('userData');
    return path.join(userDataPath, '/Backups')
}

// Example: Open a Specific Folder
function openSpecificFolder(event: IpcMainEvent, folder: 'saves' | 'backups') {
    if (folder === 'saves') shell.openPath(getSavesDir())
    else if (folder === 'backups') shell.openPath(getBackupsDir())
}

export const registerFolderIpc = (mainWindow: BrowserWindow) => {
    // Tell ipcMain to listen to dialog:openFile channel and use handleFileOpen callback
    ipcMain.handle('open-saves-folder', openSpecificFolder);
}
