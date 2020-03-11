import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import merge from 'lodash/merge';
import { getTypeStyle } from 'lib/utils';

const defaultStyles = {
  error: {
    main: 'bg-red-500',
    border: 'border-red-400',
    text: 'text-white',
    icon: 'text-red-500',
  },
  warning: {
    main: 'bg-yellow-500',
    border: 'border-yellow-400',
    text: 'text-white',
    icon: 'text-yellow-500',
  },
  success: {
    main: 'bg-green-500',
    border: 'border-green-400',
    text: 'text-white',
    icon: 'text-green-500',
  },
  info: {
    main: 'bg-blue-500',
    border: 'border-blue-400',
    text: 'text-blue-700',
    icon: 'text-blue-500',
  },
};
const Label = ({ children, type, className, styles }) => {
  return (
    <div
      className={cls(
        className,
        getTypeStyle(type, merge(defaultStyles, styles)),
        'px-3',
        'py-1',
        'rounded',
        'inline-block',
        'font-bold',
      )}
    >
      {children}
    </div>
  );
};

Label.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success', 'info', 'warning']),
  styles: PropTypes.object,
};

Label.defaultProps = {
  type: 'info',
};

export default Label;
