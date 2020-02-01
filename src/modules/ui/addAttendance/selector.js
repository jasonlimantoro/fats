import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';

export const selectInitialFormData = createSelector(
  selectDataJS,
  state => {
    if (!state.data || !state.result) return {};
    const schedule = state.data.schedules[state.result];
    const lab = state.data.labs[schedule.lab];
    const studentIds = lab.students;
    const students = studentIds.map(id => {
      return state.data.students[id];
    });
    return {
      lab: lab.index,
      students,
      schedule: state.result,
    };
  },
);
