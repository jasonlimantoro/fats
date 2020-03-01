import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';

const selectActiveSession = state => state.ui.camera.get('activeSession');

export const selectActiveSessionJS = createSelector(
  selectActiveSession,
  state => state.toJS(),
);

export const selectAttendancePayload = createSelector(
  selectDataJS,
  selectActiveSessionJS,
  ({ data }, activeSession) => {
    return {
      lab: data.timetables[activeSession.timetable].lab,
      schedule: activeSession.schedule,
      created_at: data.schedules[activeSession.schedule].time,
    };
  },
);
