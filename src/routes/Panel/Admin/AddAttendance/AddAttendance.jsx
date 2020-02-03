import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { submit } from '@/ui/addAttendance/actions';
import { selectInitialFormData } from '@/ui/addAttendance/selector';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

const AddAttendance = ({ match, history, sessionId, session, initialFormData, submit }) => {
  const {
    params: { studentId },
  } = match;
  const { url } = match;
  const form = useFormik({
    initialValues: {
      lab: initialFormData.lab || '',
      student: studentId || '',
      schedule: sessionId || '',
      created_at: session.time || '',
    },
    enableReinitialize: true,
    onSubmit: values => submit(values, { history, sessionId }),
  });
  return (
    <div>
      <BreadcrumbsItem className="breadcrumb" to={url}>
        Add attendance
      </BreadcrumbsItem>
      <form onSubmit={form.handleSubmit}>
        <div className="mb-4">
          <label className="label label-block" htmlFor="lab">
            Lab
          </label>
          <input
            id="lab"
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
            id="schedule"
            name="schedule"
            className="input"
            type="text"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.schedule}
          />
        </div>

        <div className="mb-4">
          <label className="label label-block" htmlFor="student">
            Student
          </label>
          <input
            id="student"
            name="student"
            className="input"
            type="text"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.student}
          />
        </div>
        <div className="mb-4">
          <label className="label label-block" htmlFor="created_at">
            Time
          </label>
          <input
            id="created_at"
            disabled
            name="created_at"
            className="input"
            type="text"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.created_at}
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
