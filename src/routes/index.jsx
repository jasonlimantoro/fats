import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'config/routes';
import Login from './Login';
import Panel from './Panel';
import GuestRoute from './GuestRoute';
import Camera from './Camera';

export default () => (
  <Switch>
    <GuestRoute path={routes.login} component={Login} />
    <Route path="/camera" component={Camera} />
    <Route path="/panel" component={Panel} />
    <Route render={({ location: { pathname } }) => <div>{pathname} - not found</div>} />
  </Switch>
);
