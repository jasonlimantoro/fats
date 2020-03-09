import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from 'layouts/Dashboard';
import { Formik, Form, Field } from 'formik';
import { feedData, submit } from '@/ui/registerStudent/actions';
import { selectDataSets } from '@/ui/registerStudent/selector';
import SelectField from 'components/Form/SelectField';
import { validationSchema, initialValues } from './schema';

const RegisterStudent = ({ feedData, dataSets, submit }) => {
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => submit(values.index, values)}
        >
          {() => (
            <Form className="form-box w-1/3">
              <div className="mb-4">
                <Field
                  name="course"
                  label="Course"
                  id="course"
                  component={SelectField}
                  options={dataSets.courses}
                />
              </div>
              <div className="mb-4">
                <Field
                  name="index"
                  label="Index"
                  id="index"
                  component={SelectField}
                  options={dataSets.labs}
                />
              </div>
              <div className="mb-4">
                <Field
                  name="student"
                  label="Student"
                  id="student"
                  component={SelectField}
                  options={dataSets.students}
                />
              </div>
              <button type="submit" className="btn btn-gray w-full">
                Submit
              </button>
            </Form>
          )}
        </Formik>
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
