import React from 'react';
import PropTypes from 'prop-types';
import { valueType } from '../UtilPropTypes';

const Counter = ({ counter, onAdd, onMinus }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span>Counter: {counter}</span>
      <div>
        <button className="btn btn-indigo mx-4" onClick={onAdd}>
          +
        </button>
        <button className="btn btn-indigo mx-4" onClick={onMinus}>
          -
        </button>
      </div>
    </div>
  );
};

Counter.propTypes = {
  counter: valueType,
  onAdd: PropTypes.func.isRequired,
  onMinus: PropTypes.func.isRequired,
};

export default Counter;
