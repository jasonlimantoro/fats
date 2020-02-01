import serviceRegistry from 'lib/services/builder';
import { tryCatch } from 'lib/utils';
import { actionTypes } from './attendance.constant';
import { deleteAttendanceFromSession } from '@/ui/sessionDetail/actions';

const service = serviceRegistry.services.attendance;

export const list = () => async dispatch => {
  dispatch({
    type: actionTypes.SET_BEGIN,
    scope: 'list',
  });
  await tryCatch(() => service.list(), {
    successFn(response) {
      dispatch({
        type: actionTypes.SET_SUCCESS,
        scope: 'list',
        payload: response.data,
      });
    },
    errorFn(err) {
      dispatch({
        type: actionTypes.SET_FAILURE,
        scope: 'list',
        payload: err,
      });
    },
  });
};

export const destroy = id => async dispatch => {
  dispatch({
    type: actionTypes.SET_BEGIN,
    scope: 'delete',
  });
  await tryCatch(() => service.destroy(id), {
    successFn(response) {
      dispatch({
        type: actionTypes.SET_SUCCESS,
        scope: 'delete',
        payload: response.data,
      });
      dispatch(deleteAttendanceFromSession(id));
    },
    errorFn(err) {
      dispatch({
        type: actionTypes.SET_FAILURE,
        scope: 'delete',
        payload: err,
      });
    },
  });
};
