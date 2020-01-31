import { createSelector } from 'reselect';
import { ScopedKey } from 'lib/utils';

const listScope = new ScopedKey('list');

export const selectSchedule = createSelector(
  state => state.schedule.get(listScope.response),
  state => state.toJS(),
);

const detailScope = new ScopedKey('detail');

export const selectDetailSchedule = createSelector(
  state => state.schedule.get(detailScope.response),
  state => state.toJS(),
);
