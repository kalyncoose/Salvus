import { BrowserWindow, IpcMainEvent, ipcMain, dialog } from 'electron';

// Define logic for returning data to the renderer
async function handleFileOpen () {
    const { canceled, filePaths } = await dialog.showOpenDialog({ title: 'Choose a custom saves directory', properties: ['openDirectory'] })
    if (!canceled) {
      return filePaths[0]
    }
}

export const registerFileIpc = (mainWindow: BrowserWindow) => {
    // Tell ipcMain to listen to dialog:openFile channel and use handleFileOpen callback
    ipcMain.handle('dialog:openFile', handleFileOpen)
}
