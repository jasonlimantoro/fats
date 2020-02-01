import { detail, destroy } from '@/entities/actions';
import { schedule } from './schema';

export const feedData = id => async dispatch => {
  await dispatch(detail(id, { resource: 'schedule', schema: schedule }));
};

export const deleteAttendance = id => async dispatch => {
  await dispatch(destroy(id, { resource: 'attendance' }));
};
