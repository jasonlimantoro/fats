import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'layouts/Dashboard';
import { routes } from 'config/routes';
import Overview from './Overview';
import Attendances from './Attendances';
import { menus, quickLinks } from './constant';

const StudentPanel = () => {
  return (
    <Dashboard quickLinks={quickLinks} menus={menus}>
      <Switch>
        <Route
          exact
          path={routes.panel.student.overview}
          component={Overview}
        />
        <Route
          path={routes.panel.student.attendances}
          component={Attendances}
        />
      </Switch>
    </Dashboard>
  );
};

StudentPanel.propTypes = {};

StudentPanel.defaultProps = {};

export default StudentPanel;
