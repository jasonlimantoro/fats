import { fromJS } from 'immutable';
import { actionTypes } from './auth.constants';

export const initialState = fromJS({
  loginLoading: false,
  loginResponse: {},
  loginError: {},
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_BEGIN:
      return state.set('loginLoading', true);
    case actionTypes.LOGIN_SUCCESS:
      return state
        .set('loginLoading', false)
        .set('loginResponse', fromJS(action.payload))
        .set('loginError', initialState.get('loginError'));
    case actionTypes.LOGIN_FAILURE:
      return state
        .set('loginLoading', false)
        .set('loginResponse', initialState.get('loginResponse'))
        .set('loginError', fromJS(action.payload));
    default:
      return state;
  }
}
