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
      sessions: include('sessions/', {
        detail: include(':sessionId', {
          attendance: include('attendances/', {
            edit: ':attendanceId',
            add: include('add/', {
              student: ':studentId',
            }),
          }),
        }),
      }),
      overview: 'overview',
    }),
  }),
};

export const apiRoutes = {
  auth: include('auth', {
    login: 'login',
  }),
};
