import * as Yup from 'yup';

export const validationSchema = Yup.object({
  semester: Yup.string().required(),
  timetable: Yup.string().required(),
});

export const initialValues = {
  semester: '',
  timetable: '',
};
