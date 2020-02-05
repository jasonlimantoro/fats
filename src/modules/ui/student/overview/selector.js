import { createSelector } from 'reselect';
import moment from 'moment';
import { DATETIME_FORMAT } from 'config/format';
import { selectDataJS } from '@/entities/selectors';
import { selectUser } from '@/auth/auth.selector';
import isEmpty from 'lodash/isEmpty';

export const selectAttendances = createSelector(
  selectDataJS,
  selectUser,
  (state, user) => {
    if (isEmpty(state.data.students) || isEmpty(state.data.labs)) return [];
    const userData = state.data.students[user.user_id];
    return userData.attendance_set.map(id => {
      const attendance = state.data.attendances[id];
      return {
        ...attendance,
        created_at: moment(attendance.created_at).format(DATETIME_FORMAT.DATETIME),
        lab: state.data.labs[attendance.lab],
      };
    });
  },
);

const RECENT_ATTENDANCE_DISPLAY = 5;
export const selectRecentAttendances = createSelector(
  selectAttendances,
  state => state.slice(0, RECENT_ATTENDANCE_DISPLAY),
);

export const selectTotalAttendancesCount = createSelector(
  selectAttendances,
  state => state.length,
);

export const selectMissedAttendancesCount = createSelector(
  selectAttendances,
  state => state.length,
);
