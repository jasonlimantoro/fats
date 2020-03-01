import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import AuthGuard from 'routes/Guard/AuthGuard';
import StudentPanel from './Student';
import AdminPanel from './Admin';

const Panel = ({ match }) => {
  const { url } = match;
  return (
    <Switch>
      <AuthGuard requiredDomains={['student']} path={`${url}/student`} component={StudentPanel} />
      <AuthGuard requiredDomains={['admin']} path={`${url}/admin`} component={AdminPanel} />
    </Switch>
  );
};

Panel.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

Panel.defaultProps = {};

export default Panel;
