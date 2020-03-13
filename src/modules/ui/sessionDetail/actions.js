import { detail, destroy } from '@/entities/actions';
import { createSchedule } from 'lib/schema';

export const feedData = id => async dispatch => {
  await dispatch(detail(id, { resource: 'schedule', schema: createSchedule() }));
};

export const deleteAttendance = id => async dispatch => {
  await dispatch(destroy(id, { resource: 'attendance' }));
};
