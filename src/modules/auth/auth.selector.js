import { createSelector } from 'reselect';

export const selectLoginStatus = createSelector(
  state => state.auth.get('loginResponse'),
  state => state.auth.get('loginError'),
  state => state.auth.get('loginLoading'),
  (response, error, loading) => ({
    response: response.toJS(),
    error: error.toJS(),
    loading,
  }),
);
