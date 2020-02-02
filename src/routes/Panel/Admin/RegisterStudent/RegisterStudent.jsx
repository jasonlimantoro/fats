import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from 'layouts/Dashboard';
import { useFormik } from 'formik';
import cls from 'classnames';
import { feedData, submit } from '@/ui/registerStudent/actions';
import { selectDataSets } from '@/ui/registerStudent/selector';
import { validationSchema } from './schema';

const RegisterStudent = ({ feedData, dataSets, submit }) => {
  const form = useFormik({
    initialValues: {
      course: '',
      index: '',
      student: '',
    },
    validationSchema,
    onSubmit: values => submit(values.index, values),
  });
  React.useEffect(
    () => {
      feedData();
    },
    [feedData],
  );
  return (
    <div>
      <Dashboard.TitleAgent>Register Student</Dashboard.TitleAgent>
      <div className="flex justify-center">
        <form className="w-1/3" onSubmit={form.handleSubmit}>
          <div className="mb-4">
            <label className="label" htmlFor="course">
              Course
            </label>
            <div className="relative">
              <select
                className={cls('input-select', {
                  'border-red-500 border': !!(form.touched.course && form.errors.course),
                })}
                name="course"
                id="course"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                value={form.values.course}
              >
                <option value="">Select Course</option>
                {dataSets.courses && dataSets.courses.map(d => <option key={d}>{d}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {form.errors.course && form.touched.course && (
              <p className="text-red-500 italic text-xs">{form.errors.course}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="label" htmlFor="index">
              Index
            </label>
            <div className="relative">
              <select
                className={cls('input-select', {
                  'border-red-500 border': !!(form.touched.index && form.errors.index),
                })}
                name="index"
                id="index"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                value={form.values.index}
              >
                <option value="">Select Index</option>
                {dataSets.labs.map(d => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {form.errors.index && form.touched.index && (
              <p className="text-red-500 italic text-xs">{form.errors.index}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="label" htmlFor="student">
              Student
            </label>
            <div className="relative">
              <select
                className={cls('input-select', {
                  'border-red-500 border': !!(form.touched.student && form.errors.student),
                })}
                name="student"
                id="student"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                value={form.values.student}
              >
                <option value="">Select Student</option>
                {dataSets.students.map(d => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {form.errors.student && form.touched.student && (
              <p className="text-red-500 italic text-xs">{form.errors.student}</p>
            )}
          </div>
          <button type="submit" className="btn btn-gray w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

RegisterStudent.propTypes = {
  feedData: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  dataSets: PropTypes.object.isRequired,
};

RegisterStudent.defaultProps = {};

const mapStateToProps = state => ({
  dataSets: selectDataSets(state),
});
const mapDispatchToProps = { feedData, submit };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterStudent);
