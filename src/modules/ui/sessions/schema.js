import { schema } from 'normalizr';

const semester = new schema.Entity('semesters');
const student = new schema.Entity('students', {}, { idAttribute: 'user_id' });
const lab = new schema.Entity(
  'labs',
  { students: [student] },
  {
    idAttribute: 'index',
  },
);

export const schedule = new schema.Entity('schedules', { lab });
export const course = new schema.Entity('courses', { labs: [lab] });
export const timetable = new schema.Entity('timetables', { semester, lab });
