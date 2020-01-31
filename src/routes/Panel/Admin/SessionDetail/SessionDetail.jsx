import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from 'layouts/Dashboard';
import { fetch } from '@/ui/sessionDetail/actions';
import {
  selectSessionDetailUI,
  selectStudentList,
} from '@/ui/sessionDetail/selector';

const SessionDetail = ({ match, fetch, scheduleDetail, studentList }) => {
  const {
    params: { sessionId },
  } = match;
  React.useEffect(
    () => {
      fetch(sessionId);
    },
    [fetch, sessionId],
  );
  return (
    <div>
      <Dashboard.Title>Session Detail</Dashboard.Title>
      <table className="border-collapse table-auto">
        <thead>
          <tr>
            <th>Course</th>
            <th>Index</th>
            <th>Group</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody className="bg-gray-300">
          <tr>
            <td className="border border-gray-400 p-2">
              {scheduleDetail.course}
            </td>
            <td className="border border-gray-400 p-2">
              {scheduleDetail.index}
            </td>
            <td className="border border-gray-400 p-2">
              {scheduleDetail.group}
            </td>
            <td className="border border-gray-400 p-2">
              {scheduleDetail.time}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-6">
        <h2 className="text-semibold text-2xl">List of Students</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Matriculation Number</th>
              <th>Email</th>
              <th>Status</th>
              <th>Attendance Time</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map(s => (
              <tr key={s.matric}>
                <td className="border border-gray-400 p-2">{s.matric}</td>
                <td className="border border-gray-400 p-2">{s.email}</td>
                <td className="border border-gray-400 p-2">{s.status}</td>
                <td className="border border-gray-400 p-2">{s.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

SessionDetail.propTypes = {
  match: PropTypes.object,
  fetch: PropTypes.func.isRequired,
  scheduleDetail: PropTypes.object.isRequired,
  studentList: PropTypes.array.isRequired,
};

SessionDetail.defaultProps = {};

const mapStateToProps = state => ({
  scheduleDetail: selectSessionDetailUI(state),
  studentList: selectStudentList(state),
});
const mapDispatchToProps = { fetch };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionDetail);
