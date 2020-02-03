import { fetch } from '@/entities/actions';
import { timetable, course, schedule } from './schema';
import { batch } from 'react-redux';

export const feedData = () => async dispatch => {
  batch(() => {
    dispatch(fetch({ resource: 'timetable', schema: [timetable] }));
    dispatch(fetch({ resource: 'course', schema: [course] }));
    dispatch(fetch({ resource: 'schedule', schema: [schedule] }));
  });
};
