import { fromJS } from 'immutable';
import { actionTypes } from './constant';

const initialState = fromJS({
  sessionIds: [],
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FEED_DATA:
      return state.set('sessionIds', fromJS(action.payload.sessionIds));
    default:
      return state;
  }
}
