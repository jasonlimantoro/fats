import { fetch, create, destroy } from '@/entities/actions';
import { actionTypes } from './constant';
import { timetable, course, schedule } from './schema';
import { batch } from 'react-redux';

export const feedData = () => async dispatch => {
  batch(() => {
    dispatch(fetch({ resource: 'timetable', schema: [timetable] }));
    dispatch(fetch({ resource: 'course', schema: [course] }));
    dispatch(
      fetch({ resource: 'schedule', schema: [schedule] }, data => {
        dispatch({
          type: actionTypes.FEED_DATA,
          payload: {
            sessionIds: data.result,
          },
        });
      }),
    );
  });
};

export const addSession = body => async dispatch => {
  dispatch(
    create(body, { resource: 'schedule', schema: schedule }, data => {
      dispatch({ type: actionTypes.ADD_DATA, entity: 'session', payload: data.result });
    }),
  );
};

export const deleteSession = id => async dispatch => {
  dispatch({
    type: actionTypes.REMOVE_DATA,
    entity: 'session',
    payload: id,
  });
  dispatch(destroy(id, { resource: 'schedule' }));
};
