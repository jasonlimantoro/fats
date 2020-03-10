import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { feedData, submit } from '@/ui/editAttendance/actions';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { selectInitialFormData } from '@/ui/editAttendance/selector';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import { DATETIME_FORMAT } from 'config/format';
import { SelectField, TextField } from 'components/Form';
import { validationSchema } from './schema';

const transformValues = (values, meta = {}) => {
  return {
    ...values,
    ...meta,
    created_at: moment(`${values.date} ${values.time}`).format(DATETIME_FORMAT.ISO),
    date: undefined,
    time: undefined,
  };
};

const EditAttendance = ({ match, history, feedData, initialFormData, submit }) => {
  const {
    params: { attendanceId, sessionId },
  } = match;
  const { url } = match;

  React.useEffect(
    () => {
      feedData(attendanceId);
    },
    [feedData, attendanceId],
  );
  return (
    <div>
      <BreadcrumbsItem className="breadcrumb" to={url}>
        Update attendance
      </BreadcrumbsItem>
      <div className="flex justify-center">
        <Formik
          initialValues={{
            lab: initialFormData.lab,
            student: initialFormData.student.user_id,
            date: moment(initialFormData.created_at).format(DATETIME_FORMAT.DATE),
            time: moment(initialFormData.created_at).format(DATETIME_FORMAT.TIME),
          }}
          enableReinitialize
          onSubmit={values => {
            submit(attendanceId, transformValues(values, { schedule: sessionId }), { history, sessionId });
          }}
          validationSchema={validationSchema}
        >
          {() => (
            <Form className="form-box w-1/2 my-4">
              <div className="flex justify-center">
                <p className="text-2xl text-gray-700">Update Attendance</p>
              </div>
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
                  options={[
                    {
                      value: initialFormData.student.user_id,
                      label: `${initialFormData.student.username} (${initialFormData.student.user_id})`,
                    },
                  ]}
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

EditAttendance.propTypes = {
  // From parent
  match: PropTypes.object,
  history: PropTypes.object,

  // from redux
  feedData: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  initialFormData: PropTypes.shape({
    lab: PropTypes.string.isRequired,
    student: PropTypes.shape({
      user_id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
  }),
};

EditAttendance.defaultProps = {};

const mapStateToProps = (state, props) => ({
  initialFormData: selectInitialFormData(state, { attendanceId: props.match.params.attendanceId }),
});
const mapDispatchToProps = { feedData, submit };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditAttendance);
