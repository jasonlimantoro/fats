import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { DATETIME_FORMAT } from 'config/format';

export const selectSessionDetailUI = createSelector(
  selectDataJS,
  (_, props) => props,
  (state, sessionId) => {
    if (isEmpty(state.data.schedules)) return {};
    const schedule = state.data.schedules[sessionId];
    if (!schedule) return {};
    const lab = state.data.labs[schedule.lab];
    return {
      course: lab?.course,
      index: lab?.index,
      group: lab?.name,
      time: moment(schedule.time).format(DATETIME_FORMAT.DATETIME),
    };
  },
);

export const selectStudentList = createSelector(
  selectDataJS,
  (_, props) => props,
  (state, sessionId) => {
    if (isEmpty(state.data.schedules)) return [];
    const schedule = state.data.schedules[sessionId];
    const registeredStudents = state.data.labs[schedule.lab].students;
    const { attendances } = state.data;
    const LATE_LIMIT = 15;
    return registeredStudents.map(current => {
      const student = state.data.students[current];
      if (student.attendanceId && attendances[student.attendanceId]) {
        const attendance = attendances[student.attendanceId];
        const isLate = moment(attendance.created_at).diff(moment(schedule.time), 'minutes') > LATE_LIMIT;
        return {
          ...student,
          matric: student.user_id,
          status: isLate ? 'late' : 'present',
          time: moment(attendance.created_at).format(DATETIME_FORMAT.DATETIME),
        };
      }
      return {
        ...student,
        matric: student.user_id,
        status: 'absent',
        time: '-',
      };
    }, []);
  },
);
