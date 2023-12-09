import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import logo from '../logo.png';
import demo from '../demo.jpg';
import DownloadIcon from '@mui/icons-material/Download';

export const Header = () => {
  return (
    <Box sx={{ flexDirection: 'row', display: 'flex' }}>
      <Box
        sx={{
          width: '50%',
          alignSelf: 'center',
        }}
      >
        <img src={logo} alt='Salvus Logo' height='75px' />
        <Typography
          variant='h5'
          sx={{
            fontWeight: 600,
            color: 'white',
            marginTop: '10px',
            fontFamily: 'Crimson Text',
          }}
        >
          A save manager desktop app for Exanima
        </Typography>
        <Typography
          variant='h6'
          color='secondary'
          sx={{
            fontWeight: 600,
            marginTop: '10px',
            fontFamily: 'Crimson Text',
          }}
        >
          v1.0.1
        </Typography>
      </Box>
      <Box sx={{ width: '50%' }}>
        <img
          src={demo}
          alt='App Screenshot'
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            justifyContent: 'center',
            display: 'flex',
            marginTop: '-15px',
            padding: 0,
          }}
        >
          <Button
            variant='contained'
            startIcon={<DownloadIcon />}
            href='#download'
          >
            <Typography
              variant='h6'
              sx={{
                fontWeight: 600,
                fontFamily: 'Crimson Text',
                textTransform: 'capitalize',
              }}
            >
              Download Now
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
