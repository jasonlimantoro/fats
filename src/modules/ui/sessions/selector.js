import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';
import { generate } from 'lib/timetableGenerator';
import moment from 'moment';

import isEmpty from 'lodash/isEmpty';

export const selectTimetable = createSelector(
  selectDataJS,
  state => {
    if (isEmpty(state.data.timetables) || isEmpty(state.data.schedules)) return [];
    const allTimetables = Object.values(state.data.timetables).reduce((accum, current) => {
      const generated = generate({
        ...current,
        semester: {
          ...state.data.semesters[current.semester],
        },
      });
      return {
        ...accum,
        [current.lab]: {
          ...current,
          lab: {
            ...state.data.labs[current.lab],
          },
          schedule: generated.map(({ time, week }) => {
            const lab = state.data.labs[current.lab];
            const existingSession = lab.schedule_set.some(existingScheduleId => {
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
  state => {
    if (isEmpty(state.data.schedules)) return [];
    return Object.values(state.data.schedules).map(s => ({
      ...s,
      lab: state.data.labs[s.lab],
    }));
  },
);
