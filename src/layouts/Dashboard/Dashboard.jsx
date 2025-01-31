import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { throughDirect, createAgent } from 'react-through';
import { selectUser } from '@/auth/auth.selector';
import { logout } from '@/auth/auth.actions';
import { fetchSemesters } from '@/ui/dashboard/actions';
import { selectCurrentSemester } from '@/semester/selector';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Dashboard = ({
  user,
  history,
  match,
  logout,
  menus,
  quickLinks,
  children,
  fetchSemesters,
  currentSemester,
}) => {
  React.useEffect(
    () => {
      fetchSemesters();
    },
    [fetchSemesters],
  );
  const handleLogout = React.useCallback(
    () => {
      logout(history);
    },
    [history, logout],
  );
  return (
    <div className="flex">
      <Sidebar domain={user.domain} menus={menus} match={match} />
      <div className="flex-1">
        <Navbar
          match={match}
          onLogout={handleLogout}
          user={user}
          quickLinks={quickLinks}
          semester={currentSemester}
        />
        <main className="px-4 py-3">{children}</main>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Title = ({ children, className }) => (
  <p className={cls('text-gray-800 text-3xl font-bold', className)}>{children}</p>
);

const Agent = createAgent('title');
Dashboard.Title = throughDirect('title')(Title);
Dashboard.TitleAgent = Agent;

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  fetchSemesters: PropTypes.func.isRequired,
  currentSemester: PropTypes.object.isRequired,
  children: PropTypes.any,
  menus: PropTypes.array.isRequired,
  quickLinks: PropTypes.array,
};

Dashboard.defaultProps = {};

export default compose(
  connect(
    state => ({
      user: selectUser(state),
      currentSemester: selectCurrentSemester(state),
    }),
    { logout, fetchSemesters },
  ),
  withRouter,
)(Dashboard);
