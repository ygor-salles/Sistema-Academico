import { HeaderApp } from './components/templates/header/HeaderApp';
import { NavApp } from './components/templates/nav/NavApp';
import { MainApp } from './components/templates/main/MainApp';
import React from 'react';
import { theme, useStyles } from './AppStyles'
import { FooterApp } from './components/templates/footer/FooterApp';
import { ThemeProvider } from '@material-ui/styles';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <HeaderApp />
        <NavApp />
        <MainApp />
        <FooterApp />
      </ThemeProvider>
    </div>
  );
}

export default App;
