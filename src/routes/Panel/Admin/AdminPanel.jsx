import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from 'layouts/Dashboard/Dashboard';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Breadcrumbs } from 'react-breadcrumbs-dynamic';
import { routes } from 'config/routes';
import { menus } from './constant';
import Sessions from './Sessions';

const AdminPanel = () => {
  return (
    <Dashboard menus={menus}>
      <Breadcrumbs separator={<b> / </b>} item={NavLink} finalItem="b" />
      <Dashboard.Title />
      <Switch>
        <Route path={String(routes.panel.admin.sessions)} component={Sessions} />
        <Redirect to={String(routes.panel.admin.sessions)} />
      </Switch>
    </Dashboard>
  );
};

AdminPanel.propTypes = {};

AdminPanel.defaultProps = {};

export default AdminPanel;
