import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import index from '../containers/index.tsx'

export default () => (
    <HashRouter>
        <Switch>
            <Route exact path={'/'} component={index}/>
        </Switch>
    </HashRouter>
)