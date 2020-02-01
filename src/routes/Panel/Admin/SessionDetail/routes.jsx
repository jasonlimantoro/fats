import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'config/routes';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import AddAttendance from 'routes/Panel/Admin/AddAttendance';
import SessionDetail from './SessionDetail';

const Routes = ({ match }) => {
  const {
    params: { sessionId },
  } = match;
  const { url } = match;
  return (
    <div>
      <BreadcrumbsItem className="breadcrumb" to={url}>
        Session {sessionId}
      </BreadcrumbsItem>
      <Switch>
        <Route exact path={url} render={() => <SessionDetail match={match} />} />
        <Route
          path={String(routes.panel.admin.sessions.detail.attendance.add.student)}
          component={AddAttendance}
        />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  match: PropTypes.object,
};

Routes.defaultProps = {};

export default Routes;
