import { createSelector } from 'reselect';
import { executeIf } from 'lib/utils';
import moment from 'moment';

const selectSessionDetail = createSelector(
  state => state.ui.sessionDetail.get('fetchResponse'),
  state => state.toJS(),
);

export const selectSessionDetailUI = createSelector(
  selectSessionDetail,
  data => {
    return {
      course: data.lab?.course,
      index: data.lab?.index,
      group: data.lab?.name,
      time: moment(data.time).format('YYYY-MM-DD HH:mm'),
    };
  },
);

export const selectStudentList = createSelector(
  selectSessionDetail,
  data => {
    if (!data || !data.attendances) return [];
    const allStudents = data.lab.students;
    const { attendances } = data;
    const LATE_LIMIT = 15;

    return allStudents.reduce((accum, current) => {
      const idx = attendances.findIndex(a => a.student.user_id === current.user_id);
      const finalData = {
        email: current.email,
        matric: current.user_id,
      };
      executeIf(idx !== -1, () => {
        finalData.status = 'absent';
        finalData.time = '-';
      })(() => {
        const isLate = moment(attendances[idx].created_at).diff(moment(data.time), 'minutes') > LATE_LIMIT;
        finalData.status = isLate ? 'late' : 'present';
        finalData.time = moment(attendances[idx].created_at).format('HH:mm');
        finalData.attendanceId = attendances[idx].id;
      });

      return [...accum, finalData];
    }, []);
  },
);
