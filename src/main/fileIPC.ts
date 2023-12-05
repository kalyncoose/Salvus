import { BrowserWindow, IpcMainEvent, ipcMain, dialog } from 'electron';

// Define logic for returning data to the renderer
async function handleFileOpen () {
    // @ts-expect-error Not my problem
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (!canceled) {
      return filePaths[0]
    }
}

export const registerFileIpc = (mainWindow: BrowserWindow) => {
    // Tell ipcMain to listen to dialog:openFile channel and use handleFileOpen callback
    ipcMain.handle('dialog:openFile', handleFileOpen)
}
