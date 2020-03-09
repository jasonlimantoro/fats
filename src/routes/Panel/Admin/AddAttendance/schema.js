import * as Yup from 'yup';

export const validationSchema = Yup.object({
  lab: Yup.string().required(),
  student: Yup.string().required(),
  schedule: Yup.string().required(),
  created_at: Yup.string().required(),
});
