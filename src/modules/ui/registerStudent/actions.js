import { fetch, update } from '@/entities/actions';
import { course, lab, student } from './schema';

export const feedData = () => async dispatch => {
  dispatch(fetch({ resource: 'course', schema: [course] }));
  dispatch(fetch({ resource: 'student', schema: [student] }));
};
export const submit = (id, body) => async dispatch => {
  dispatch(
    update(
      id,
      {
        ...body,
        students: [body.student],
        student: undefined,
      },
      { resource: 'lab', schema: lab },
    ),
  );
};
