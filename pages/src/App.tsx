import {
  Container,
  Box,
  Typography,
  Button,
  ThemeProvider,
  Divider,
  Card,
} from '@mui/material';
import React from 'react';
import './App.css';
import logo from './title-text.png';
import bg from './bg-blurred.jpg';
import demo from './demo.jpg';
import DownloadIcon from '@mui/icons-material/Download';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          background: '#2a2a2a',
          margin: 0,
          padding: 0,
        }}
      >
        <Box
          className={'bg'}
          sx={{
            backgroundImage: `url(${bg})`,
            width: '100%',
            height: '300px',
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <img src={logo} height='100px' />
          <Typography
            variant='h6'
            sx={{ fontWeight: '600', color: 'white', marginTop: '20px' }}
          >
            A save manager desktop app for Exanima
          </Typography>
        </Box>
        <Box
          sx={{
            background: '#DE9750',
            height: '100px',
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant='contained'
            size='large'
            sx={{ background: '#EDB660', color: '#292929' }}
            startIcon={<DownloadIcon />}
            href={'https://github.com/kalyncoose/Salvus/releases'}
            target='_blank'
          >
            Download Now
          </Button>
        </Box>
        <Container maxWidth={'md'}>
          <Typography
            variant='h5'
            sx={{ fontWeight: '500', color: 'white', marginTop: '20px' }}
            gutterBottom
          >
            Easily manage all of your saves in one place
          </Typography>
          <Divider />
          <Box
            sx={{
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={demo} />
          </Box>
          <Typography
            variant='h5'
            sx={{ fontWeight: '500', color: 'white', marginTop: '20px' }}
            gutterBottom
          >
            Features
          </Typography>
          <Divider />
          <Box sx={{ padding: '10px' }}>
            <Card
              variant='outlined'
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <AutoAwesomeIcon color={'primary'} />
              <Typography
                variant='body1'
                sx={{
                  fontWeight: '600',
                  color: 'white',
                  marginLeft: '10px',
                }}
              >
                Auto-detect save changes
              </Typography>
            </Card>
            <Card
              variant='outlined'
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '5px',
              }}
            >
              <CheckCircleOutlineIcon color='success' />
              <Typography
                variant='body1'
                sx={{
                  fontWeight: '600',
                  color: 'white',
                  marginLeft: '10px',
                }}
              >
                Verify backups by matching file byte size, timestamp, and
                SHA-512 checksum algorithm
              </Typography>
            </Card>
            <Card
              variant='outlined'
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '5px',
              }}
            >
              <ReportProblemOutlinedIcon color={'warning'} />
              <Typography
                variant='body1'
                sx={{
                  fontWeight: '600',
                  color: 'white',
                  marginLeft: '10px',
                }}
              >
                Warn you of outdated or missing backups
              </Typography>
            </Card>
            <Card
              variant='outlined'
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '5px',
              }}
            >
              <ChangeCircleOutlinedIcon color={'info'} />
              <Typography
                variant='body1'
                sx={{
                  fontWeight: '600',
                  color: 'white',
                  marginLeft: '10px',
                }}
              >
                Recover a deleted save in one click
              </Typography>
            </Card>
            <Card
              variant='outlined'
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '5px',
              }}
            >
              <SportsEsportsOutlinedIcon color={'secondary'} />
              <Typography
                variant='body1'
                sx={{
                  fontWeight: '600',
                  color: 'white',
                  marginLeft: '10px',
                }}
              >
                Quickly re-launch the game via Steam
              </Typography>
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
