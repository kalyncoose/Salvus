## TODO

Functionality:

- [x] See current saves
- [x] Sort saves by date modified
- [x] See current backup status
- [x] Backup individual saves
- [x] Backup all saves
- [x] Restore individual saves
- [x] Restore all saves
- [x] Launch Steam Game
- [x] Open Saves Folder
- [x] Open Backups Folder
- [x] Calculate and store checksums of save game files to ensure data integrity across copies
- [x] Update checks to cross check saves and backups, add new state
- [x] Delete individual backups
- [x] Delete all backups
- [x] Disable warnings for outdated backups
- [x] Auto-refresh saves list

Bugs:

- [ ] If you currently have a backup for 00X, which gets deleted due to player death, then if you create a new campaign Salvus will think your 00X is outdated
  - Option 1: Restore outdated backup which replaces the new Campaign save you created
  - Option 2: Backup the new Campaign save and forget about the old backup
  - Option 3: Don't create a new campaign without first choosing to restore or delete the backup for 00X in Salvus

```
// Color Palette
#311608, #532F12, #DE9750, #D7D2BB, #7C4115
```
