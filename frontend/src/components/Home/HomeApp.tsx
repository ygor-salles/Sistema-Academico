import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useStyles } from './HomeStyles';

export function HomeApp() {
    const classes = useStyles();

    return (
        <div>
            <main className={classes.content}>
                <Toolbar />
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Bem vindo
                    </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            adjective
                    </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                    <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </main>
        </div>
    )
}