import { fromJS } from 'immutable';
import { ScopedKey, mergeDeep } from 'lib/utils';
import { actionTypes } from './constant';
import { state } from './core';

const initialState = fromJS(state);

const attendanceReducer = (state = {}, action) => {
  if (action.type === actionTypes.ADD_SUCCESS && action.resource === 'attendance') {
    return state.setIn(
      ['students', action.payload.entities.attendances[action.payload.result].student, 'attendanceId'],
      action.payload.result,
    );
  }
  return state;
};

const scheduleReducer = (state = {}, action) => {
  if (action.type === actionTypes.ADD_SUCCESS && action.resource === 'schedule') {
    return state.updateIn(
      ['labs', action.payload.entities.schedules[action.payload.result].lab, 'schedule_set'],
      ids => ids.push(action.payload.result),
    );
  }
  return state;
};

export default function(state = initialState, action) {
  const scope = new ScopedKey(action.scope);
  switch (action.type) {
    case actionTypes.FETCH_BEGIN:
    case actionTypes.DETAIL_BEGIN:
    case actionTypes.ADD_BEGIN:
    case actionTypes.REMOVE_BEGIN:
    case actionTypes.UPDATE_BEGIN:
      return state
        .setIn(['status', action.resource, scope.loading], true)
        .setIn(['status', action.resource, scope.loaded], false);

    case actionTypes.FETCH_SUCCESS:
    case actionTypes.DETAIL_SUCCESS:
      return state.updateIn(['data'], data => mergeDeep(data, fromJS(action.payload.entities)));

    case actionTypes.UPDATE_SUCCESS: {
      const statusPath = ['status', action.resource];
      return state
        .mergeIn(['data', `${action.resource}s`], fromJS(action.payload.data.entities[`${action.resource}s`]))
        .setIn([...statusPath, scope.loaded], true)
        .setIn([...statusPath, scope.error], false);
    }
    case actionTypes.ADD_SUCCESS: {
      const state1 = attendanceReducer(state.get('data'), action);
      const state2 = scheduleReducer(state1, action);
      const statusPath = ['status', action.resource];
      return state
        .setIn(['data'], state2)
        .mergeIn(['data', `${action.resource}s`], fromJS(action.payload.entities[`${action.resource}s`]))
        .setIn([...statusPath, scope.loaded], true)
        .setIn([...statusPath, scope.error], false);
    }
    case actionTypes.REMOVE_SUCCESS:
      return state.setIn(['data', `${action.resource}s`, String(action.payload)], undefined);

    case actionTypes.UPDATE_FAILURE:
    case actionTypes.FETCH_FAILURE:
    case actionTypes.DETAIL_FAILURE:
    case actionTypes.ADD_FAILURE:
    case actionTypes.REMOVE_FAILURE:
      return state
        .setIn(['status', action.resource, scope.error], fromJS(action.payload))
        .setIn(['status', action.resource, scope.loaded], true);
    default:
      return state;
  }
}
