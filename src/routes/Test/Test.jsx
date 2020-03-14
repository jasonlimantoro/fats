import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useCountDown from 'lib/hooks/useCountDown';

const Test = () => {
  const [, setFinished] = useState(false);
  const handleFinish = useCallback(() => {
    alert('Count down finished');
    setFinished(true);
  }, []);
  const { timer } = useCountDown({
    onFinish: handleFinish,
  });
  return <div>Countdown: {timer}</div>;
};

Test.propTypes = {};

Test.defaultProps = {};

export default Test;
