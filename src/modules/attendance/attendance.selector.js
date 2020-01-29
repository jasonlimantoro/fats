import { createSelector } from 'reselect';
import { ScopedKey } from 'lib/utils';

const listScope = new ScopedKey('list');
export const selectAttendances = createSelector(
  state => state.attendance.get(listScope.response),
  state => state.toJS(),
);
