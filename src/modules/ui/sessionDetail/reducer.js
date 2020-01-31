import { fromJS } from 'immutable';
import { actionTypes } from './constant';

const initialState = fromJS({
  fetchLoading: false,
  fetchResponse: {},
  fetchError: {},
  fetchLoaded: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SESSION_DETAIL_BEGIN:
      return state.set('fetchLoading', true);
    case actionTypes.FETCH_SESSION_DETAIL_SUCCESS:
      return state
        .set('fetchLoading', false)
        .set('fetchResponse', fromJS(action.payload))
        .set('fetchError', initialState.get('fetchError'))
        .set('fetchLoaded', true);
    case actionTypes.FETCH_SESSION_DETAIL_FAILURE:
      return state
        .set('fetchLoading', false)
        .set('fetchError', fromJS(action.payload))
        .set('fetchResponse', initialState.get('fetchResponse'))
        .set('fetchLoaded', true);
    default:
      return state;
  }
}
