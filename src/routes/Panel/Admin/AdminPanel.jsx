import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from 'layouts/Dashboard/Dashboard';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Breadcrumbs } from 'react-breadcrumbs-dynamic';
import { routes } from 'config/routes';
import { menus } from './constant';
import SessionsRoutes from './Sessions';
import RegisterStudent from './RegisterStudent';

const AdminPanel = () => {
  return (
    <Dashboard menus={menus}>
      <Breadcrumbs separator={<b> / </b>} item={NavLink} finalItem="b" />
      <Dashboard.Title />
      <Switch>
        <Route path={routes.panel.admin.register} component={RegisterStudent} />
        <Route path={String(routes.panel.admin.sessions)} component={SessionsRoutes} />
        <Redirect to={String(routes.panel.admin.sessions)} />
      </Switch>
    </Dashboard>
  );
};

AdminPanel.propTypes = {};

AdminPanel.defaultProps = {};

export default AdminPanel;
