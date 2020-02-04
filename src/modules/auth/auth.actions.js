import { tryCatch } from 'lib/utils';
import { routes } from 'config/routes';
import serviceRegistry from 'lib/services/builder';
import { actionTypes } from './auth.constants';

const service = serviceRegistry.services.auth;

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
      history.push(String(routes.panel[body.domain]));
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
