import { schema } from 'normalizr';

const student = new schema.Entity('students', {}, { idAttribute: 'user_id' });
const lab = new schema.Entity('labs', { students: [student] }, { idAttribute: 'index' });

export const schedule = new schema.Entity('schedules', {
  lab,
});

export const attendance = new schema.Entity('attendances');
