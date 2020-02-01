import { schema } from 'normalizr';

export const student = new schema.Entity('students', {}, { idAttribute: 'user_id' });
export const lab = new schema.Entity('labs', { students: [student] }, { idAttribute: 'index' });

export const course = new schema.Entity('courses', { labs: [lab] });
