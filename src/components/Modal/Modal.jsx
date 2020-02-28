import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const types = {
  success: {
    main: 'bg-green-200',
    text: 'text-green-700',
    border: 'border-green-400',
  },
  error: {
    main: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-400',
  },
  info: {
    main: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-400',
  },
};

const getTypeStyle = (type, properties = ['text', 'border', 'main']) => {
  const typeStyle = types[type];
  return properties.reduce((accum, current) => cls(accum, typeStyle[current]), '');
};

const ModalContext = React.createContext();

const Modal = ({ show, onClose, className, children, type, timeout }) => {
  const [countDown, setCountDown] = React.useState(timeout / 1000);
  React.useEffect(
    () => {
      if (countDown === 0) {
        onClose();
      }
      const timer = setTimeout(() => {
        if (!timeout || !show) return;
        setCountDown(count => count - 1);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    },
    [timeout, countDown, onClose, show],
  );
  if (!show) return null;
  return (
    <ModalContext.Provider value={{ type, onClose, countDown }}>
      <div className="absolute h-screen w-screen flex justify-center items-center">
        <div
          data-label="modal"
          className="h-full w-full top-0 left-0 fixed bg-black opacity-75"
          role="button"
          tabIndex="-1"
          onClick={onClose}
        />
        <div
          className={cls(
            'h-64 p-4 rounded cursor-default relative top-0 left-0 z-10',
            getTypeStyle(type),
            className,
          )}
          style={{ width: 600 }}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react/prop-types
const Header = ({ children, className }) => {
  const { type } = React.useContext(ModalContext);
  return (
    <div data-label="modal-header" className={cls(getTypeStyle(type), className)}>
      {children}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Body = ({ children, className }) => {
  const { type } = React.useContext(ModalContext);
  return (
    <div data-label="modal-body" className={cls(getTypeStyle(type), className)}>
      {children}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const DismissButton = ({ children, className }) => {
  const { type, onClose, countDown } = React.useContext(ModalContext);
  const btnClass = {
    success: 'btn-green',
    error: 'btn-red',
  };
  return (
    <button onClick={onClose} className={cls('btn', btnClass[type], className)}>
      {children instanceof Function ? children({ countDown }) : children}
    </button>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.DismissButton = DismissButton;
Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['error', 'success', 'info']),
  children: PropTypes.any,
  className: PropTypes.string,
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

Modal.defaultProps = {
  type: 'info',
  timeout: false,
};

export default Modal;
