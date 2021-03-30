import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
        flexGrow: 1,
        height: 30
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        height: 50
    },
  }),
);

export { useStyles }