import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAttendance } from '@/ui/sessionDetail/actions';
import { routes } from 'config/routes';
import { reverse } from 'named-urls';

const SessionDetail = ({ id, deleteAttendance, studentList }) => {
  const handleDelete = id => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    if (confirm('Are you sure you want to delete this attendance?')) {
      deleteAttendance(id);
    }
  };
  return (
    <div>
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
              const attendanceIdUrl = reverse(routes.panel.admin.sessions.detail.attendance.add.student, {
                sessionId: id,
                studentId: s.matric,
              });
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
    </div>
  );
};

SessionDetail.propTypes = {
  id: PropTypes.string.isRequired,
  deleteAttendance: PropTypes.func.isRequired,
  studentList: PropTypes.array.isRequired,
};

SessionDetail.defaultProps = {};

const mapDispatchToProps = { deleteAttendance };

export default connect(
  null,
  mapDispatchToProps,
)(SessionDetail);
