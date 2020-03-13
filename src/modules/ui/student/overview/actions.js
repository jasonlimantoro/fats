import { fetch } from '@/entities/actions';
import { createAttendance, createLab, createSchedule } from 'lib/schema';
import { selectUser } from '@/auth/auth.selector';

export const feedData = () => async (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);
  dispatch(fetch({ resource: 'schedule', schema: [createSchedule()] }));
  dispatch(
    fetch({
      resource: 'lab',
      schema: [createLab()],
    }),
  );
  dispatch(
    fetch({
      resource: 'attendance',
      schema: [createAttendance()],
      requestConfig: {
        queryParams: {
          user_id: user.user_id,
        },
      },
    }),
  );
};
