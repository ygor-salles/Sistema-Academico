import React from 'react';
import { theme, useStyles } from './AppStyles'

import { ThemeProvider } from '@material-ui/styles';
import { Routes } from './Routes';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
