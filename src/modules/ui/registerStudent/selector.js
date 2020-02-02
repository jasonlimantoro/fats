import { selectDataJS } from '@/entities/selectors';
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

export const selectDataSets = createSelector(
  selectDataJS,
  state => {
    if (isEmpty(state.data.courses)) return { courses: [], labs: [], students: [] };
    const labs = Object.values(state.data.labs).map(({ index, name }) => {
      return {
        value: index,
        label: `${index} (${name})`,
      };
    });
    // eslint-disable-next-line camelcase
    const students = Object.values(state.data.students).map(({ user_id, username }) => ({
      value: user_id,
      label: `${username} (${user_id})`,
    }));
    return {
      courses: Object.keys(state.data.courses),
      labs,
      students,
    };
  },
);
