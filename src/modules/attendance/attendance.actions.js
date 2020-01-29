import serviceRegistry from 'lib/services/builder';
import { tryCatch } from 'lib/utils';
import { actionTypes } from './attendance.constant';

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
