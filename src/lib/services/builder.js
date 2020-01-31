import AuthService from '@/auth/auth.service';
import AttendanceService from '@/attendance/attendance.service';
import ScheduleService from '@/schedule/schedule.service';
import LabService from '@/lab/lab.service';

export const builder = config => {
  const services = {
    auth: new AuthService(config),
    attendance: new AttendanceService(config),
    schedule: new ScheduleService(config),
    lab: new LabService(config),
  };
  return {
    services,
    replaceUtil(config) {
      Object.keys(services).forEach(key => {
        services[key].replaceRequestUtil(config);
      });
    },
  };
};

const serviceRegistry = builder({ baseUrl: '/api' });

export default serviceRegistry;
