import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import index from '../containers/index'
import common from '../containers/common'
import filter from '../containers/filter'
import drag from '../containers/drag'
import pagination from '../containers/pagination'

export default () => (
    <HashRouter>
        <Switch>
            <Route exact path={'/'} component={index}/>
            <Route exact path={'/common'} component={common}/>
            <Route exact path={'/filter'} component={filter}/>
            <Route exact path={'/drag'} component={drag}/>
            <Route exact path={'/pagination'} component={pagination}/>
        </Switch>
    </HashRouter>
)