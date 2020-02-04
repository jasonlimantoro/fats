import { tryCatch, noop } from 'lib/utils';
import serviceRegistry from 'lib/services/builder';
import { normalize } from 'normalizr';
import { actionTypes } from './constant';

export const fetch = ({ resource, shouldNormalize = true, schema } = {}, cb = noop) => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_BEGIN,
    resource,
    scope: 'list',
  });
  const service = serviceRegistry.services[resource];
  await tryCatch(() => service.list(), {
    successFn(resp) {
      let processedData = resp.data;
      if (shouldNormalize) {
        processedData = normalize(processedData, schema);
      }
      dispatch({ type: actionTypes.FETCH_SUCCESS, resource, payload: processedData, scope: 'list' });
      cb(processedData);
    },
    errorFn(err) {
      dispatch({ type: actionTypes.FETCH_FAILURE, resource, payload: err, scope: 'list' });
      cb(err);
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
      dispatch({ type: actionTypes.FETCH_SUCCESS, resource, scope: 'detail', payload: processedData });
    },
    errorFn(err) {
      dispatch({ type: actionTypes.FETCH_FAILURE, resource, scope: 'detail', payload: err });
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

export const update = (id, body, { resource, shouldNormalize = true, schema } = {}) => async dispatch => {
  dispatch({
    type: actionTypes.UPDATE_BEGIN,
    payload: { id, body },
    scope: 'update',
    resource,
  });
  const service = serviceRegistry.services[resource];
  await tryCatch(() => service.update(id, body), {
    successFn(resp) {
      let processedData = resp.data;
      if (shouldNormalize) {
        processedData = normalize(processedData, schema);
      }
      dispatch({
        type: actionTypes.UPDATE_SUCCESS,
        payload: { id, data: processedData },
        scope: 'update',
        resource,
      });
    },
    errorFn(err) {
      dispatch({ type: actionTypes.UPDATE_FAILURE, payload: err, scope: 'update', resource });
    },
  });
};
