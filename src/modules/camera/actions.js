import serviceRegistry from 'lib/services/builder';
import { tryCatch } from 'lib/utils';
import { actionTypes } from './constant';

const service = serviceRegistry.services.camera;

export const detect = file => async dispatch => {
  const formData = new FormData();
  formData.append('image', file);
  dispatch({
    type: actionTypes.DETECT_BEGIN,
  });
  await tryCatch(() => service.detect(formData), {
    successFn(response) {
      dispatch({
        type: actionTypes.DETECT_SUCCESS,
        payload: response.data,
      });
    },
    errorFn(error) {
      dispatch({
        type: actionTypes.DETECT_FAILURE,
        payload: error,
      });
    },
  });
};
