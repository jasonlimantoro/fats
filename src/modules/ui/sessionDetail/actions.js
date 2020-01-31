import serviceRegistry from 'lib/services/builder';
import { tryCatch } from 'lib/utils';
import { actionTypes } from './constant';

export const fetch = id => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_SESSION_DETAIL_BEGIN,
  });
  await tryCatch(() => serviceRegistry.services.schedule.detail(id), {
    successFn(resp) {
      dispatch({
        type: actionTypes.FETCH_SESSION_DETAIL_SUCCESS,
        payload: resp.data,
      });
    },
    errorFn(err) {
      dispatch({
        type: actionTypes.FETCH_SESSION_DETAIL_FAILURE,
        payload: err,
      });
    },
  });
};
