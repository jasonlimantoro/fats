import AuthService from '@/auth/auth.service';
import { fromJS } from 'immutable';
import { actionTypes } from './auth.constants';
import { tryCatch } from 'lib/utils';

const service = new AuthService({ baseUrl: '/api/auth' });

export const login = body => async dispatch => {
  dispatch({ type: actionTypes.LOGIN_BEGIN, payload: body });
  await tryCatch(() => service.login(body), {
    successFn(response) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: fromJS(response),
      });
    },
    errorFn(err) {
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        payload: fromJS(err),
      });
    },
  });
};

export const logout = () => {};
