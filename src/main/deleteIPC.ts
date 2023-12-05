import { BackupState, GameSave } from '@common/game-save';
import { app, BrowserWindow, IpcMainEvent, ipcMain } from 'electron';
import * as fsp from 'node:fs/promises';
import { handleGameCheck } from './gameIPC';

async function handleDelete(event: IpcMainEvent, file: string) {
    try {
        console.log(`handleRestore: Attempting to delete backup: ${file}`)
        const userDataPath = app.getPath('userData');
        const backupsDir = `${userDataPath}/Backups`
        const stats = await fsp.stat(`${backupsDir}/${file}`)
        if (stats.isFile() && file.endsWith('.rsg')) {
            await fsp.rm(`${backupsDir}/${file}`)
        }
    } catch (err) {
        console.log(`Failed during delete: ${err}`)
    }
}

async function handleDeleteAll(event: IpcMainEvent) {
    const gameSaves: GameSave[] = await handleGameCheck()
    for (const save of gameSaves) {
        await handleDelete(event, save.file)
    }
}

export const registerDeleteIpc = (mainWindow: BrowserWindow) => {
    ipcMain.handle('delete', handleDelete)
    ipcMain.handle('delete-all', handleDeleteAll)
}
