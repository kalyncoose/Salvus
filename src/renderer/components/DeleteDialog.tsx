import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BackupState, GameSave } from '@common/game-save';

interface DeleteDialogProps {
  open: boolean;
  setOpen: any;
  setDeleting: any;
  mode: 'all' | 'single';
  save: GameSave | undefined;
}

export const DeleteDialog = (props: DeleteDialogProps) => {
  const handleClose = async (yes: boolean) => {
    if (yes && props.mode === 'all') {
      // @ts-expect-error Not my problem
      await window.electronAPI.deleteAll();
      document.getElementById('game').click();
    } else if (yes && props.mode === 'single') {
      // @ts-expect-error Not my problem
      await window.electronAPI.delete(props.save.file);
      document.getElementById('game').click();
    }
    props.setOpen(false);
    props.setDeleting(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Delete Backup'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {props.mode === 'all' && (
            <span>Are you sure you want to delete all save backups?</span>
          )}
          {props.mode === 'single' && (
            <span>Are you sure you want to delete this save backup?</span>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={async () => await handleClose(true)}
          autoFocus
        >
          Yes
        </Button>
        <Button onClick={async () => await handleClose(false)}>No</Button>
      </DialogActions>
    </Dialog>
  );
};
