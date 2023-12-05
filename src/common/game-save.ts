
export const getSaveName = (file: string) => {
    const gameType = getGameType(file)
    switch (gameType) {
        case 'Campaign':
            return file.replace('Exanima', '').replace('.rsg', '')
        case 'Arena':
            return file.replace('Arena', '').replace('.rsg', '')
        case 'Unknown':
            return file.replace('.rsg', '')
    }
}

export const getGameType = (file: string) => {
    if (file.startsWith('Exanima')) return 'Campaign'
    else if (file.startsWith('Arena')) return 'Arena'
    return 'Unknown'
}

export enum BackupState {
    MISSING,
    OUTDATED,
    VERIFIED,
    UNRESTORED,
}

export interface GameSave {
    name: string
    file: string
    type: 'Campaign' | 'Arena' | 'Unknown'
    size: string
    lastModified: {
        timeAgo: string
        date: Date
    }
    checksum: string
    state: BackupState
    status: string
}
