import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const EditIcon = ({ className }) => {
  return (
    <>
      <svg className={cls('fill-current', className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
      </svg>
    </>
  );
};

EditIcon.propTypes = {
  className: PropTypes.string,
};

EditIcon.defaultProps = {};

export default EditIcon;
