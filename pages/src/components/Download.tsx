import React from 'react';
import { Box, Typography, Button, Divider, Card } from '@mui/material';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import AppleIcon from '@mui/icons-material/Apple';
import ComputerIcon from '@mui/icons-material/Computer';

export const Download = () => {
  const windowsLink =
    'https://github.com/kalyncoose/Salvus/releases/download/v1.1.0/Salvus-1.1.0.Setup.exe';
  const macLink =
    'https://github.com/kalyncoose/Salvus/releases/download/v1.1.0/Salvus-1.1.0-x64.dmg';
  const linuxLink =
    'https://github.com/kalyncoose/Salvus/releases/download/v1.1.0/salvus_1.1.0_amd64.deb';

  return (
    <Box id='download' sx={{ marginTop: '25px' }}>
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
        Download
      </Typography>
      <Card variant='outlined' sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            width: '30%',
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex',
            padding: '10px',
          }}
        >
          <MicrosoftIcon color='primary' fontSize='large' />
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              color: 'white',
              fontFamily: 'Crimson Text',
            }}
          >
            Windows
          </Typography>
          <Typography
            variant='subtitle2'
            color='secondary'
            sx={{
              fontWeight: 600,
              fontFamily: 'Crimson Text',
              marginBottom: '10px',
            }}
          >
            {`(64-bit)`}
          </Typography>
          <Button variant='outlined' href={windowsLink} target='_blank'>
            <Typography
              variant='body1'
              sx={{
                fontWeight: 600,
                fontFamily: 'Crimson Text',
                textTransform: 'capitalize',
              }}
            >
              Download
            </Typography>
          </Button>
        </Box>
        <Divider orientation='vertical' variant='middle' flexItem={true} />
        <Box
          sx={{
            width: '30%',
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex',
            padding: '10px',
          }}
        >
          <AppleIcon color='primary' fontSize='large' />
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              color: 'white',
              fontFamily: 'Crimson Text',
            }}
          >
            MacOS
          </Typography>
          <Typography
            variant='subtitle2'
            color='secondary'
            sx={{
              fontWeight: 600,
              fontFamily: 'Crimson Text',
              marginBottom: '10px',
            }}
          >
            {`(Intel)`}
          </Typography>
          <Button variant='outlined' href={macLink} target='_blank'>
            <Typography
              variant='body1'
              sx={{
                fontWeight: 600,
                fontFamily: 'Crimson Text',
                textTransform: 'capitalize',
              }}
            >
              Download
            </Typography>
          </Button>
        </Box>
        <Divider orientation='vertical' variant='middle' flexItem={true} />
        <Box
          sx={{
            width: '30%',
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex',
            padding: '10px',
          }}
        >
          <ComputerIcon color='primary' fontSize='large' />
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              color: 'white',
              fontFamily: 'Crimson Text',
            }}
          >
            Linux
          </Typography>
          <Typography
            variant='subtitle2'
            color='secondary'
            sx={{
              fontWeight: 600,
              fontFamily: 'Crimson Text',
              marginBottom: '10px',
            }}
          >
            {`(Debian)`}
          </Typography>
          <Button variant='outlined' href={linuxLink} target='_blank'>
            <Typography
              variant='body1'
              sx={{
                fontWeight: 600,
                fontFamily: 'Crimson Text',
                textTransform: 'capitalize',
              }}
            >
              Download
            </Typography>
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
