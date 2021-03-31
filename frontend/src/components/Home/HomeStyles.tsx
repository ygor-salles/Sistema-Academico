import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        root: {
            minWidth: 275,
            marginTop: 30
        },
        bullet: {
            display: 'inline-block',
            margin: '0 10px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 50,
        },
        pos: {
            marginTop: 50,
        },
    }),
);

export { useStyles }