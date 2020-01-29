import { include } from 'named-urls';

export const routes = {
  home: '/',
  login: '/login',
  panel: include('/panel', {
    student: include('student', {
      overview: 'overview',
    }),
    admin: include('admin', {
      overview: 'overview',
    }),
  }),
};

export const apiRoutes = include('/api', {
  auth: include('auth', {
    login: 'login',
  }),
});
