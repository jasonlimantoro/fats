import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { connect } from 'react-redux';
import { selectUser } from '@/auth/auth.selector';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ domain, menus, match }) => {
  const { url } = match;
  return (
    <aside
      className="w-full bg-gray-900 text-white min-h-screen"
      style={{ maxWidth: 200 }}
    >
      <div
        className="flex items-center justify-center px-4 border-b-2 border-gray-500 font-bold capitalize"
        style={{ height: 72 }}
      >
        {domain} Panel
      </div>
      <div className="pt-4">
        {menus.map(({ id, label, children }, idx) => (
          <div
            key={id}
            className={cls({
              'mt-4': idx !== 0,
            })}
          >
            <p className="px-3 text-sm font-semibold text-gray-500 mb-2">
              {label}
            </p>
            {children.map(({ id, label, path }) => (
              <NavLink
                activeClassName="bg-gray-700 text-white"
                className="block px-6 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                key={id}
                to={`${url}/${path}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  domain: PropTypes.string,
  menus: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

Sidebar.defaultProps = {
  domain: 'Student',
};

export default connect(state => ({
  user: selectUser(state),
}))(Sidebar);
