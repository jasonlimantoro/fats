import { createSelector } from 'reselect';
import { isImmutable } from 'immutable';

const selectData = state => state.entities.get('data');
const selectResult = state => state.entities.get('result');

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
