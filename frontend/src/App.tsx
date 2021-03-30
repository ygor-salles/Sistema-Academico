import { HeaderApp } from './components/templates/header/HeaderApp';
import { NavApp } from './components/templates/nav/NavApp';
import { MainApp } from './components/templates/main/MainApp';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from './AppStyles'
import { FooterApp } from './components/templates/footer/FooterApp';

function App() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderApp />
      <NavApp />
      <MainApp />
      <FooterApp />
    </div>
  );
}

export default App;
