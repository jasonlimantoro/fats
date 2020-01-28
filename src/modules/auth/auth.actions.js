import { tryCatch } from 'lib/utils';
import MockUtilService from 'lib/services/mock';
import { routes } from 'config/routes';
import AuthService from './auth.service';
import { actionTypes } from './auth.constants';

const service = new AuthService({
  baseUrl: '/api/auth',
  RequestUtil: MockUtilService,
});

export const login = (body, history) => async dispatch => {
  dispatch({ type: actionTypes.LOGIN_BEGIN, payload: body });
  await tryCatch(() => service.login(body), {
    successFn(response) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          ...response,
          domain: body.domain,
        },
      });
      history.push(routes.panel[body.domain]);
    },
    errorFn(err) {
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        payload: err,
      });
    },
  });
};

export const logout = history => async dispatch => {
  dispatch({ type: actionTypes.LOGOUT });
  history.push(routes.login);
};
