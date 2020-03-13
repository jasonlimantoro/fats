import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const RefreshIcon = ({ className, ...rest }) => {
  return (
    <>
      <svg
        className={cls('fill-current', className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        {...rest}
      >
        <path d="M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4 4-4v8zm0-12V0l4 4-4 4z" />
      </svg>
    </>
  );
};

RefreshIcon.propTypes = {
  className: PropTypes.string,
};

RefreshIcon.defaultProps = {};

export default RefreshIcon;
