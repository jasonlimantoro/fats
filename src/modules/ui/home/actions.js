import { fetch } from '@/entities/actions';
import { createTimetable, createSchedule } from 'lib/schema';

export const feedData = () => async dispatch => {
  dispatch(fetch({ resource: 'timetable', schema: [createTimetable()] }));
  dispatch(fetch({ resource: 'schedule', schema: [createSchedule()] }));
};
