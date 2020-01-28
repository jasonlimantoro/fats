import { fromJS } from 'immutable';
import { actionTypes } from '@/auth/auth.constants';

const initialState = fromJS({
  isLoggedIn: false,
  user: {},
});
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return state
        .set('isLoggedIn', true)
        .mergeIn(['user'], fromJS(action.payload));
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
