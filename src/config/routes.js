import { include } from 'named-urls';

export const routes = {
  home: '/',
  login: '/login',
  camera: '/camera',
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
      register: 'register',
      overview: 'overview',
    }),
  }),
};

export const apiRoutes = {
  auth: include('auth', {
    login: 'login',
  }),
};
