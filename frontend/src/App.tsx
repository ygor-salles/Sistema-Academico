import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './Routes';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

function App() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
    }),
  );
  const classes = useStyles();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // paletas de cores legais: #7b1fa2 #444e83 #3f51b5 #212121: https://material-ui.com/pt/customization/palette/

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: { main: prefersDarkMode ? '#7b1fa2' : '#7b1fa2' },
          secondary: { main: prefersDarkMode ? '#fff' : '#7b1fa2' }
        },
      }),
    [prefersDarkMode],
  );

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;