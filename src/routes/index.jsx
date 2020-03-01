import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'config/routes';
import Login from './Login';
import Panel from './Panel';
import GuestRoute from './GuestRoute';
import Camera from './Camera';
import Home from './Home';

export default () => (
  <Switch>
    <Route exact path={routes.home} component={Home} />
    <GuestRoute path={routes.login} component={Login} />
    <Route path={routes.camera} component={Camera} />
    <Route path="/panel" component={Panel} />
    <Route render={({ location: { pathname } }) => <div>{pathname} - not found</div>} />
  </Switch>
);
