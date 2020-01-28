import { fromJS } from 'immutable';
import { tryCatch } from 'lib/utils';
import MockUtilService from 'lib/services/mock';
import { routes } from 'config/routes';
import { reverse } from 'named-urls';
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
        payload: fromJS(response),
      });
      history.push(reverse(routes.panel, { domain: body.domain }));
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
