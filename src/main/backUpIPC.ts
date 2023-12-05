import { BackupState, GameSave } from '@common/game-save';
import { app, BrowserWindow, IpcMainEvent, ipcMain } from 'electron';
import * as fsp from 'node:fs/promises';
import { handleGameCheck } from './gameIPC';

async function handleBackUp(event: IpcMainEvent, file: string) {
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
    
    // Perform backup
    if (found && gameSaves[index].state !== BackupState.VERIFIED) {
        try {
            console.log(`handleBackUp: Attempting to back up ${file}`)
            const userDataPath = app.getPath('userData');
            const backupsDir = `${userDataPath}/Backups`
            const existingPath = `${process.env.APPDATA}/Exanima/${file}`
            const stats = await fsp.stat(existingPath)
            if (stats.isFile()) {
                await fsp.copyFile(existingPath, `${backupsDir}/${file}`, fsp.constants.COPYFILE_FICLONE)
                console.log(`handleBackUp: ${file} is now backed up!`)
            }
        } catch (err) {
            console.log(`Failed during backup: ${err}`)
        }
    }
}

async function handleBackUpAll(event: IpcMainEvent) {
    const gameSaves: GameSave[] = await handleGameCheck()
    for (const save of gameSaves) {
        await handleBackUp(event, save.file)
    }
}

export const registerBackUpIpc = (mainWindow: BrowserWindow) => {
    ipcMain.handle('back-up', handleBackUp)
    ipcMain.handle('back-up-all', handleBackUpAll)
}
