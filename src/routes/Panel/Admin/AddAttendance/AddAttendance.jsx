import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { feedData, submit } from '@/ui/addAttendance/actions';
import { selectInitialFormData } from '@/ui/addAttendance/selector';

const AddAttendance = ({ match, feedData, initialFormData, submit }) => {
  const {
    params: { sessionId, studentId },
  } = match;
  React.useEffect(
    () => {
      feedData(sessionId);
    },
    [feedData, sessionId],
  );

  const form = useFormik({
    initialValues: {
      lab: initialFormData.lab,
      student: studentId,
      schedule: initialFormData.schedule,
    },
    enableReinitialize: true,
    onSubmit: values => submit(values),
  });
  return (
    <div>
      Add Attendance
      <form onSubmit={form.handleSubmit}>
        <div className="mb-4">
          <label className="label label-block" htmlFor="lab">
            Lab
          </label>
          <input
            name="lab"
            type="text"
            className="input"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.lab}
          />
        </div>
        <div className="mb-4">
          <label className="label label-block" htmlFor="schedule">
            Schedule
          </label>
          <input
            name="schedule"
            className="input"
            type="text"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.schedule}
          />
        </div>

        <div className="mb-4">
          <label className="label label-block" htmlFor="lab">
            Student
          </label>
          <input
            name="student"
            className="input"
            type="text"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.student}
          />
        </div>
        <button type="submit" className="btn btn-gray">
          Submit
        </button>
      </form>
    </div>
  );
};

AddAttendance.propTypes = {
  match: PropTypes.object.isRequired,
  feedData: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  initialFormData: PropTypes.object.isRequired,
};

AddAttendance.defaultProps = {};

const mapStateToProps = state => ({
  initialFormData: selectInitialFormData(state),
});
const mapDispatchToProps = { feedData, submit };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddAttendance);
