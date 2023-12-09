import React from 'react';
import './App.css';
import { Container, Box, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { Header } from './components/Header';
import { Features } from './components/Features';
import { Video } from './components/Video';
import { Download } from './components/Download';
import { Questions } from './components/Questions';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: '#202020',
          height: '100%',
          width: '100%',
          paddingTop: '75px',
          paddingBottom: '100px',
        }}
      >
        <Container>
          <Header />
          <Features />
          <Video />
          <Download />
          <Questions />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
