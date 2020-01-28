import { include } from 'named-urls';

export const routes = {
  home: '/',
  login: '/login',
  panel: include('/panel', {
    student: 'student',
    admin: 'admin',
  }),
};

export const apiRoutes = include('/api', {
  auth: include('auth', {
    login: 'login',
  }),
});
