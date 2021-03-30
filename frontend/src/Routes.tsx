import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeApp } from './components/Home/HomeApp';
import { FooterApp } from './components/templates/footer/FooterApp';
import { HeaderApp } from './components/templates/header/HeaderApp';
import { NavApp } from './components/templates/nav/NavApp';

function Routes() {
    
    return (
        <BrowserRouter>
            <HeaderApp />
            <NavApp />
            <Switch>
                <Route path="/home">
                    <HomeApp />
                </Route>
            </Switch>
            <FooterApp />
        </BrowserRouter>
    )
}

export { Routes };
