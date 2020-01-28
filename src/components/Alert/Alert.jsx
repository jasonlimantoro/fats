import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const styles = {
  error: {
    main: 'bg-red-100',
    border: 'border-red-400',
    text: 'text-red-700',
    icon: 'text-red-500',
  },
  success: {
    main: 'bg-green-100',
    border: 'border-green-400',
    text: 'text-green-700',
    icon: 'text-green-500',
  },
  info: {
    main: 'bg-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-700',
    icon: 'text-blue-500',
  },
};
const Alert = ({ className, children, type, show, onClose }) => {
  if (show) {
    return (
      <div
        className={cls(
          'border px-4 py-3 rounded relative my-8',
          styles[type].main,
          styles[type].border,
          styles[type].text,
          className,
        )}
        role="alert"
      >
        {children}
        <span
          role="button"
          tabIndex={0}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          onClick={onClose}
        >
          <svg
            className={cls('fill-current h-6 w-6', styles[type].icon)}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    );
  }
  return null;
};

// eslint-disable-next-line react/prop-types
Alert.Title = ({ children }) => <p className={cls('font-bold')}>{children}</p>;
// eslint-disable-next-line react/prop-types
Alert.Body = ({ children }) => <p className={cls('text-sm')}>{children}</p>;

Alert.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  type: PropTypes.oneOf(['error', 'success', 'info']),
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  type: 'info',
  show: true,
};

export default Alert;
