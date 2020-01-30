import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from 'layouts/Dashboard';
import { routes } from 'config/routes';
import Overview from './Overview';
import Attendances from './Attendances';
import { menus, quickLinks } from './constant';

const StudentPanel = ({ match }) => {
  const { url } = match;
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
        <Redirect from={url} to={routes.panel.student.overview} />
      </Switch>
    </Dashboard>
  );
};

StudentPanel.propTypes = {
  match: PropTypes.object,
};

StudentPanel.defaultProps = {};

export default StudentPanel;
