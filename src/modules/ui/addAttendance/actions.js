import { detail, create } from '@/entities/actions';
import { schedule, attendance } from './schema';

export const feedData = id => async dispatch => {
  await dispatch(detail(id, { resource: 'schedule', schema: schedule }));
};

export const submit = body => async dispatch => {
  await dispatch(create(body, { resource: 'attendance', schema: attendance }));
};
