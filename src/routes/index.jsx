import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from 'config/routes';
import Login from './Login';
import Panel from './Panel';
import GuestRoute from './GuestRoute';

export default () => (
  <Switch>
    <GuestRoute path={routes.login} component={Login} />
    <Route path={String(routes.panel)} component={Panel} />
    <Redirect to={routes.login} />
  </Switch>
);
