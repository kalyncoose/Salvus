/**
 * Copyright (c) 2021, Guasam
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : guasam
 * @project : Electron Window
 * @package : Window Frame (Component)
 */

import React, { useEffect, useRef } from 'react';
import Menu from './Menu'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'

type Props = {
  title?: string;
  borderColor?: string;
  platform: 'windows' | 'mac';
  children: React.ReactNode;
};

type Context = {
  platform: 'windows' | 'mac';
};

export const WindowContext = React.createContext<Context>({
  platform: 'windows',
});

const WindowFrame: React.FC<Props> = (props) => {
  const itsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { parentElement } = itsRef.current;
    parentElement.classList.add('has-electron-window');
    parentElement.classList.add('has-border');
  }, []);

  return (
    <WindowContext.Provider value={{ platform: props.platform }}>
      {/* Reference creator */}
      <div className='start-electron-window' ref={itsRef}></div>
      <ThemeProvider theme={theme}>
        {/* Window Titlebar */}
        <Menu />
        {/* Window Content (Application to render) */}
        <div className='window-content'>{props.children}</div>
      </ThemeProvider>
    </WindowContext.Provider>
  );
};

export default WindowFrame;
