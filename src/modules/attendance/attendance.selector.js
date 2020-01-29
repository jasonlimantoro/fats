import { createSelector } from 'reselect';
import { ScopedKey } from 'lib/utils';

const listScope = new ScopedKey('list');
export const selectAttendances = createSelector(
  state => state.attendance.get(listScope.response),
  state => state.toJS(),
);

export const createSelectFirstNAttendances = n =>
  createSelector(
    selectAttendances,
    state => state.slice(0, n),
  );
