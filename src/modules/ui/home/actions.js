import { fetch } from '@/entities/actions';
import { createTimetable } from 'lib/schema';

export const feedData = () => async dispatch => {
  dispatch(fetch({ resource: 'timetable', schema: [createTimetable()] }));
};
