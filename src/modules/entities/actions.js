import { tryCatch } from 'lib/utils';
import serviceRegistry from 'lib/services/builder';
import { normalize } from 'normalizr';
import { actionTypes } from './constant';

export const fetch = ({ resource, shouldNormalize = true, schema } = {}) => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_BEGIN,
    resource,
    scope: 'detail',
  });
  const service = serviceRegistry.services[resource];
  await tryCatch(() => service.list(), {
    successFn(resp) {
      let processedData = resp.data;
      if (shouldNormalize) {
        processedData = normalize(processedData, schema);
      }
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: processedData });
    },
    errorFn(err) {
      dispatch({ type: actionTypes.FETCH_FAILURE, payload: err });
    },
  });
};

export const detail = (id, { resource, shouldNormalize = true, schema } = {}) => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_BEGIN,
    resource,
    scope: 'detail',
  });
  const service = serviceRegistry.services[resource];
  await tryCatch(() => service.detail(id), {
    successFn(resp) {
      let processedData = resp.data;
      if (shouldNormalize) {
        processedData = normalize(processedData, schema);
      }
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: processedData });
    },
    errorFn(err) {
      dispatch({ type: actionTypes.FETCH_FAILURE, payload: err });
    },
  });
};

export const create = (body, { resource, shouldNormalize = true, schema } = {}) => async dispatch => {
  dispatch({
    type: actionTypes.ADD_BEGIN,
    payload: body,
    scope: 'create',
    resource,
  });
  const service = serviceRegistry.services[resource];
  await tryCatch(() => service.create(body), {
    successFn(resp) {
      let processedData = resp.data;
      if (shouldNormalize) {
        processedData = normalize(processedData, schema);
      }
      dispatch({ type: actionTypes.ADD_SUCCESS, payload: processedData, scope: 'create', resource });
    },
    errorFn(err) {
      dispatch({ type: actionTypes.ADD_FAILURE, payload: err, scope: 'create', resource });
    },
  });
};

export const destroy = (id, { resource } = {}) => async dispatch => {
  dispatch({
    type: actionTypes.REMOVE_BEGIN,
    payload: id,
    scope: 'delete',
    resource,
  });
  const service = serviceRegistry.services[resource];
  await tryCatch(() => service.destroy(id), {
    successFn() {
      dispatch({ type: actionTypes.REMOVE_SUCCESS, payload: id, scope: 'delete', resource });
    },
    errorFn(err) {
      dispatch({ type: actionTypes.REMOVE_FAILURE, payload: err, scope: 'delete', resource });
    },
  });
};
