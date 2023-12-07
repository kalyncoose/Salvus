import { app, BrowserWindow, IpcMainEvent, ipcMain, webContents } from 'electron';
import { BackupState, GameSave, getGameType, getSaveName } from '@common/game-save';
import { getBackupsDir, getSavesDir } from './folderIPC';
import * as fsp from 'node:fs/promises';
import TimeAgo from 'javascript-time-ago'
const crypto = require('crypto');
const path = require('node:path'); 

export async function checkForUnrestored(): Promise<GameSave[]> {
    const unrestoredSaves: GameSave[] = []
    const saveFiles = await fsp.readdir(getSavesDir())
    const backupFiles = await fsp.readdir(getBackupsDir())
    // console.log(`saveFiles=${saveFiles}`)
    // console.log(`backupFiles=${backupFiles}`)
    for (const backupFile of backupFiles) {
        if (!saveFiles.includes(backupFile)) {
            // console.log(`checkForUnrestored: ${backupFile} is not in saveFiles!`)
            const backupStats = await fsp.stat(path.join(getBackupsDir(), backupFile))
            if (backupStats.isFile() && backupFile.endsWith('.rsg')) {
                const backupChecksum = await calculateChecksum(path.join(getBackupsDir(), backupFile))
                const save: GameSave = {
                    name: getSaveName(backupFile),
                    file: backupFile,
                    type: getGameType(backupFile),
                    size: `${backupStats.size} bytes`,
                    lastModified: {
                        timeAgo: `${timeAgo.format(new Date(backupStats.mtime))}`,
                        date: backupStats.mtime
                    },
                    checksum: backupChecksum,
                    state: BackupState.UNRESTORED,
                    status: 'Ready to restore'
                }
            unrestoredSaves.push(save)
            }
        }
    }
    return unrestoredSaves
}

export async function checkBackUpState(file: string, stats: any, checksum: string): Promise<[BackupState, string]> {
    let backupStateResult: [BackupState, string] = [BackupState.MISSING, 'Backup missing']
    // Create dir if not exists
    await fsp.mkdir(getBackupsDir()).then(() => {
        console.log(`New Backups directory created`)
    }).catch((err) => {
        console.log(`Skipped Backups directory creation: ${err}`)
    })

    // Check if backup already exists
    try {
        const backupStats = await fsp.stat(path.join(getBackupsDir(), file))
        const backupChecksum = await calculateChecksum(path.join(getBackupsDir(), file))
        // Compare stats and checksum
        let sizeMatch = false
        let mtimeMatch = false
        let checksumMatch = false
        let outdated = false
        if (backupStats.size === stats.size) sizeMatch = true
        if (backupStats.mtime.getTime() === stats.mtime.getTime()) mtimeMatch = true
        else if (backupStats.mtime.getTime() < stats.mtime.getTime()) outdated = true
        // console.log(`backupStats.mtime ${backupStats.mtime.getTime()} === stats.mtime ${stats.mtime.getTime()}`)
        if (backupChecksum === checksum) checksumMatch = true
        // console.log(`checkBackUpState - ${file}: sizeMatch=${sizeMatch}, mtimeMatch=${mtimeMatch}, checksumMatch=${checksumMatch}, outdated=${outdated}`)
        if (sizeMatch && mtimeMatch && checksumMatch) {
            backupStateResult = [BackupState.VERIFIED, 'Backup verified']
            // console.log(`checkBackUpState - VERIFIED: ${file}`)
        }
        if (outdated) {
            backupStateResult = [BackupState.OUTDATED, 'Backup outdated']
            // console.log(`checkBackUpState - OUTDATED: ${file}`)
        } 
    } catch (err) {
        console.log(`Failed during stat ${file}: ${err}`)
    }

    // Default case
    return backupStateResult
}

export async function calculateChecksum(filePath: string, algorithm = 'sha512') {
    const data = await fsp.readFile(filePath);
    const hash = crypto.createHash(algorithm);
    hash.update(data);
    const checksum = hash.digest('hex');
    return checksum;
}

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

// Define logic for returning data to the renderer
export async function handleGameCheck(): Promise<GameSave[]> {
    // console.log(`Starting handleGameCheck`)
    const saves: GameSave[] = []
    const files = await fsp.readdir(getSavesDir())
    // console.log(`readdir: ${files}`)

    for (const file of files) {
        // console.log(`file: ${file}`)
        const stats = await fsp.stat(path.join(getSavesDir(), file))
        // console.log(`stats: ${JSON.stringify(stats)}`)
        if (stats.isFile() && file.endsWith('.rsg')) {
            const checksum = await calculateChecksum(path.join(getSavesDir(), file))
            const backupState = await checkBackUpState(file, stats, checksum)
            const save: GameSave = {
                name: getSaveName(file),
                file: file,
                type: getGameType(file),
                size: `${stats.size} bytes`,
                lastModified: {
                    timeAgo: `${timeAgo.format(new Date(stats.mtime))}`,
                    date: stats.mtime
                },
                checksum: checksum,
                state: backupState[0],
                status: backupState[1]
            }
            // console.log(`save: ${JSON.stringify(save)}`)
            saves.push(save)
        }
        // console.log(`stats: finished`)
        // console.log(`file: finished`)
    }

    // console.log(`saves: ${JSON.stringify(saves)}`)
    // TODO: Why is it not sorting right

    // Check for unrestored
    const unrestoredSaves = await checkForUnrestored()
    const combinedSaves = saves.concat(unrestoredSaves)
    return combinedSaves.sort((a, b) => b.lastModified.date.getTime() - a.lastModified.date.getTime());
}

export const registerGameIpc = (appWindow: BrowserWindow) => {
    // Tell ipcMain to listen to game:check channel and use handleGameCheck callback
    ipcMain.handle('game:check', handleGameCheck)
}
