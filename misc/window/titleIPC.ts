import { BrowserWindow, IpcMainEvent, ipcMain } from 'electron';

// Define logic for setting window data
function handleSetTitle (event: IpcMainEvent, title: string) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win?.setTitle(title)
}

export const registerTitleIpc = (mainWindow: BrowserWindow) => {
    // Tell ipcMain to listen to set-title channel and use handleSetTitle callback
    ipcMain.on('set-title', handleSetTitle)
}
