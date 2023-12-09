import React from 'react';
import {
  Link,
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Questions = () => {
  return (
    <Box id='faq' sx={{ marginTop: '25px' }}>
      <Divider />
      <Typography
        variant='h4'
        sx={{
          marginTop: '15px',
          fontWeight: 600,
          color: 'white',
          fontFamily: 'Crimson Text',
          marginBottom: '10px',
        }}
      >
        Questions
      </Typography>

      {/* Is it free? */}
      <Accordion variant='outlined'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: '600',
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            Is it free? Is it safe to download?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '18px',
            }}
          >
            Salvus is 100% free and open-source, provided through the{' '}
            <Link
              href='https://github.com/kalyncoose/Salvus/blob/main/LICENSE'
              target='_blank'
            >
              MIT software license
            </Link>
            . The application code is freely available to read or fork on{' '}
            <Link href='https://github.com/kalyncoose/Salvus' target='_blank'>
              GitHub
            </Link>
            . The app is built on{' '}
            <Link href='https://www.electronjs.org/' target='_blank'>
              Electron
            </Link>
            , which has a high standard for security. There are no ads,
            trackers, or hidden miners.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* How To Install */}
      <Accordion variant='outlined'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: '600',
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            How do I install Salvus?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '18px',
            }}
          >
            Simply download Salvus for your operating system and run the
            provided installer. Salvus automatically determines your default
            saves folder location and manages your backups folder.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Automatic Manage Saves */}
      <Accordion variant='outlined'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: '600',
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            Does Salvus automatically manage saves?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '18px',
            }}
          >
            Salvus automatically checks for save changes and the status of your
            saves and backups. It is up to you to decide when to backup and when
            to restore saves.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Button Explanations */}
      <Accordion variant='outlined'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: '600',
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            What do the top menu buttons do?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '18px',
            }}
          >
            The "Refresh" button refreshes the saves list. The "Back Up" button
            allows you to back up all saves. The "Restore" button allows you to
            restore all saves. The "Launch" button launches the Exanima game on
            Steam. The "Settings" button opens the settings menu.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Backup missing */}
      <Accordion variant='outlined'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: '600',
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            Why does the status say "Backup missing"?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '18px',
            }}
          >
            This means that a save file exists but there is no corresponding
            backup file yet. If you want to backup this save, click the backup
            icon.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Backup outdated */}
      <Accordion variant='outlined'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: '600',
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            Why does the status say "Backup outdated"?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '18px',
            }}
          >
            This means that a save file was recently modified and the backup no
            longer matches it. If you made a mistake in game and want to restore
            your backup, simply click the restore icon and confirm the dialog.
            However, if you intend to continue your save file as it was last
            modified, simply click the backup icon to update the backup file.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Ready to restore */}
      <Accordion variant='outlined'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: '600',
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            Why does the status say "Ready to restore"?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '18px',
            }}
          >
            This means that a save file has been deleted from your saves folder,
            which happens when your character dies in game. However, Salvus
            knows that it still has the backup file so it lists the save as
            ready to restore. To restore the save at the time of last backup,
            simply click the restore icon. If you want to discard the backup and
            start a new save, simply click the delete icon and confirm the
            dialog.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Backup verified */}
      <Accordion variant='outlined'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: '600',
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            Why does the status say "Backup verified"?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '18px',
            }}
          >
            This means that a save file has a corresponding backup file that is
            verifiably matched. Salvus uses several techniques to check if the
            save file matches the backup file, such as matching the filename,
            file byte size, modified timestamp, and SHA-512 checksum.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Custom Saves Directory */}
      <Accordion variant='outlined'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: '600',
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            What if I installed Exanima to a custom location?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              fontFamily: 'Crimson Text',
              fontSize: '18px',
            }}
          >
            If Exanima is not installed in the default Steam location for your
            operating system, follow these instructions. Simply click the
            "Settings" button in the top menu of Salvus, then click the "Set
            Custom" button, navigate to the folder of where your Exanima save
            files are and submit. Now with this custom saves folder setting,
            Salvus will start checking there for saves and save changes. To
            remove the custom saves folder setting, simply click the "Delete
            Custom" button and Salvus will begin checking the default saves
            location.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
