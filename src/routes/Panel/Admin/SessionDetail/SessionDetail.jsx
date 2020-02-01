import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { createAgent } from 'react-through';
import { feedData, deleteAttendance } from '@/ui/sessionDetail/actions';
import { selectSessionDetailUI, selectStudentList } from '@/ui/sessionDetail/selector';
import { routes } from 'config/routes';
import { reverse } from 'named-urls';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import AddAttendance from 'routes/Panel/Admin/AddAttendance';

const TitleAgent = createAgent('title');
const SessionDetail = ({ match, feedData, deleteAttendance, scheduleDetail, studentList }) => {
  const {
    params: { sessionId },
  } = match;
  const { url } = match;
  React.useEffect(
    () => {
      feedData(sessionId);
    },
    [feedData, sessionId],
  );
  const handleDelete = id => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    if (confirm('Are you sure you want to delete this attendance?')) {
      deleteAttendance(id);
    }
  };
  return (
    <div>
      <BreadcrumbsItem className="breadcrumb" to={url}>
        Session {sessionId}
      </BreadcrumbsItem>
      <Switch>
        <Route
          exact
          path={url}
          render={() => (
            <>
              <TitleAgent>Session Detail</TitleAgent>
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
                    <td className="border border-gray-400 p-2">{scheduleDetail.course}</td>
                    <td className="border border-gray-400 p-2">{scheduleDetail.index}</td>
                    <td className="border border-gray-400 p-2">{scheduleDetail.group}</td>
                    <td className="border border-gray-400 p-2">{scheduleDetail.time}</td>
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentList.map(s => {
                      const attendanceIdUrl = reverse(
                        routes.panel.admin.sessions.detail.attendance.add.student,
                        {
                          sessionId,
                          studentId: s.matric,
                        },
                      );
                      return (
                        <tr key={s.matric}>
                          <td className="border border-gray-400 p-2">{s.matric}</td>
                          <td className="border border-gray-400 p-2">{s.email}</td>
                          <td className="border border-gray-400 p-2">{s.status}</td>
                          <td className="border border-gray-400 p-2">{s.time}</td>
                          <td className="border border-gray-400 p-2">
                            {s.status !== 'absent' ? (
                              <button onClick={() => handleDelete(s.attendanceId)} className="text-gray-700">
                                <svg
                                  className="h-3 w-3 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
                                </svg>
                              </button>
                            ) : (
                              <Link to={attendanceIdUrl} className="text-gray-700">
                                <svg
                                  className="h-3 w-3 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                                </svg>
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        />
        <Route
          path={String(routes.panel.admin.sessions.detail.attendance.add.student)}
          component={AddAttendance}
        />
      </Switch>
    </div>
  );
};

SessionDetail.propTypes = {
  match: PropTypes.object,
  feedData: PropTypes.func.isRequired,
  deleteAttendance: PropTypes.func.isRequired,
  scheduleDetail: PropTypes.object.isRequired,
  studentList: PropTypes.array.isRequired,
};

SessionDetail.defaultProps = {};

const mapStateToProps = state => ({
  scheduleDetail: selectSessionDetailUI(state),
  studentList: selectStudentList(state),
});
const mapDispatchToProps = { feedData, deleteAttendance };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionDetail);
