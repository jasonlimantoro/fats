import * as Yup from 'yup';

export const validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
  domain: Yup.string().required(),
});

export const domains = {
  STUDENT: {
    label: 'Student',
    value: 'student',
  },
  ADMIN: {
    label: 'Admin',
    value: 'admin',
  },
};

export const initialValues = {
  username: '',
  password: '',
  domain: domains.STUDENT.value,
};
