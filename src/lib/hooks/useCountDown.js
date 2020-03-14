import { useState, useEffect, useRef, useCallback } from 'react';
import { noop } from 'lib/utils';

const useCountDown = ({
  start = 5,
  interval = 1000,
  onFinish = noop,
  shouldCount = true,
  resetOnFinish = false,
  shouldReset = false,
} = {}) => {
  const [timer, setTimer] = useState(start);
  const intervalRef = useRef();
  const resetTimer = useCallback(
    () => {
      setTimer(start);
    },
    [start],
  );
  useEffect(
    () => {
      if (timer <= 0) {
        clearInterval(intervalRef.current);
        onFinish();
        if (resetOnFinish) {
          resetTimer();
        }
      } else if (shouldReset) {
        resetTimer();
      } else if (shouldCount) {
        const id = setInterval(() => {
          setTimer(timer => timer - 1);
        }, interval);
        intervalRef.current = id;
      }
      return () => {
        clearInterval(intervalRef.current);
      };
    },
    [timer, interval, onFinish, shouldCount, shouldReset, resetOnFinish, resetTimer],
  );

  return { timer, resetTimer };
};

export default useCountDown;
