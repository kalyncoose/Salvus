import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { SaveCard } from './SaveCard';
import { BackupState, GameSave } from '@common/game-save';
import Box from '@mui/material/Box';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import SyncIcon from '@mui/icons-material/Sync';
import RestoreIcon from '@mui/icons-material/Restore';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { RestoreDialog } from './RestoreDialog';
import { DeleteDialog } from './DeleteDialog';
import { SettingsDialog } from './SettingsDialog';

async function handleRefresh(setRefreshing: any, setSaves: any) {
  setRefreshing(true);
  // @ts-expect-error Not my problem
  const saves: GameSave[] = await window.electronAPI.checkGame();
  setSaves(saves);
  setRefreshing(false);
}

async function handleBackUpAll(setBackingUp: any) {
  setBackingUp(true);
  // @ts-expect-error Not my problem
  await window.electronAPI.backUpAll();
  document.getElementById('game').click();
  setBackingUp(false);
}

async function handleRestoreAll(
  saves: any,
  setRestoring: any,
  setShowRestoreDialog: any,
  setActionMode: any,
  ignoreWarnings: boolean,
) {
  setRestoring(true);
  // Check for outdated saves
  let foundOutdated = false;
  saves.forEach((save: GameSave) => {
    if (save.state === BackupState.OUTDATED) foundOutdated = true;
  });
  if (foundOutdated && !ignoreWarnings) {
    setActionMode('all');
    setShowRestoreDialog(true);
  }
  if (!foundOutdated || (foundOutdated && ignoreWarnings)) {
    // @ts-expect-error Not my problem
    await window.electronAPI.restoreAll();
    document.getElementById('game').click();
    setRestoring(false);
  }
}

const Application: React.FC = () => {
  const [saves, setSaves] = useState<GameSave[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [backingUp, setBackingUp] = useState<boolean>(false);
  const [restoring, setRestoring] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState<boolean>(false);
  const [actionMode, setActionMode] = useState<'all' | 'single'>('all');
  const [singleSave, setSingleSave] = useState<GameSave | undefined>();
  const [ignoreWarnings, setIgnoreWarnings] = useState<boolean>(false);

  // Initial startup logic
  useEffect(() => {
    document.getElementById('game').click();
    // @ts-expect-error Not my problem
    window.electronAPI.autoRefresh();
  }, []);

  return (
    <Container maxWidth='lg' sx={{ paddingTop: '60px', color: 'white' }}>
      <Box
        sx={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        {/* Dialogs */}
        <RestoreDialog
          open={showRestoreDialog}
          setOpen={setShowRestoreDialog}
          setRestoring={setRestoring}
          mode={actionMode}
          save={singleSave}
        />
        <DeleteDialog
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
          setDeleting={setDeleting}
          mode={actionMode}
          save={singleSave}
        />
        <SettingsDialog
          open={showSettingsDialog}
          setOpen={setShowSettingsDialog}
          deleting={deleting}
          setDeleting={setDeleting}
          setActionMode={setActionMode}
          setShowDeleteDialog={setShowDeleteDialog}
          ignoreWarnings={ignoreWarnings}
          setIgnoreWarnings={setIgnoreWarnings}
        />

        {/* Menu */}
        <Tooltip title='Refresh List'>
          <span>
            <LoadingButton
              id='game'
              loading={refreshing}
              loadingPosition='start'
              startIcon={<RefreshIcon />}
              variant='outlined'
              onClick={async () => await handleRefresh(setRefreshing, setSaves)}
            >
              <span>Refresh</span>
            </LoadingButton>
          </span>
        </Tooltip>
        <Tooltip title='Back Up All Saves'>
          <span>
            <LoadingButton
              id='back-up-all'
              loading={backingUp}
              loadingPosition='start'
              startIcon={<SyncIcon />}
              variant='outlined'
              onClick={async () => await handleBackUpAll(setBackingUp)}
            >
              <span>Back Up</span>
            </LoadingButton>
          </span>
        </Tooltip>
        <Tooltip title='Restore All Saves'>
          <span>
            <LoadingButton
              id='restore-all'
              loading={restoring}
              loadingPosition='start'
              startIcon={<RestoreIcon />}
              variant='outlined'
              onClick={async () => {
                await handleRestoreAll(
                  saves,
                  setRestoring,
                  setShowRestoreDialog,
                  setActionMode,
                  ignoreWarnings,
                );
              }}
            >
              <span>Restore</span>
            </LoadingButton>
          </span>
        </Tooltip>
        <Tooltip title='Launch Steam Game'>
          <Button
            id='launch'
            variant='outlined'
            startIcon={<SportsEsportsOutlinedIcon />}
            // @ts-expect-error Not my problem
            onClick={async () => await window.electronAPI.launchGame()}
          >
            Launch
          </Button>
        </Tooltip>
        <Tooltip title='View All Settings'>
          <Button
            id='settings'
            variant='outlined'
            startIcon={<SettingsOutlinedIcon />}
            onClick={() => setShowSettingsDialog(true)}
          >
            Settings
          </Button>
        </Tooltip>
      </Box>

      {/* Saves List */}
      {saves?.map((save: GameSave) => {
        return (
          <SaveCard
            key={save.file}
            save={save}
            setShowRestoreDialog={setShowRestoreDialog}
            setShowDeleteDialog={setShowDeleteDialog}
            setActionMode={setActionMode}
            setSingleSave={setSingleSave}
            ignoreWarnings={ignoreWarnings}
          />
        );
      })}

      {/* Empty State */}
      {saves === undefined ||
        saves === null ||
        (saves?.length === 0 && (
          <Box
            sx={{
              paddingTop: '50px',
              height: '50vh',
              width: '100%',
              display: 'block',
              flexDirection: 'column',
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            <ReportProblemOutlinedIcon fontSize='large' color='secondary' />
            <Typography variant='h6' color='secondary'>
              No saves found!
            </Typography>
            <Typography variant='body2' color='secondary'>
              Please check that your default save location exists
              <br />
              or set a custom saves location in the Settings.
            </Typography>
          </Box>
        ))}
    </Container>
  );
};

export default Application;
