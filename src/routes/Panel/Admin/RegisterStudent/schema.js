import * as Yup from 'yup';

export const validationSchema = Yup.object({
  course: Yup.string().required(),
  index: Yup.string().required(),
  student: Yup.string().required(),
});
