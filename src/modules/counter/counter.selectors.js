import { createSelector } from 'reselect';
import { keys } from './counter.reducer';

const reducerName = 'counter';
const selectCount = state => state[reducerName].get(keys.COUNT);

export const selectCountJS = createSelector(
  selectCount,
  count => count,
);
