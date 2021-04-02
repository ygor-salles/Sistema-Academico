import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
        flexGrow: 1,
        height: 45
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        height: 40
    },
  }),
);

export function FooterApp() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography align="right" className={classes.grow}>
            Desenvolvido por Ygor Salles
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}