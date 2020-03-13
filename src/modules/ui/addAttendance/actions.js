import { create } from '@/entities/actions';
import { routes } from 'config/routes';
import { reverse } from 'named-urls';
import { createAttendance } from 'lib/schema';

export const submit = (body, { history, sessionId }) => async dispatch => {
  await dispatch(create(body, { resource: 'attendance', schema: createAttendance() }));
  history.push(reverse(String(routes.panel.admin.sessions.detail), { sessionId }));
};
