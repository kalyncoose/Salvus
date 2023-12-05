import { BackupState, GameSave } from '@common/game-save';
import { app, BrowserWindow, IpcMainEvent, ipcMain } from 'electron';
import * as fsp from 'node:fs/promises';
import { handleGameCheck } from './gameIPC';

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
            const userDataPath = app.getPath('userData');
            const backupsDir = `${userDataPath}/Backups`
            const existingPath = `${process.env.APPDATA}/Exanima/${file}`
            const stats = await fsp.stat(`${backupsDir}/${file}`)
            if (stats.isFile() && file.endsWith('.rsg')) {
                await fsp.copyFile(`${backupsDir}/${file}`, existingPath, fsp.constants.COPYFILE_FICLONE)
                console.log(`handleRestore: ${file} is now restored!`)
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
