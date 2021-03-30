import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './FooterStyles'

export function FooterApp() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" color="transparent" className={classes.appBar}>
        <Toolbar>
          <Typography align="right" className={classes.grow}>
            Desenvolvido por Ygor Salles
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
