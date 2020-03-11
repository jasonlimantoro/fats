import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from 'layouts/Dashboard';
import { Formik, Form, Field } from 'formik';
import { feedData, submit } from '@/ui/registerStudent/actions';
import {
  selectDataSets,
  selectRegistrationError,
  selectRegistrationLoaded,
} from '@/ui/registerStudent/selector';
import { SelectField } from 'components/Form';
import Alert from 'components/Alert';
import { createArrayToChoiceMapper } from 'lib/utils';
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

/**
 * Body must have field 'students' whose value is array for student registration
 * @param values
 */
const transformValues = values => {
  const copy = { ...values };
  copy.students = [values.student];
  delete copy.student;
  return copy;
};

const RegisterStudent = ({ feedData, dataSets, submit, registrationError, registrationLoaded }) => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState('error');
  React.useEffect(
    () => {
      feedData();
    },
    [feedData],
  );
  const onClose = React.useCallback(() => {
    setShowAlert(false);
  }, []);

  React.useEffect(
    () => {
      if (registrationLoaded) {
        setShowAlert(true);
        if (!registrationError) {
          setAlertType('success');
        } else {
          setAlertType('error');
        }
      }
    },
    [registrationError, registrationLoaded],
  );
  return (
    <div>
      <Dashboard.TitleAgent>Register Student</Dashboard.TitleAgent>
      <div className="flex justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => submit(values.index, transformValues(values))}
        >
          {({ values }) => (
            <Form className="form-box w-1/2 my-4">
              <Alert show={showAlert} type={alertType} onClose={onClose}>
                {alertType === 'error' ? (
                  <>
                    <Alert.Title>Oh Snap! Failed to register student</Alert.Title>
                    <Alert.Body>
                      <p>Details: {registrationError}</p>
                    </Alert.Body>
                  </>
                ) : (
                  <>
                    <Alert.Title>Success!</Alert.Title>
                    <Alert.Body>Registration student is successful</Alert.Body>
                  </>
                )}
              </Alert>
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
  registrationError: PropTypes.string.isRequired,
  registrationLoaded: PropTypes.bool.isRequired,
};

RegisterStudent.defaultProps = {};

const mapStateToProps = state => ({
  dataSets: selectDataSets(state),
  registrationError: selectRegistrationError(state),
  registrationLoaded: selectRegistrationLoaded(state),
});
const mapDispatchToProps = { feedData, submit };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterStudent);
