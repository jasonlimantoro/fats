import { include } from 'named-urls';

export const routes = {
  home: '/',
  login: '/login',
  panel: include('/panel/', {
    student: include('student/', {
      overview: 'overview',
      attendances: 'attendances',
    }),
    admin: include('admin/', {
      sessions: 'sessions',
      overview: 'overview',
    }),
  }),
};

export const apiRoutes = {
  auth: include('auth', {
    login: 'login',
  }),
};
