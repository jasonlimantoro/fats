import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cls from 'classnames';

const Navbar = ({ onLogout, user, quickLinks, match }) => {
  const { url } = match;
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  return (
    <header className="bg-gray-800 text-white sm:flex sm:justify-between items-center py-3 px-4">
      <div
        className="bg-gray-800 flex justify-between items-center"
        style={{ height: 45 }}
      >
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
      <div className={cls({ hidden: !navbarOpen }, 'sm:flex sm:items-center')}>
        {quickLinks.map(({ id, path, label }, idx) => (
          <NavLink
            className={cls(
              'block py-2 px-2',
              {
                'sm:ml-2': idx !== 0,
              },
              'rounded hover:bg-gray-700',
            )}
            key={id}
            to={`${url}/${path}`}
          >
            {label}
          </NavLink>
        ))}
        <div className="relative ml-6">
          <p className="hidden sm:inline">Welcome, {user.username}!</p>
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
              onClick={onLogout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  quickLinks: PropTypes.array,
  match: PropTypes.object.isRequired,
};

Navbar.defaultProps = {
  quickLinks: [],
};

export default Navbar;
