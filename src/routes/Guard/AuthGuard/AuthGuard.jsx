import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routes } from 'config/routes';
import Guard from 'routes/Guard';

import { selectIsLoggedIn, selectUser } from '@/auth/auth.selector';

const AuthGuard = ({ isLoggedIn, requiredDomains, user, ...rest }) => {
  return (
    <Guard
      protect={() => isLoggedIn && requiredDomains.includes(user.domain)}
      redirectTo={routes.login}
      {...rest}
    />
  );
};

AuthGuard.propTypes = {
  requiredDomains: PropTypes.arrayOf(PropTypes.string),
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

AuthGuard.defaultProps = {
  requiredDomains: ['student'],
};

export default connect(state => ({
  isLoggedIn: selectIsLoggedIn(state),
  user: selectUser(state),
}))(AuthGuard);
