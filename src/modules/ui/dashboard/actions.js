import { fetch } from '@/entities/actions';
import { createSemester } from 'lib/schema';

export const fetchSemesters = () => async dispatch => {
  dispatch(fetch({ resource: 'semester', schema: [createSemester()] }));
};
