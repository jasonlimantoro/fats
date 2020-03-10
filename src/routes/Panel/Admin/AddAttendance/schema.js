import * as Yup from 'yup';

export const validationSchema = Yup.object({
  lab: Yup.string().required(),
  student: Yup.string().required(),
  date: Yup.string().required(),
  time: Yup.string().required(),
});
