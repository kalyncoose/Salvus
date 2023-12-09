import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-expect-error Not my problem
  return <Slide direction='up' ref={ref} {...props} />;
});

interface SettingsDialogProps {
  open: boolean;
  setOpen: any;
  deleting: boolean;
  setDeleting: any;
  setActionMode: any;
  setShowDeleteDialog: any;
  ignoreWarnings: boolean;
  setIgnoreWarnings: any;
}

async function handleDeleteAll(props: SettingsDialogProps) {
  console.log(`Starting delete all`);
  props.setDeleting(true);
  props.setActionMode('all');
  props.setShowDeleteDialog(true);
}

export const SettingsDialog = (props: SettingsDialogProps) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      // @ts-expect-error Not my problem
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant='h6' component='div'>
            Settings
          </Typography>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
            className='controls'
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: '20px', width: '100%' }}>
        {/* Game Files */}
        <Typography sx={{ flex: 1 }} variant='body1' component='div'>
          Game Files
        </Typography>
        <Divider />
        <Box
          sx={{
            flexDirection: 'row',
            display: 'flex',
            width: '100%',
            marginTop: '10px',
          }}
        >
          <Tooltip title='Open Saves Folder'>
            <Button
              id='open-folder'
              variant='outlined'
              startIcon={<FolderIcon />}
              // @ts-expect-error Not my problem
              onClick={async () => await window.electronAPI.openFolder('saves')}
            >
              Saves
            </Button>
          </Tooltip>
          <Tooltip title='Open Backups Folder'>
            <Button
              id='open-folder'
              variant='outlined'
              startIcon={<FolderIcon />}
              sx={{ marginLeft: '10px' }}
              onClick={async () =>
                // @ts-expect-error Not my problem
                await window.electronAPI.openFolder('backups')
              }
            >
              Backups
            </Button>
          </Tooltip>
          <Tooltip title='Set Custom Saves Directory'>
            <Button
              id='open-folder'
              variant='outlined'
              startIcon={<FolderIcon />}
              sx={{ marginLeft: '10px' }}
              onClick={async () => {
                // @ts-expect-error Not my problem
                await window.electronAPI.selectFolder();
                // @ts-expect-error Not my problem
                await window.electronAPI.autoRefresh();
              }}
            >
              Set Custom
            </Button>
          </Tooltip>
          <Tooltip title='Delete Custom Saves Directory Setting'>
            <Button
              id='open-folder'
              variant='outlined'
              startIcon={<DeleteIcon />}
              sx={{ marginLeft: '10px' }}
              onClick={async () => {
                // @ts-expect-error Not my problem
                await window.electronAPI.deleteSettings();
                // @ts-expect-error Not my problem
                await window.electronAPI.autoRefresh();
              }}
            >
              Delete Custom
            </Button>
          </Tooltip>
        </Box>

        {/* Manage Backups */}
        <Typography
          sx={{ flex: 1, marginTop: '15px' }}
          variant='body1'
          component='div'
        >
          Manage Backups
        </Typography>
        <Divider />
        <Tooltip title='Delete All Backups'>
          <span>
            <LoadingButton
              id='delete-all'
              loading={props.deleting}
              loadingPosition='start'
              startIcon={<DeleteIcon />}
              variant='outlined'
              sx={{ marginTop: '10px' }}
              onClick={async () => {
                await handleDeleteAll(props);
              }}
            >
              <span>Delete Backups</span>
            </LoadingButton>
          </span>
        </Tooltip>

        {/* Options */}
        <Typography
          sx={{ flex: 1, marginTop: '15px' }}
          variant='body1'
          component='div'
        >
          Options
        </Typography>
        <Divider />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={props.ignoreWarnings}
                onChange={() => props.setIgnoreWarnings(!props.ignoreWarnings)}
                name='ignoreWarnings'
              />
            }
            label='Ignore warnings for restoring an outdated save'
          />
        </FormGroup>
      </Container>
    </Dialog>
  );
};
