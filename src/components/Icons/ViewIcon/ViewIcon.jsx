import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const ViewIcon = ({ className }) => {
  return (
    <>
      <svg className={cls('fill-current', className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
      </svg>
    </>
  );
};

ViewIcon.propTypes = {
  className: PropTypes.string,
};

ViewIcon.defaultProps = {};

export default ViewIcon;
