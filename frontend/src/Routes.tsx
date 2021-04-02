import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FooterApp } from './components/template/footer/Footer';
import HeaderApp from './components/template/header/HeaderApp';
import MainApp from './components/template/main/MainApp';
import NavApp from './components/template/nav/NavApp';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginBottom: 20,
    },
    // bullet: {
    //   display: 'inline-block',
    //   margin: '0 2px',
    //   transform: 'scale(0.8)',
    // },
  }),
);

function Routes() {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <HeaderApp />
            <NavApp />
            <main className={classes.content}>
                <Toolbar />
                <Switch>
                    <Route path="/">
                        <MainApp />
                    </Route>
                </Switch>    
            </main>
            <FooterApp />
        </BrowserRouter>
    )
}

export { Routes };