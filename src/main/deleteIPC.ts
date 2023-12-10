import { BrowserWindow, IpcMainEvent, ipcMain } from 'electron';
import { GameSave } from '@common/game-save';
import { checkDirExists, getBackupsDir } from './folderIPC';
import { handleGameCheck } from './gameIPC';
import * as fsp from 'node:fs/promises';
const path = require('node:path');

async function handleDelete(event: IpcMainEvent, file: string) {
    try {
        console.log(`handleRestore: Attempting to delete backup: ${file}`)
        const backupsDirExists = await checkDirExists(getBackupsDir())
        if (backupsDirExists) {
            const stats = await fsp.stat(path.join(getBackupsDir(), file))
            if (stats.isFile() && file.endsWith('.rsg')) {
                await fsp.rm(path.join(getBackupsDir(), file))
            }
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
