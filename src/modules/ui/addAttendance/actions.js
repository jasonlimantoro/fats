import { create } from '@/entities/actions';
import { attendance } from './schema';
import { routes } from 'config/routes';
import { reverse } from 'named-urls';

export const submit = (body, { history, sessionId }) => async dispatch => {
  await dispatch(create(body, { resource: 'attendance', schema: attendance }));
  history.push(reverse(String(routes.panel.admin.sessions.detail), { sessionId }));
};
