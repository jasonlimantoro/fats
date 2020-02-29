import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';
import isEmpty from 'lodash/isEmpty';
import { calculateLabIndexCompleteSchedule } from 'lib/utils';

const selectSessionIds = state => state.ui.sessions.get('sessionIds');
const selectSessionIdsJS = createSelector(
  selectSessionIds,
  state => state.toJS(),
);

export const selectTimetable = createSelector(
  selectDataJS,
  state => {
    if (isEmpty(state.data.timetables) || isEmpty(state.data.schedules)) return [];
    const completeSchedules = calculateLabIndexCompleteSchedule({
      timetables: state.data.timetables,
      semesters: state.data.semesters,
      labs: state.data.labs,
      schedules: state.data.schedules,
    });
    const allTimetables = Object.values(state.data.timetables).reduce((accum, current) => {
      return {
        ...accum,
        [current.lab]: {
          ...current,
          lab: state.data.labs[current.lab],
          completeSchedule: completeSchedules[current.lab].completeSchedule,
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
