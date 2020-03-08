import { createSelector } from 'reselect';
import { isImmutable } from 'immutable';
import { ScopedKey } from 'lib/utils';

const selectStatus = state => state.entities.get('status');
const selectData = (state, _props) => state.entities.get('data');
const selectResult = (state, _props) => state.entities.get('result');

export const selectDataJS = createSelector(
  selectData,
  selectResult,
  (data, result) => {
    return {
      data: data.toJS(),
      result: isImmutable(result) ? result.toJS() : result,
    };
  },
);
const selectStatusJS = createSelector(
  selectStatus,
  status => status.toJS(),
);

export const createSelectStatusJS = (resource, scope, type = 'error') =>
  createSelector(
    selectStatusJS,
    state => {
      const scopedKey = new ScopedKey(scope);
      return state[resource][scopedKey[type]];
    },
  );
