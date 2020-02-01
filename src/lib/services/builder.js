import AuthService from '@/auth/auth.service';
import AttendanceService from '@/attendance/attendance.service';
import ScheduleService from '@/schedule/schedule.service';
import LabService from '@/lab/lab.service';
import CourseService from '@/course/course.service';
import StudentService from '@/student/student.service';

export const builder = config => {
  const services = {
    auth: new AuthService(config),
    attendance: new AttendanceService(config),
    schedule: new ScheduleService(config),
    lab: new LabService(config),
    course: new CourseService(config),
    student: new StudentService(config),
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
