import { fromJS } from 'immutable';
import { actionTypes } from './auth.constants';

export const initialState = fromJS({
  loginLoading: false,
  currentUser: {},
  loginError: {},
});

const currentUser = (state = initialState.get('currentUser'), action) => {
  if (action.type === actionTypes.LOGIN_SUCCESS) {
    return state.merge(action.payload);
  }
  return state;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_BEGIN:
      return state.set('loginLoading', true);
    case actionTypes.LOGIN_SUCCESS:
      return state
        .set('loginLoading', false)
        .set('currentUser', currentUser(state.get('currentUser'), action))
        .set('loginError', initialState.get('loginError'));
    case actionTypes.LOGIN_FAILURE:
      return state
        .set('loginLoading', false)
        .set('currentUser', currentUser(state.get('currentUser'), action))
        .set('loginError', fromJS(action.payload));
    default:
      return state;
  }
}
