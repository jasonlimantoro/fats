import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from 'layouts/Dashboard/Dashboard';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'config/routes';
import { menus } from './constant';
import Sessions from './Sessions';
import SessionDetail from './SessionDetail';

const AdminPanel = () => {
  return (
    <Dashboard menus={menus}>
      <Switch>
        <Route
          path={String(routes.panel.admin.sessions)}
          component={Sessions}
          exact
        />
        <Route
          path={routes.panel.admin.sessions.detail}
          component={SessionDetail}
        />
        <Redirect to={String(routes.panel.admin.sessions)} />
      </Switch>
    </Dashboard>
  );
};

AdminPanel.propTypes = {};

AdminPanel.defaultProps = {};

export default AdminPanel;
