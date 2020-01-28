import { include } from 'named-urls';

export const routes = {
  home: '/',
  login: '/login',
};

export const apiRoutes = include('/api', {
  auth: include('auth', {
    login: 'login',
  }),
});
