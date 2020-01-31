import { tryCatch } from 'lib/utils';
import serviceRegistry from 'lib/services/builder';
import { actionTypes } from './schedule.constant';

const service = serviceRegistry.services.schedule;
export const list = () => async dispatch => {
  dispatch({
    type: actionTypes.SET_BEGIN,
    scope: 'list',
  });
  await tryCatch(() => service.list(), {
    successFn(response) {
      dispatch({
        type: actionTypes.SET_SUCCESS,
        payload: response.data,
        scope: 'list',
      });
    },
    errorFn(err) {
      dispatch({
        type: actionTypes.SET_FAILURE,
        payload: err,
        scope: 'list',
      });
    },
  });
};

export const detail = id => async dispatch => {
  dispatch({
    type: actionTypes.SET_BEGIN,
    scope: 'detail',
  });
  await tryCatch(() => service.detail(id), {
    successFn(response) {
      dispatch({
        type: actionTypes.SET_SUCCESS,
        scope: 'detail',
        payload: response.data,
      });
    },
    errorFn(err) {
      dispatch({
        type: actionTypes.SET_FAILURE,
        scope: 'detail',
        payload: err,
      });
    },
  });
};
