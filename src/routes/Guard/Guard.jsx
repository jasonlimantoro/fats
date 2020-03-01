import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Guard = ({ protect, redirectTo, ...rest }) => {
  if (protect()) {
    return <Route {...rest} />;
  }
  return <Redirect to={redirectTo} />;
};

Guard.propTypes = {
  protect: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default Guard;
