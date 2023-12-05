import { BrowserWindow, IpcMainEvent, ipcMain, shell, app } from 'electron';

// Example: Open a Specific Folder
function openSpecificFolder(event: IpcMainEvent, folder: 'saves' | 'backups') {
    const exanimaDir = `${process.env.APPDATA}\\Exanima`;
    const userDataPath = app.getPath('userData');
    const backupsDir = `${userDataPath}\\Backups`
  
    // Open the folder using the default file manager
    if (folder === 'saves') shell.openPath(exanimaDir)
    else if (folder === 'backups') shell.openPath(backupsDir)
}

export const registerFolderIpc = (mainWindow: BrowserWindow) => {
    // Tell ipcMain to listen to dialog:openFile channel and use handleFileOpen callback
    ipcMain.handle('open-saves-folder', openSpecificFolder);
}
