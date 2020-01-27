import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from 'config/routes';
import Home from './Home';
import Login from './Login';

export default () => (
  <Switch>
    <Route exact path={routes.home} component={Home} />
    <Route path={routes.login} component={Login} />
    <Redirect to={routes.home} />
  </Switch>
);
