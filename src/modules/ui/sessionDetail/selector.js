import { createSelector } from 'reselect';

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
      time: data.time,
    };
  },
);

export const selectStudentList = createSelector(
  selectSessionDetail,
  data => {
    if (!data || !data.attendances) return [];
    return data.attendances.map(({ student }) => ({
      matric: student.user_id,
      email: student.email,
    }));
  },
);
