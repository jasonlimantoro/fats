import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { routes } from 'config/routes';
import { selectIsLoggedIn, selectUser } from '@/auth/auth.selector';

const ProtectedRoute = ({ isLoggedIn, requiredDomains, user, ...rest }) => {
  if (isLoggedIn && requiredDomains.includes(user.domain)) {
    return <Route {...rest} />;
  }
  return <Redirect to={routes.login} />;
};

ProtectedRoute.propTypes = {
  requiredDomains: PropTypes.arrayOf(PropTypes.string),
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

ProtectedRoute.defaultProps = {
  requiredDomains: ['student'],
};

export default connect(state => ({
  isLoggedIn: selectIsLoggedIn(state),
  user: selectUser(state),
}))(ProtectedRoute);
