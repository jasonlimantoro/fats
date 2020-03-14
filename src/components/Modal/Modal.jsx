import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { getTypeStyle } from 'lib/utils';
import useCountDown from 'lib/hooks/useCountDown';

const ModalContext = React.createContext();

const modalStyle = {
  width: 600,
};
const getInitialTimeOut = timeout => timeout / 1000;
const Modal = ({ show, onClose, className, children, type, timeout }) => {
  const { timer: countDown } = useCountDown({
    start: getInitialTimeOut(timeout),
    onFinish: onClose,
    resetOnFinish: true,
    shouldCount: show,
    shouldReset: !show,
  });

  const context = React.useMemo(() => ({ type, onClose, countDown }), [type, onClose, countDown]);

  if (!show) return null;
  return (
    <ModalContext.Provider value={context}>
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
          style={modalStyle}
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

Header.displayName = 'Modal.Header';

// eslint-disable-next-line react/prop-types
const Body = ({ children, className }) => {
  const { type } = React.useContext(ModalContext);
  return (
    <div data-label="modal-body" className={cls(getTypeStyle(type), className)}>
      {children}
    </div>
  );
};
Body.displayName = 'Modal.Body';

const btnClass = {
  success: 'btn-green',
  error: 'btn-red',
};

// eslint-disable-next-line react/prop-types
const DismissButton = ({ children, className }) => {
  const { type, onClose, countDown } = React.useContext(ModalContext);
  return (
    <button onClick={onClose} className={cls('btn', btnClass[type], className)}>
      {children instanceof Function ? children({ countDown }) : children}
    </button>
  );
};
DismissButton.displayName = 'DismissButton';

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
