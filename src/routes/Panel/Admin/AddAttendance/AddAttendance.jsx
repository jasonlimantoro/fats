import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { submit } from '@/ui/addAttendance/actions';
import { selectInitialFormData } from '@/ui/addAttendance/selector';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import TextField from 'components/Form/TextField';
import { validationSchema } from './schema';

const AddAttendance = ({ match, history, sessionId, session, initialFormData, submit }) => {
  const {
    params: { studentId },
  } = match;
  const { url } = match;
  return (
    <div>
      <BreadcrumbsItem className="breadcrumb" to={url}>
        Add attendance
      </BreadcrumbsItem>
      <Formik
        initialValues={{
          lab: initialFormData.lab || '',
          student: studentId || '',
          schedule: sessionId || '',
          created_at: session.time || '',
        }}
        enableReinitialize
        onSubmit={values => {
          submit(values, { history, sessionId });
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <div className="mb-4">
              <Field id="lab" label="Lab" name="lab" component={TextField} />
            </div>
            <div className="mb-4">
              <Field id="schedule" label="Schedule" name="schedule" component={TextField} />
            </div>
            <div className="mb-4">
              <Field id="student" label="Student" name="student" component={TextField} />
            </div>
            <div className="mb-4">
              <Field id="created_at" label="Time" name="created_at" component={TextField} />
            </div>
            <button type="submit" className="btn btn-gray">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

AddAttendance.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  sessionId: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  initialFormData: PropTypes.object.isRequired,
};

AddAttendance.defaultProps = {};

const mapStateToProps = (state, { sessionId }) => ({
  initialFormData: selectInitialFormData(state, sessionId),
});
const mapDispatchToProps = { submit };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddAttendance);
