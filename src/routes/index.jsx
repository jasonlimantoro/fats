import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from 'config/routes';
import Home from './Home';
import Login from './Login';
import Panel from './Panel';
import GuestRoute from './GuestRoute';

export default () => (
  <Switch>
    <Route exact path={routes.home} component={Home} />
    <GuestRoute path={routes.login} component={Login} />
    <Route path="/panel" component={Panel} />
    <Redirect to={routes.home} />
  </Switch>
);
