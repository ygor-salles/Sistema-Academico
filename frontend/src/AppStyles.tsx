import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#EB846E',
      contrastText: '#FFF'
    },
    // secondary: {
    //   main: '#C4C4C4',
    // },
  },
});


export { useStyles, theme }