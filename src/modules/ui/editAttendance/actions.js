import { detail, update } from '@/entities/actions';
import { createAttendance } from 'lib/schema';
import { reverse } from 'named-urls';
import { routes } from 'config/routes';

export const feedData = id => async dispatch => {
  dispatch(detail(id, { resource: 'attendance', schema: createAttendance() }));
};

export const submit = (id, body, { history, sessionId }) => async dispatch => {
  await dispatch(update(id, body, { resource: 'attendance', schema: createAttendance() }));
  history.push(reverse(String(routes.panel.admin.sessions.detail), { sessionId }));
};
