import { actionTypes } from './counter.constant';

export const increment = () => async dispatch => {
  dispatch({ type: actionTypes.INCREMENT });
};

export const decrement = () => async dispatch => {
  dispatch({ type: actionTypes.DECREMENT });
};
