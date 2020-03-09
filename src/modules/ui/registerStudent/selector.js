import { selectDataJS, createSelectStatusJS } from '@/entities/selectors';
import { createSelector } from 'reselect';

export const selectDataSets = createSelector(
  selectDataJS,
  ({ data: { courses, labs, students } }) => {
    return {
      courses,
      labs,
      students,
    };
  },
);

export const selectRegistrationError = createSelector(
  createSelectStatusJS('lab', 'update'),
  status => {
    const error = status?.response?.data;
    return error?.non_field_errors?.[0] || error?.[0] || '';
  },
);

export const selectRegistrationLoaded = createSelector(
  createSelectStatusJS('lab', 'update', 'loaded'),
  loaded => loaded,
);
