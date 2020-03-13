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
    const LATE_LIMIT = 15;
    const presentStudents = schedule.attendances.reduce((accum, current) => {
      const attendance = state.data.attendances[current];
      if (!attendance) {
        return { ...accum };
      }
      const { student } = attendance;
      return {
        ...accum,
        [student]: { ...state.data.attendances[current] },
      };
    }, {});
    return registeredStudents.map(current => {
      const student = state.data.students[current];
      const relatedAttendance = presentStudents[current];
      if (relatedAttendance) {
        const isLate =
          moment(relatedAttendance.created_at).diff(moment(schedule.time), 'minutes') > LATE_LIMIT;
        return {
          ...student,
          matric: student.user_id,
          status: isLate ? 'late' : 'present',
          time: moment(relatedAttendance.created_at).format(DATETIME_FORMAT.DATETIME),
          relatedAttendanceId: relatedAttendance.id,
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
