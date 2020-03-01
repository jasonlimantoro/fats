import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routes } from 'config/routes';
import { selectIsLoggedIn, selectUser } from '@/auth/auth.selector';
import Guard from 'routes/Guard';

const GuestGuard = ({ isLoggedIn, user, ...rest }) => {
  return <Guard protect={() => !isLoggedIn} redirectTo={String(routes.panel[user.domain])} {...rest} />;
};

GuestGuard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

GuestGuard.defaultProps = {};

export default connect(state => ({
  isLoggedIn: selectIsLoggedIn(state),
  user: selectUser(state),
}))(GuestGuard);
