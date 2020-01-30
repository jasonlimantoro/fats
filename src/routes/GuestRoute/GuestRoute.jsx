import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { routes } from 'config/routes';
import { selectIsLoggedIn, selectUser } from '@/auth/auth.selector';

const GuestRoute = ({ isLoggedIn, user, ...rest }) => {
  if (isLoggedIn) {
    return <Redirect to={String(routes.panel[user.domain])} />;
  }
  return <Route {...rest} />;
};

GuestRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

GuestRoute.defaultProps = {};

export default connect(state => ({
  isLoggedIn: selectIsLoggedIn(state),
  user: selectUser(state),
}))(GuestRoute);
