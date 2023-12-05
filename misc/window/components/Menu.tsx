import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import context from '../titlebarContextApi';
import CloseIcon from '@mui/icons-material/Close';
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import MinimizeIcon from '@mui/icons-material/Minimize';
import './Menu.less';
import blurBanner from '@assets/images/blur-banner.jpg'
import titleText from '@assets/images/title-text.png'

const Menu: React.FC = () => {

    return (
    <AppBar position="fixed" className='titlebar' sx={{ backgroundImage: `url(${blurBanner})` }}>
        <Toolbar variant="dense">
        <Box sx={{ width: '10%' }} />
          <Box sx={{ flexGrow: 1 }} />
          <img src={titleText} style={{ maxHeight: '40px' }} />
          <Box sx={{ flexGrow: 1 }} />
          <div className='controls'>
            <IconButton aria-label="minimize" size="small" onClick={() => context.minimize()}>
              <MinimizeIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="maximize" size="small" onClick={() => context.toggle_fullscreen()}>
              <SquareOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="close" size="small" onClick={() => context.exit()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )
}

export default Menu;
