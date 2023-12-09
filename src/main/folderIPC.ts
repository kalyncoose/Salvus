import { BrowserWindow, IpcMainEvent, ipcMain, shell, app, dialog } from 'electron';
import { exanimaSteamAppId } from './launchIPC';
const path = require('node:path'); 
const fsp = require('fs/promises');
const fs = require('fs');

async function selectFolder() {
    const { canceled, filePaths } = await dialog.showOpenDialog({ title: 'Choose a custom saves directory', properties: ['openDirectory', 'showHiddenFiles'] })
    if (!canceled && filePaths?.length > 0) {
        const customSavesDir = filePaths[0]
        const settingsObject = {
            "customSavesDir": customSavesDir
        }
        const settingsFileContent = JSON.stringify(settingsObject, null, 3)
        const settingsFilePath = path.join(getSettingsDir(), '/Settings.json')
        await fsp.writeFile(settingsFilePath, settingsFileContent, { encoding: 'utf8' }).then(() => {
            console.log(`selectFolder: Wrote settings file at ${settingsFilePath}`)
        }).catch((error: any) => {
            console.log(`selectFolder: Failed to write settings file: ${error}`)
        })
    }
}

async function deleteSettings() {
    const settingsFilePath = path.join(getSettingsDir(), '/Settings.json')
    await fsp.rm(settingsFilePath).then(() => {
        console.log(`deleteSettings: Successfully deleted or skipped delete: ${settingsFilePath}`)
    }).catch((error: any) => {
        console.log(`deleteSettings: Failed to delete settings file: ${error}`)
    })
}

export async function getSavesDir(): Promise<string> {
    try {
        // Check for custom saves dir
        const settingsFilePath = path.join(getSettingsDir(), '/Settings.json')
        const settingsFileStats = await fsp.stat(settingsFilePath)
        if (settingsFileStats) {
            const settingsFileContent = await fsp.readFile(settingsFilePath, { encoding: 'utf8' })
            if (settingsFileContent) {
                const settingsObject = JSON.parse(settingsFileContent)
                if (settingsObject?.customSavesDir) {
                    console.log(`getSavesDir: Found custom saves dir: ${settingsObject?.customSavesDir}`)
                    return settingsObject?.customSavesDir
                }
            }
        }
    } catch (error: any) {
        console.log(`getSavesDir: Failed while getting saves dir: ${error}`)
    }
    // Use platform default saves dir
    const currentOS = process.platform
    switch (currentOS) {
        case 'win32':
            return path.join(process.env.APPDATA, '/Exanima')
        case 'darwin':
            return path.join(`"~/Library/Application Support/Steam/steamapps/common"`, '/Exanima')
        case 'linux':
            return path.join(`~/.steam/steam/steamapps/compatdata/${exanimaSteamAppId}/pfx`, '/Exanima')
        default:
            throw(`getSavesDir: Current platform "${currentOS}" is not supported yet.`)
    }
}

export const getBackupsDir = () => {
    const userDataPath = app.getPath('userData');
    return path.join(userDataPath, '/Backups')
}

export const getSettingsDir = () => {
    const userDataPath = app.getPath('userData');
    return path.join(userDataPath, '/Settings')
}

async function openFolder(event: IpcMainEvent, folder: 'saves' | 'backups') {
    if (folder === 'saves') { 
        const savesDir = await getSavesDir()
        shell.openPath(savesDir)
    } else if (folder === 'backups') shell.openPath(getBackupsDir())
}

export const registerFolderIpc = (mainWindow: BrowserWindow) => {
    ipcMain.handle('open-folder', openFolder);
    ipcMain.handle('select-folder', selectFolder)
    ipcMain.handle('delete-settings', deleteSettings)
}
