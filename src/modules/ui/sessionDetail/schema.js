import { createStudent, createLab, createAttendance, createSchedule } from 'lib/schema';

const studentProcessStrategy = (value, parent, key) => {
  // from attendance record
  if (key === 'student') {
    return {
      ...value,
      attendanceId: parent.id,
    };
  }
  return value;
};
const student = createStudent({}, { processStrategy: studentProcessStrategy });
const lab = createLab({ students: [student] });
const attendance = createAttendance({ student });
export const schedule = createSchedule({ lab, attendances: [attendance] });
