import { createSelector } from 'reselect';
import { selectDataJS, createSelectStatusJS } from '@/entities/selectors';

const selectActiveSession = state => state.ui.camera.get('activeSession');

export const selectActiveSessionJS = createSelector(
  selectActiveSession,
  state => state.toJS(),
);

export const selectActiveSessionDetailJS = createSelector(
  selectDataJS,
  selectActiveSessionJS,
  ({ data }, activeSession) => {
    const timetable = data.timetables[activeSession.timetable];
    return {
      timetable,
      lab: data.labs[timetable.lab],
    };
  },
);

export const selectHasActiveSession = state => state.ui.camera.get('hasActiveSession');

export const selectAttendancePayload = createSelector(
  selectDataJS,
  selectActiveSessionJS,
  ({ data }, activeSession) => {
    return {
      lab: data.timetables[activeSession.timetable].lab,
      schedule: activeSession.schedule,
    };
  },
);

const maskAttendanceError = errorMessage => {
  if (/unique/.test(errorMessage)) {
    return 'Looks like you have taken attendance for this session';
  }
  return errorMessage;
};
export const selectTakeAttendanceError = createSelector(
  createSelectStatusJS('attendance', 'create'),
  status => {
    const errorMessage = status?.response?.data?.non_field_errors?.[0] || '';
    return maskAttendanceError(errorMessage);
  },
);

export const selectIsAttendanceTaken = createSelector(
  createSelectStatusJS('attendance', 'create', 'loaded'),
  status => status,
);
