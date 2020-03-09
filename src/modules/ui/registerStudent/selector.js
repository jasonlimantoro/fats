import { selectDataJS } from '@/entities/selectors';
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { createArrayToChoiceMapper } from 'lib/helpers';

export const selectDataSets = createSelector(
  selectDataJS,
  state => {
    if (isEmpty(state.data.courses)) return { courses: [], labs: [], students: [] };
    const labMapper = createArrayToChoiceMapper({
      valueTransform: el => el.index,
      labelTransform: el => `${el.index} (${el.name})`,
    });
    const labs = Object.values(state.data.labs).map(labMapper);

    const studentMapper = createArrayToChoiceMapper({
      valueTransform: el => el.user_id,
      labelTransform: el => `${el.username} (${el.user_id})`,
    });
    const students = Object.values(state.data.students).map(studentMapper);
    const courseMapper = createArrayToChoiceMapper();
    const courses = Object.keys(state.data.courses).map(courseMapper);
    return {
      courses,
      labs,
      students,
    };
  },
);
