import React from 'react';
import { Box, Typography, Divider, Card, Grid } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';

export const Features = () => {
  return (
    <Box sx={{ marginTop: '25px' }}>
      <Divider />
      <Typography
        variant='h4'
        sx={{
          marginTop: '15px',
          fontWeight: 600,
          color: 'white',
          fontFamily: 'Crimson Text',
        }}
      >
        Features
      </Typography>

      {/* Feature Cards */}
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ marginTop: 0 }}
      >
        <Grid item xs={6}>
          <Card
            variant='outlined'
            sx={{
              padding: '10px',
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
                fontFamily: 'Crimson Text',
                fontSize: '18px',
              }}
            >
              Auto-detect save changes
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            variant='outlined'
            sx={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <CheckCircleOutlineIcon color='primary' />
            <Typography
              variant='body1'
              sx={{
                fontWeight: '600',
                color: 'white',
                marginLeft: '10px',
                fontFamily: 'Crimson Text',
                fontSize: '18px',
              }}
            >
              Verify backup save files
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            variant='outlined'
            sx={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <ReportProblemOutlinedIcon color={'primary'} />
            <Typography
              variant='body1'
              sx={{
                fontWeight: '600',
                color: 'white',
                marginLeft: '10px',
                fontFamily: 'Crimson Text',
                fontSize: '18px',
              }}
            >
              Notify you of outdated backups
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            variant='outlined'
            sx={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <ChangeCircleOutlinedIcon color={'primary'} />
            <Typography
              variant='body1'
              sx={{
                fontWeight: '600',
                color: 'white',
                marginLeft: '10px',
                fontFamily: 'Crimson Text',
                fontSize: '18px',
              }}
            >
              Quickly restore your saves
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            variant='outlined'
            sx={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <SportsEsportsOutlinedIcon color={'primary'} />
            <Typography
              variant='body1'
              sx={{
                fontWeight: '600',
                color: 'white',
                marginLeft: '10px',
                fontFamily: 'Crimson Text',
                fontSize: '18px',
              }}
            >
              One-click launch Steam game
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            variant='outlined'
            sx={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <FolderOpenIcon color={'primary'} />
            <Typography
              variant='body1'
              sx={{
                fontWeight: '600',
                color: 'white',
                marginLeft: '10px',
                fontFamily: 'Crimson Text',
                fontSize: '18px',
              }}
            >
              Set custom saves directory
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
