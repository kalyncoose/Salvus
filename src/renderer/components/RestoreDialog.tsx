import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GameSave } from '@common/game-save';

interface RestoreDialogProps {
  open: boolean;
  setOpen: any;
  setRestoring: any;
  mode: 'all' | 'single';
  save: GameSave | undefined;
}

export const RestoreDialog = (props: RestoreDialogProps) => {
  const handleClose = async (yes: boolean) => {
    if (yes && props.mode === 'all') {
      // @ts-expect-error Not my problem
      await window.electronAPI.restoreAll();
      document.getElementById('game').click();
    } else if (yes && props.mode === 'single') {
      // @ts-expect-error Not my problem
      await window.electronAPI.restore(props.save.file);
      document.getElementById('game').click();
    }
    props.setOpen(false);
    props.setRestoring(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Restore Outdated Save?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          A save you want to restore is outdated.
          <br />
          Are you sure you want to restore?
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
