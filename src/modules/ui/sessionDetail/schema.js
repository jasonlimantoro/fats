import { schema } from 'normalizr';

const student = new schema.Entity(
  'students',
  {},
  {
    idAttribute: 'user_id',
    processStrategy(value, parent, key) {
      // from attendance record
      if (key === 'student') {
        return {
          ...value,
          attendanceId: parent.id,
        };
      }
      return value;
    },
  },
);
const lab = new schema.Entity('labs', { students: [student] }, { idAttribute: 'index' });
const attendance = new schema.Entity('attendances', { student });

export const schedule = new schema.Entity('schedules', { lab, attendances: [attendance] });
