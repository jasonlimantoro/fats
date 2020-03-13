import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ children, initialSpin, timeout }) => {
  const [spin, setSpin] = React.useState(initialSpin);
  const [countDown, setCountDown] = React.useState(timeout);
  React.useEffect(
    () => {
      const interval = setInterval(() => {
        if (spin && countDown >= 0) {
          setCountDown(c => c - 1);
        } else {
          setCountDown(timeout);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    },
    [countDown, spin, timeout],
  );
  React.useEffect(
    () => {
      if (countDown === 0) {
        setSpin(false);
      }
    },
    [countDown],
  );
  const toggleSpin = () => {
    setSpin(s => !s);
  };
  return children({ spin, toggleSpin });
};

Spinner.propTypes = {
  children: PropTypes.any,
  initialSpin: PropTypes.bool,
  timeout: PropTypes.number,
};

Spinner.defaultProps = {
  initialSpin: false,
  timeout: 1,
};

export default Spinner;
