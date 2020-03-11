import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';
import { orderByProperty } from 'lib/utils';

const orderByFirstWeek = orderByProperty('first_week', 'descending');

export const selectCurrentSemester = createSelector(
  selectDataJS,
  ({ data }) => {
    const { semesters } = data;
    const sorted = Object.values(semesters).sort(orderByFirstWeek);
    return sorted[0] || {};
  },
);
