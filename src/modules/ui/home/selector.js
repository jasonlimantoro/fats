import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';
import merge from 'lodash/merge';
import { calculateLabIndexCompleteSchedule } from 'lib/utils';

export const selectFormData = createSelector(
  selectDataJS,
  ({ data }) => {
    const labIndexCompleteSchedule = calculateLabIndexCompleteSchedule({
      timetables: data.timetables,
      semesters: data.semesters,
      schedules: data.schedules,
      labs: data.labs,
    });
    return {
      semesters: data.semesters,
      timetables: data.timetables,
      labs: merge(data.labs, labIndexCompleteSchedule),
    };
  },
);
