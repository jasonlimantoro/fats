import { createSelector } from 'reselect';

export const selectLoginStatus = createSelector(
  state => state.auth.operation.get('loginError'),
  state => state.auth.operation.get('loginLoading'),
  (error, loading) => ({
    error: error.toJS(),
    loading,
  }),
);

export const selectIsLoggedIn = createSelector(
  state => state.auth.credential.get('isLoggedIn'),
  state => state,
);

export const selectUser = createSelector(
  state => state.auth.credential.get('user'),
  state => state.toJS(),
);
