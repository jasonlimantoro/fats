import { selectDataJS } from '@/entities/selectors';
import { createSelector } from 'reselect';

export const selectDataSets = createSelector(
  selectDataJS,
  ({ data: { courses, labs, students } }) => {
    return {
      courses,
      labs,
      students,
    };
  },
);
