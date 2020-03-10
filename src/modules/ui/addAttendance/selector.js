import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';
import isEmpty from 'lodash/isEmpty';

export const selectInitialFormData = createSelector(
  selectDataJS,
  (_, props) => props,
  ({ data }, { sessionId, studentId }) => {
    if (isEmpty(data.schedules)) return { lab: '', student: '' };
    const schedule = data.schedules[sessionId];
    const lab = data.labs[schedule.lab];
    const student = data.students[studentId] || {};
    return {
      lab: lab.index,
      student,
    };
  },
);
