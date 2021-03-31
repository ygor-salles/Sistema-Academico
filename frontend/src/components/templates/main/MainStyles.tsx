import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginBottom: 50
      },
  }),
);

export { useStyles }