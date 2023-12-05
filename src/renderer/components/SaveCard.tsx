import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import { BackupState, GameSave } from '@common/game-save';

interface SaveProps {
  save: GameSave;
  setShowRestoreDialog: any;
  setShowDeleteDialog: any;
  setActionMode: any;
  setSingleSave: any;
  ignoreWarnings: boolean;
}

async function handleBackUp(props: SaveProps) {
  console.log(
    `Starting back up for ${props.save.file} with state: ${props.save.state}`,
  );
  // @ts-expect-error Not my problem
  await window.electronAPI.backUp(props.save.file);
  document.getElementById('game').click();
}

async function handleRestore(props: SaveProps) {
  console.log(
    `Starting restore for ${props.save.file} with state: ${props.save.state}`,
  );

  // Check for outdated saves
  let foundOutdated = false;
  if (props.save.state === BackupState.OUTDATED) foundOutdated = true;
  if (foundOutdated && !props.ignoreWarnings) {
    props.setActionMode('single');
    props.setSingleSave(props.save);
    props.setShowRestoreDialog(true);
  }
  if (!foundOutdated || (foundOutdated && props.ignoreWarnings)) {
    // @ts-expect-error Not my problem
    await window.electronAPI.restore(props.save.file);
    document.getElementById('game').click();
  }
}

async function handleDelete(props: SaveProps) {
  console.log(
    `Starting delete for ${props.save.file} with state: ${props.save.state}`,
  );
  props.setActionMode('single');
  props.setSingleSave(props.save);
  props.setShowDeleteDialog(true);
}

export const SaveCard = (props: SaveProps) => {
  const getShortSha = (sha: string) => {
    return `Checksum: ${sha.substring(0, 6)}...${sha.slice(-6)}`;
  };

  return (
    <Card
      variant='outlined'
      sx={{
        display: 'flex',
        height: '50px',
        marginTop: '10px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: 0,
          width: '100%',
        }}
      >
        <Box
          sx={{
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '50px',
          }}
        >
          <Tooltip title={props.save.file}>
            <SaveIcon color='primary' />
          </Tooltip>
        </Box>
        <Box
          sx={{
            padding: '0px 15px 0px 0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '10%',
          }}
        >
          <Typography component='div' variant='body2'>
            {props.save.name}
          </Typography>
          <Typography
            variant='subtitle2'
            color='text.secondary'
            component='div'
          >
            {props.save.type}
          </Typography>
        </Box>
        <Divider orientation='vertical' />
        <Box
          sx={{
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '50px',
          }}
        >
          <Tooltip
            title={`${props.save.lastModified.date.toLocaleDateString()} ${props.save.lastModified.date.toLocaleTimeString()}`}
          >
            <AccessTimeIcon color='secondary' />
          </Tooltip>
        </Box>
        <Box
          sx={{
            padding: '0px 15px 0px 0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '18%',
          }}
        >
          <Typography component='div' variant='body2'>
            Last Modified
          </Typography>
          <Typography
            variant='subtitle2'
            color='text.secondary'
            component='div'
          >
            {props.save.lastModified.timeAgo}
          </Typography>
        </Box>
        <Divider orientation='vertical' />
        <Box
          sx={{
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '50px',
          }}
        >
          {props.save.state === BackupState.VERIFIED && (
            <Tooltip title={getShortSha(props.save.checksum)}>
              <CheckCircleOutlineIcon color='success' />
            </Tooltip>
          )}
          {props.save.state === BackupState.OUTDATED && (
            <Tooltip title={`Save modified ${props.save.lastModified.timeAgo}`}>
              <ReportProblemOutlinedIcon color='warning' />
            </Tooltip>
          )}
          {props.save.state === BackupState.MISSING && (
            <Tooltip title={`${props.save.file} is not backed up`}>
              <CancelOutlinedIcon color='error' />
            </Tooltip>
          )}
          {props.save.state === BackupState.UNRESTORED && (
            <Tooltip
              title={`${props.save.file} is not game saves, but backed up`}
            >
              <ChangeCircleOutlinedIcon color='info' />
            </Tooltip>
          )}
        </Box>
        <Box
          sx={{
            padding: '0px 15px 0px 0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography component='div' variant='body2'>
            Status
          </Typography>
          <Typography
            variant='subtitle2'
            color='text.secondary'
            component='div'
          >
            {props.save.status}
          </Typography>
        </Box>
        <Box
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-end',
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '50px',
              background: 'transparent',
            }}
          >
            <Tooltip title='Backup Save'>
              <IconButton
                id={`back-up-${props.save.file}`}
                onClick={async () => await handleBackUp(props)}
              >
                <SyncIcon color='secondary' />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider orientation='vertical' />
          <Box
            sx={{
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '50px',
              background: 'transparent',
            }}
          >
            <Tooltip
              title={
                props.save.state === BackupState.MISSING
                  ? 'No backup to restore'
                  : 'Restore Save'
              }
            >
              <span>
                <IconButton
                  id={`restore-${props.save.file}`}
                  disabled={props.save.state === BackupState.MISSING}
                  onClick={async () => await handleRestore(props)}
                >
                  <RestoreIcon color='secondary' />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
          <Divider orientation='vertical' />
          <Box
            sx={{
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '50px',
              background: 'transparent',
            }}
          >
            <Tooltip
              title={
                props.save.state === BackupState.MISSING
                  ? 'No backup to delete'
                  : 'Delete Backup'
              }
            >
              <span>
                <IconButton
                  id={`delete-${props.save.file}`}
                  disabled={props.save.state === BackupState.MISSING}
                  onClick={async () => await handleDelete(props)}
                >
                  <DeleteIcon color='secondary' />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
