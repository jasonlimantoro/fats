import AuthService from '@/auth/service';
import AttendanceService from '@/attendance/service';
import ScheduleService from '@/schedule/service';
import LabService from '@/lab/service';
import CourseService from '@/course/service';
import StudentService from '@/student/service';
import TimetableService from '@/timetable/service';

export const builder = config => {
  const services = {
    auth: new AuthService(config),
    attendance: new AttendanceService(config),
    schedule: new ScheduleService(config),
    lab: new LabService(config),
    course: new CourseService(config),
    student: new StudentService(config),
    timetable: new TimetableService(config),
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

const isProd = process.env.NODE_ENV === 'production';
const isRemote = process.env.REMOTE === 'true';

let backendUrl = '';
if (isProd || isRemote) {
  backendUrl = process.env.BACKEND_URL;
}

const serviceRegistry = builder({ baseUrl: `${backendUrl}/api` });

export default serviceRegistry;
