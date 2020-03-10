import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { submit } from '@/ui/addAttendance/actions';
import { selectInitialFormData } from '@/ui/addAttendance/selector';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { TextField, SelectField } from 'components/Form';
import { DATETIME_FORMAT } from 'config/format';
import moment from 'moment';
import { validationSchema } from './schema';

const transformValues = (values, meta) => {
  return {
    ...values,
    ...meta,
    created_at: moment(`${values.date} ${values.time}`).format(DATETIME_FORMAT.ISO),
    date: undefined,
    time: undefined,
  };
};
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
      <div className="flex justify-center">
        <Formik
          initialValues={{
            lab: initialFormData.lab || '',
            student: studentId || '',
            date: moment(session.time).format(DATETIME_FORMAT.DATE),
            time: moment(session.time).format(DATETIME_FORMAT.TIME),
          }}
          enableReinitialize
          onSubmit={values => {
            submit(transformValues(values, { schedule: sessionId }), { history, sessionId });
          }}
          validationSchema={validationSchema}
        >
          {() => (
            <Form className="form-box w-1/2 my-4">
              <div className="mb-4">
                <Field id="lab" label="Lab" name="lab" className="w-full" component={TextField} disabled />
              </div>
              <div className="mb-4">
                <Field
                  id="student"
                  label="Student"
                  className="w-full"
                  name="student"
                  component={SelectField}
                  options={[{ value: studentId, label: `${initialFormData.student.username}` }]}
                />
              </div>
              <div className="mb-4">
                <div className="flex -mx-3">
                  <div className="flex-1 px-3">
                    <Field
                      id="date"
                      label="Date"
                      type="date"
                      name="date"
                      component={TextField}
                      className="w-full"
                      disabled
                    />
                  </div>
                  <div className="flex-1 px-3">
                    <Field
                      id="time"
                      label="Time"
                      type="time"
                      name="time"
                      component={TextField}
                      className="w-full"
                    />
                  </div>
                </div>
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

AddAttendance.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  sessionId: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  initialFormData: PropTypes.object.isRequired,
};

AddAttendance.defaultProps = {};

const mapStateToProps = (
  state,
  {
    sessionId,
    match: {
      params: { studentId },
    },
  },
) => ({
  initialFormData: selectInitialFormData(state, { sessionId, studentId }),
});
const mapDispatchToProps = { submit };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddAttendance);
