import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '@/auth/auth.actions';
import ProtectedRoute from 'routes/ProtectedRoute';
import StudentPanel from './Student';
import AdminPanel from './Admin';

const Panel = ({ match, history, logout }) => {
  const { url } = match;
  return (
    <div>
      <button onClick={() => logout(history)} className="btn btn-indigo">
        Sign Out
      </button>
      <Switch>
        <ProtectedRoute
          requiredDomains={['student']}
          path={`${url}/student`}
          component={StudentPanel}
        />
        <ProtectedRoute
          requiredDomains={['admin']}
          path={`${url}/admin`}
          component={AdminPanel}
        />
      </Switch>
    </div>
  );
};

Panel.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

Panel.defaultProps = {};

export default connect(
  null,
  { logout },
)(Panel);
