import React from 'react';
import { createStyles, Theme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './AppStyles';
import HeaderApp from './components/template/header/HeaderApp';
import NavApp from './components/template/nav/NavApp';
import MainApp from './components/template/main/MainApp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  }),
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeaderApp />
        <NavApp />
        <MainApp />
      </ThemeProvider>
    </div>
  );
}

export default App;