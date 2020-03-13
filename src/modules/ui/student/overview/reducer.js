import { fromJS } from 'immutable';
import { actionTypes } from './constant';

const initialState = fromJS({
  attendanceIds: [],
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FEED_DATA:
      return state.set('attendanceIds', fromJS(action.payload.attendanceIds) || []);
    default:
      return state;
  }
}
