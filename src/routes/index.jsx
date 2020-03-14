import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'config/routes';
import Login from './Login';
import Panel from './Panel';
import GuestGuard from './Guard/GuestGuard';
import ActiveSessionGuard from './Guard/ActiveSessionGuard';
import Camera from './Camera';
import Home from './Home';
import Test from './Test';

export default () => (
  <Switch>
    <Route exact path={routes.home} component={Home} />
    <GuestGuard path={routes.login} component={Login} />
    <ActiveSessionGuard path={routes.camera} component={Camera} />
    <Route path="/panel" component={Panel} />
    <Route path="/test" component={Test} />
    <Route render={({ location: { pathname } }) => <div>{pathname} - not found</div>} />
  </Switch>
);
