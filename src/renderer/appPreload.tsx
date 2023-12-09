const { contextBridge, ipcRenderer } = require('electron');

import '@misc/window/windowPreload';

console.log('[Salvus] : Preload execution started');

// Expose stuff to appRenderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Set Title Logic
  setTitle: (title: string) => ipcRenderer.send('set-title', title),

  // Open File Logic
  openFile: () => ipcRenderer.invoke('dialog:openFile'),

  // Game Check Logic
  checkGame: () => ipcRenderer.invoke('game:check'),
  onTriggerRefresh: (callback: any) =>
    ipcRenderer.on('trigger-refresh', callback),
  autoRefresh: () => ipcRenderer.invoke('start-auto-refresh'),

  // Folder Logic
  openFolder: (folder: 'saves' | 'backups') =>
    ipcRenderer.invoke('open-folder', folder),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  deleteSettings: () => ipcRenderer.invoke('delete-settings'),

  // Launch Game Logic
  launchGame: () => ipcRenderer.invoke('launch-game'),

  // Back Up Logic
  backUp: (file: string) => ipcRenderer.invoke('back-up', file),
  backUpAll: () => ipcRenderer.invoke('back-up-all'),

  // Restore Logic
  restore: (file: string) => ipcRenderer.invoke('restore', file),
  restoreAll: () => ipcRenderer.invoke('restore-all'),

  // Delete Logic
  delete: (file: string) => ipcRenderer.invoke('delete', file),
  deleteAll: () => ipcRenderer.invoke('delete-all'),
});

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('trigger-refresh', () => {
    document.getElementById('game').click();
  });
});
