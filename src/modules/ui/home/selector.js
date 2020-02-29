import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';

export const selectFormData = createSelector(
  selectDataJS,
  ({ data }) => {
    return {
      semesters: data.semesters,
      timetables: data.timetables,
      labs: data.labs,
    };
  },
);
