import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';
import { generate } from 'lib/timetableGenerator';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

const selectSessionIds = state => state.ui.sessions.get('sessionIds');
const selectSessionIdsJS = createSelector(
  selectSessionIds,
  state => state.toJS(),
);

export const selectTimetable = createSelector(
  selectDataJS,
  state => {
    if (isEmpty(state.data.timetables) || isEmpty(state.data.schedules)) return [];
    const allTimetables = Object.values(state.data.timetables).reduce((accum, current) => {
      const generated = generate({
        ...current,
        semester: state.data.semesters[current.semester],
      });
      return {
        ...accum,
        [current.lab]: {
          ...current,
          lab: state.data.labs[current.lab],
          schedule: generated.map(({ time, week }) => {
            const lab = state.data.labs[current.lab];
            const existingSession = lab.schedule_set.some(existingScheduleId => {
              const schedule = state.data.schedules[existingScheduleId];
              if (!schedule) return false;
              const diff = moment(state.data.schedules[existingScheduleId].time).diff(moment(time), 'days');
              return diff >= 0 && diff <= 1;
            });
            return {
              week,
              label: time,
              past: existingSession,
            };
          }),
        },
      };
    }, {});
    const timeTableByCourse = Object.values(state.data.courses).map(c => {
      return {
        ...c,
        schedules: c.labs.reduce(
          (accum, current) => (allTimetables[current] ? [...accum, allTimetables[current]] : accum),
          [],
        ),
      };
    });
    return timeTableByCourse;
  },
);

export const selectRecentSessions = createSelector(
  selectDataJS,
  selectSessionIdsJS,
  (state, ids) => {
    return ids.map(id => {
      const schedule = state.data.schedules[id];
      return {
        ...schedule,
        lab: state.data.labs[schedule.lab],
      };
    });
  },
);
