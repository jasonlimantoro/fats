import { tryCatch } from 'lib/utils';
import { routes } from 'config/routes';
import AuthService from './auth.service';
import { actionTypes } from './auth.constants';

const service = new AuthService({
  baseUrl: '/api/auth',
});

export const login = (body, history) => async dispatch => {
  dispatch({ type: actionTypes.LOGIN_BEGIN, payload: body });
  await tryCatch(() => service.login(body), {
    successFn(response) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          ...response.data,
          domain: body.domain,
          username: body.username,
        },
      });
      history.push(routes.panel[body.domain].overview);
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
