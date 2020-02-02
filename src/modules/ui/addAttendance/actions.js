import { create } from '@/entities/actions';
import { attendance } from './schema';

export const submit = body => async dispatch => {
  await dispatch(create(body, { resource: 'attendance', schema: attendance }));
};
