import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';

export const selectInitialFormData = createSelector(
  selectDataJS,
  (_state, props) => props,
  ({ data }, { attendanceId }) => {
    const attendance = data.attendances[attendanceId];
    if (!attendance)
      return {
        lab: '',
        student: {
          user_id: '',
        },
        created_at: '',
      };
    const student = data.students[attendance.student];
    return { ...attendance, student };
  },
);
