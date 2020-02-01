import { fromJS } from 'immutable';
import { ScopedKey } from 'lib/utils';
import { actionTypes } from './attendance.constant';

const initialState = fromJS({
  listLoading: false,
  listResponse: [],
  listError: {},
  listLoaded: {},
  deleteLoading: false,
  deleteResponse: {},
  deleteError: {},
  deleteLoaded: {},
});

export default function(state = initialState, action) {
  const scope = new ScopedKey(action.scope);
  switch (action.type) {
    case actionTypes.SET_BEGIN: {
      return state.set(scope.loading, true);
    }
    case actionTypes.SET_FAILURE: {
      return state
        .set(scope.loading, false)
        .set(scope.response, initialState.get(scope.response))
        .set(scope.error, fromJS(action.payload))
        .set(scope.loaded, true);
    }
    case actionTypes.SET_SUCCESS: {
      return state
        .set(scope.loading, false)
        .set(scope.response, fromJS(action.payload))
        .set(scope.error, initialState.get(scope.error))
        .set(scope.loaded, true);
    }
    default:
      return state;
  }
}
