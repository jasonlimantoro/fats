import { create } from '@/entities/actions';
import { createAttendance } from 'lib/schema';
import { actionTypes } from './constant';

export const take = body => async dispatch => {
  await dispatch(create(body, { resource: 'attendance', schema: createAttendance() }));
};

export const setSession = session => ({
  type: actionTypes.SET_SESSION,
  payload: session,
});
