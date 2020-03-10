import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const AddIcon = ({ className }) => {
  return (
    <>
      <svg className={cls('fill-current', className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
      </svg>
    </>
  );
};

AddIcon.propTypes = {
  className: PropTypes.string,
};

AddIcon.defaultProps = {};

export default AddIcon;
