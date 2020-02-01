import React from 'react';
import PropTypes from 'prop-types';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'config/routes';
import SessionDetailRoutes from 'routes/Panel/Admin/SessionDetail/routes';
import Sessions from './Sessions';

const Routes = ({ match }) => {
  const { url } = match;
  return (
    <div>
      <BreadcrumbsItem className="breadcrumb" to={url}>
        All
      </BreadcrumbsItem>
      <Switch>
        <Route exact path={url} component={Sessions} />
        <Route path={String(routes.panel.admin.sessions.detail)} component={SessionDetailRoutes} />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  match: PropTypes.object,
};

Routes.defaultProps = {};

export default Routes;
