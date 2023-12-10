import { BackupState, GameSave } from '@common/game-save';
import { app, BrowserWindow, IpcMainEvent, ipcMain } from 'electron';
import * as fsp from 'node:fs/promises';
import { handleGameCheck } from './gameIPC';
import { checkDirExists, getBackupsDir, getSavesDir } from './folderIPC';
const path = require('node:path'); 

async function handleRestore(event: IpcMainEvent, file: string) {
    const gameSaves: GameSave[] = await handleGameCheck()
    let found = false
    let index = 0

    // Find desired file
    gameSaves.forEach((save, i) => {
        if (save.file === file) {
            found = true
            index = i
        }
    })
    
    // Perform restore
    if (found && gameSaves[index].state !== BackupState.MISSING) {
        try {
            console.log(`handleRestore: Attempting to restore ${file}`)
            const savesDir = await getSavesDir()
            const savesDirExists = await checkDirExists(savesDir)
            const backupsDirExists = await checkDirExists(getBackupsDir())
            if (savesDirExists && backupsDirExists) {
                const existingPath = path.join(savesDir, file)
                const stats = await fsp.stat(path.join(getBackupsDir(), file))
                if (stats.isFile() && file.endsWith('.rsg')) {
                    await fsp.copyFile(path.join(getBackupsDir(), file), existingPath, fsp.constants.COPYFILE_FICLONE)
                    console.log(`handleRestore: ${file} is now restored!`)
                }
            }
        } catch (err) {
            console.log(`Failed during restore: ${err}`)
        }
    }
}

async function handleRestoreAll(event: IpcMainEvent) {
    const gameSaves: GameSave[] = await handleGameCheck()
    for (const save of gameSaves) {
        await handleRestore(event, save.file)
    }
}

export const registerRestoreIpc = (mainWindow: BrowserWindow) => {
    ipcMain.handle('restore', handleRestore)
    ipcMain.handle('restore-all', handleRestoreAll)
}
