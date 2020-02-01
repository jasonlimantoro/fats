import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from 'layouts/Dashboard/Dashboard';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'config/routes';
import { menus } from './constant';
import Sessions from './Sessions';
import SessionDetail from './SessionDetail';
import AddAttendance from './AddAttendance';

const AdminPanel = () => {
  return (
    <Dashboard menus={menus}>
      <Switch>
        <Route path={String(routes.panel.admin.sessions)} component={Sessions} exact />
        <Route exact path={String(routes.panel.admin.sessions.detail)} component={SessionDetail} />
        <Route
          path={String(routes.panel.admin.sessions.detail.attendance.add.student)}
          component={AddAttendance}
        />
        <Redirect to={String(routes.panel.admin.sessions)} />
      </Switch>
    </Dashboard>
  );
};

AdminPanel.propTypes = {};

AdminPanel.defaultProps = {};

export default AdminPanel;
