import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectHasActiveSession } from '@/ui/camera/selector';
import Guard from 'routes/Guard/Guard';
import { routes } from 'config/routes';

const ActiveSessionGuard = ({ hasActiveSession, ...rest }) => {
  return <Guard protect={() => hasActiveSession} redirectTo={routes.home} {...rest} />;
};

ActiveSessionGuard.propTypes = {
  hasActiveSession: PropTypes.bool.isRequired,
};

ActiveSessionGuard.defaultProps = {};

const mapStateToProps = state => ({
  hasActiveSession: selectHasActiveSession(state),
});

export default connect(mapStateToProps)(ActiveSessionGuard);
