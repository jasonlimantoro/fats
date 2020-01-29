import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import brand from 'images/sample-brand.svg';
import cls from 'classnames';
import { logout } from '@/auth/auth.actions';
import { selectUser } from '@/auth/auth.selector';
import ProtectedRoute from 'routes/ProtectedRoute';
import StudentPanel from './Student';
import AdminPanel from './Admin';

const Panel = ({ match, history, logout, user }) => {
  const { url } = match;
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  return (
    <div className="flex">
      <aside
        className="w-full bg-gray-900 text-white min-h-screen px-4"
        style={{ maxWidth: 200 }}
      >
        <div
          className="font-bold flex items-center justify-center border-b-2 border-gray-500 capitalize"
          style={{ height: 72 }}
        >
          {user.domain} Panel
        </div>
        <div className="pt-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Section 1</p>
            <a className="block p-2 hover:bg-gray-700 rounded" href="#">
              Side Link 1
            </a>
            <a className="block p-2 hover:bg-gray-700 rounded mt-1" href="#">
              Side Link 2
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Section 1</p>
            <a className="block p-2 hover:bg-gray-700 rounded mt-1" href="#">
              Side Link 3
            </a>
          </div>
        </div>
      </aside>
      <div className="flex-1">
        <header className="bg-gray-800 text-white sm:flex sm:justify-between items-center py-3 px-4">
          <div className="bg-gray-800 flex justify-between items-center">
            <div className="cursor-pointer">
              <img className="h-10" src={brand} alt="brand-logo" />
            </div>
            <div className="sm:hidden">
              <button
                onClick={() => setNavbarOpen(prev => !prev)}
                className="text-gray-300 focus:text-white hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  {navbarOpen ? (
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                  ) : (
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          <div
            className={cls({ hidden: !navbarOpen }, 'sm:flex sm:items-center')}
          >
            <a
              href="#"
              className="block py-2 px-2 sm:ml-2 rounded hover:bg-gray-700"
            >
              Link 1
            </a>
            <a
              href="#"
              className="block mt-1 py-2 px-2 sm:ml-2 rounded sm:mt-0 hover:bg-gray-700"
            >
              Link 2
            </a>
            <a
              href="#"
              className="block mt-1 py-2 px-2 sm:ml-2 rounded sm:mt-0 hover:bg-gray-700"
            >
              Link 3
            </a>
            <div className="relative ml-6">
              <p className="inline">Welcome, {user.username}!</p>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="hidden relative sm:inline-flex sm:justify-center sm:items-center z-10 h-8 w-8 bg-white text-black hover:bg-gray-200 ml-2 rounded-full shadow cursor-pointer"
              >
                {user.username[0].toUpperCase()}
              </button>
              <button
                data-label="overlay"
                className={cls(
                  'fixed inset-0 w-full h-full bg-black opacity-50 cursor-default',
                  { hidden: !dropdownOpen },
                )}
                onClick={() => setDropdownOpen(prev => !prev)}
              />
              <div
                className={cls(
                  'absolute right-0 bg-white rounded-lg py-2 text-black w-32 shadow-md',
                  {
                    hidden: !dropdownOpen,
                  },
                )}
              >
                <a
                  className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-gray-500"
                  href="#"
                >
                  Settings
                </a>
                <button
                  className="w-full text-left px-4 py-2 text-gray-800 hover:text-white hover:bg-gray-500"
                  onClick={() => logout(history)}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>
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
    </div>
  );
};

Panel.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

Panel.defaultProps = {};

export default connect(
  state => ({
    user: selectUser(state),
  }),
  { logout },
)(Panel);
