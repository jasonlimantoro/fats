import { schema } from 'normalizr';

export const createSemester = (definition = {}, options = {}) =>
  new schema.Entity('semesters', definition, options);

export const createStudent = (definition = {}, options = {}) =>
  new schema.Entity('students', definition, { idAttribute: 'user_id', ...options });

export const createLab = (definition = {}, options = {}) =>
  new schema.Entity(
    'labs',
    { students: [createStudent()], ...definition },
    {
      idAttribute: 'index',
      ...options,
    },
  );

export const createCourse = (definition = {}, options = {}) =>
  new schema.Entity('courses', { labs: [createLab()], ...definition }, options);

export const createTimetable = (definition = {}, options = {}) =>
  new schema.Entity('timetables', { semester: createSemester(), lab: createLab(), ...definition }, options);

export const createAttendance = (definition = {}, options = {}) =>
  new schema.Entity('attendances', { student: createStudent(), ...definition }, options);

export const createSchedule = (definition = {}, options = {}) =>
  new schema.Entity(
    'schedules',
    { lab: createLab(), attendances: [createAttendance()], ...definition },
    options,
  );
