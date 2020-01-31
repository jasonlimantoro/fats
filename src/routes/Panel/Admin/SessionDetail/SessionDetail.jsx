import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from 'layouts/Dashboard';
import { detail } from '@/schedule/schedule.actions';
import { selectDetailSchedule } from '@/schedule/schedule.selector';

const SessionDetail = ({ match, detail, scheduleDetail }) => {
  const {
    params: { sessionId },
  } = match;
  React.useEffect(
    () => {
      detail(sessionId);
    },
    [detail, sessionId],
  );
  return (
    <div>
      <Dashboard.Title>Session Detail: {sessionId}</Dashboard.Title>
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
              {scheduleDetail.lab?.course}
            </td>
            <td className="border border-gray-400 p-2">
              {scheduleDetail.lab?.index}
            </td>
            <td className="border border-gray-400 p-2">
              {scheduleDetail.lab?.name}
            </td>
            <td className="border border-gray-400 p-2">
              {scheduleDetail.time}
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-semibold text-2xl">List of Students</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Matriculation Number</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

SessionDetail.propTypes = {
  match: PropTypes.object,
  detail: PropTypes.func.isRequired,
  scheduleDetail: PropTypes.object.isRequired,
};

SessionDetail.defaultProps = {};

const mapStateToProps = state => ({
  scheduleDetail: selectDetailSchedule(state),
});
const mapDispatchToProps = { detail };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionDetail);
