import { fromJS } from 'immutable';
import { ScopedKey } from 'lib/utils';
import { actionTypes } from './constant';

const initialState = fromJS({
  data: {
    attendances: {},
    schedules: {},
    labs: {},
    students: {},
  },
  result: '',
  status: {
    attendance: {
      fetchLoading: false,
      fetchError: false,
      detailLoading: false,
      detailError: false,
      createLoading: false,
      createError: false,
    },
    schedule: {
      fetchLoading: false,
      fetchError: false,
      detailLoading: false,
      detailError: false,
      createLoading: false,
      createError: false,
    },
    student: {
      fetchLoading: false,
      fetchError: false,
      detailLoading: false,
      detailError: false,
      createLoading: false,
      createError: false,
    },
    lab: {
      fetchLoading: false,
      fetchError: false,
      detailLoading: false,
      detailError: false,
      createLoading: false,
      createError: false,
    },
  },
});

export default function(state = initialState, action) {
  const scope = new ScopedKey(action.scope);
  switch (action.type) {
    case actionTypes.FETCH_BEGIN:
    case actionTypes.DETAIL_BEGIN:
    case actionTypes.ADD_BEGIN:
      return state.setIn(['status', action.resource, scope.loading], true);

    case actionTypes.FETCH_SUCCESS:
    case actionTypes.DETAIL_SUCCESS:
      return state
        .mergeIn(['data'], fromJS(action.payload.entities))
        .set('result', fromJS(action.payload.result));

    case actionTypes.ADD_SUCCESS:
      return state.mergeIn(
        ['data', `${action.resource}s`],
        fromJS(action.payload.entities[`${action.resource}s`]),
      );
    case actionTypes.REMOVE_SUCCESS:
      return state.setIn(['data', `${action.resource}s`, action.payload], undefined);

    case actionTypes.FETCH_FAILURE:
    case actionTypes.DETAIL_FAILURE:
    case actionTypes.ADD_FAILURE:
    case actionTypes.REMOVE_FAILURE:
      return state.setIn(['status', action.resource, scope.error], fromJS(action.payload));
    default:
      return state;
  }
}
