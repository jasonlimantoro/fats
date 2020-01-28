import { include } from 'named-urls';

export const routes = {
  home: '/',
  login: '/login',
  panel: '/panel/:domain',
};

export const apiRoutes = include('/api', {
  auth: include('auth', {
    login: 'login',
  }),
});
