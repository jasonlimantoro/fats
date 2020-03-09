import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from 'layouts/Dashboard';
import { Formik, Form, Field } from 'formik';
import { feedData, submit } from '@/ui/registerStudent/actions';
import { selectDataSets } from '@/ui/registerStudent/selector';
import { SelectField } from 'components/Form';
import { createArrayToChoiceMapper } from 'lib/helpers';
import { validationSchema, initialValues } from './schema';

const studentMapper = createArrayToChoiceMapper({
  valueTransform: el => el.user_id,
  labelTransform: el => `${el.username} (${el.user_id})`,
});

const labMapper = createArrayToChoiceMapper({
  valueTransform: el => el.index,
  labelTransform: el => `${el.index} (${el.name})`,
});

const courseMapper = createArrayToChoiceMapper({
  valueTransform: el => el.id,
  labelTransform: el => `${el.id} (${el.name})`,
});

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
          {({ values }) => (
            <Form className="form-box w-1/2 my-4">
              <div className="mb-4">
                <Field
                  name="course"
                  label="Course"
                  id="course"
                  component={SelectField}
                  options={Object.values(dataSets.courses).map(courseMapper)}
                />
              </div>
              {values.course && (
                <div className="mb-4">
                  <Field
                    name="index"
                    label="Index"
                    id="index"
                    component={SelectField}
                    options={dataSets.courses[values.course].labs
                      .map(index => dataSets.labs[index])
                      .map(labMapper)}
                  />
                </div>
              )}
              {values.index && (
                <div className="mb-4">
                  <Field
                    name="student"
                    label="Student"
                    id="student"
                    component={SelectField}
                    options={Object.values(dataSets.students)
                      .filter(({ user_id }) => !dataSets.labs[values.index].students.includes(user_id))
                      .map(studentMapper)}
                  />
                </div>
              )}
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
