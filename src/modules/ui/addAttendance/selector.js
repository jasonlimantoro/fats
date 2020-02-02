import { createSelector } from 'reselect';
import { selectDataJS } from '@/entities/selectors';
import isEmpty from 'lodash/isEmpty';

export const selectInitialFormData = createSelector(
  selectDataJS,
  (_, sessionId) => sessionId,
  (state, sessionId) => {
    if (isEmpty(state.data.schedules)) return {};
    const schedule = state.data.schedules[sessionId];
    const lab = state.data.labs[schedule.lab];
    return {
      lab: lab.index,
    };
  },
);
