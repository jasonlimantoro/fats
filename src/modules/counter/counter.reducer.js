import { fromJS } from 'immutable';
import { actionTypes } from './counter.constant';

const initialState = fromJS({
  count: 0,
});

export const keys = {
  COUNT: 'count',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return state.update(keys.COUNT, count => count + 1);
    case actionTypes.DECREMENT:
      return state.update(keys.COUNT, count => count - 1);
    default:
      return state;
  }
}
