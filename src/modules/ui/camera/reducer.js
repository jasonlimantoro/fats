import { fromJS } from 'immutable';
import { actionTypes } from './constant';

const initialState = fromJS({
  activeSession: {},
  hasActiveSession: false,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SESSION:
      return state.set('activeSession', fromJS(action.payload)).set('hasActiveSession', true);
    default:
      return state;
  }
}
