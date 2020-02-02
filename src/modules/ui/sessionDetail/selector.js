import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

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
      time: moment(schedule.time).format('YYYY-MM-DD HH:mm'),
    };
  },
);

export const selectStudentList = createSelector(
  selectDataJS,
  (_, props) => props,
  (state, sessionId) => {
    if (isEmpty(state.data.schedules)) return [];
    const schedule = state.data.schedules[sessionId];
    const allStudents = state.data.students;
    const { attendances } = state.data;
    const LATE_LIMIT = 15;
    return Object.values(allStudents).reduce((accum, current) => {
      if (current.attendanceId && attendances[current.attendanceId]) {
        const attendance = attendances[current.attendanceId];
        const isLate = moment(attendance.created_at).diff(moment(schedule.time), 'minutes') > LATE_LIMIT;
        return [
          ...accum,
          {
            ...current,
            matric: current.user_id,
            status: isLate ? 'late' : 'present',
            time: moment(attendance.created_at).format('HH:mm'),
          },
        ];
      }
      return [
        ...accum,
        {
          ...current,
          matric: current.user_id,
          status: 'absent',
          time: '-',
        },
      ];
    }, []);
  },
);
