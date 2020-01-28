import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from 'config/routes';
import Home from './Home';
import Login from './Login';
import Panel from './Panel';

export default () => (
  <Switch>
    <Route exact path={routes.home} component={Home} />
    <Route path={routes.login} component={Login} />
    <Route path={routes.panel} component={Panel} />
    <Redirect to={routes.home} />
  </Switch>
);
