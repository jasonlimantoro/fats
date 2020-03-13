import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAttendance } from '@/ui/sessionDetail/actions';
import { routes } from 'config/routes';
import Label from 'components/Label';
import { reverse } from 'named-urls';
import { AddIcon, EditIcon, RefreshIcon, TrashIcon } from 'components/Icons';
import Spinner from 'components/Spinner';
import cls from 'classnames';

const statusToLabelStyle = {
  late: 'warning',
  absent: 'error',
  present: 'success',
};
const getAddAttendanceUrl = ({ sessionId, studentId }) => {
  return reverse(routes.panel.admin.sessions.detail.attendance.add.student, {
    sessionId,
    studentId,
  });
};

const getEditAttendanceUrl = ({ sessionId, attendanceId }) => {
  return reverse(routes.panel.admin.sessions.detail.attendance.edit, {
    sessionId,
    attendanceId,
  });
};

const SessionDetail = ({ id, deleteAttendance, studentList, onRefresh }) => {
  const handleDelete = id => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    if (confirm('Are you sure you want to delete this attendance?')) {
      deleteAttendance(id);
    }
  };
  return (
    <div>
      <div className="mt-6">
        <div className="flex items-center">
          <h2 className="text-semibold text-2xl">List of Students</h2>
          <Spinner>
            {({ spin, toggleSpin }) => (
              <RefreshIcon
                onClick={() => {
                  toggleSpin();
                  onRefresh();
                }}
                className={cls('h-6 w-6 ml-2 cursor-pointer', { spin })}
              />
            )}
          </Spinner>
        </div>
        <table className="table-auto my-4">
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
              return (
                <tr key={s.matric}>
                  <td className="border border-gray-400 p-2">{s.matric}</td>
                  <td className="border border-gray-400 p-2">{s.email}</td>
                  <td className="border border-gray-400 p-2 text-center">
                    <Label type={statusToLabelStyle[s.status]} className="my-2 capitalize">
                      {s.status}
                    </Label>
                  </td>
                  <td className="border border-gray-400 p-2">{s.time}</td>
                  <td className="border border-gray-400 p-2">
                    <div className="flex justify-center">
                      {s.status !== 'absent' ? (
                        <>
                          <button
                            onClick={() => handleDelete(s.relatedAttendanceId)}
                            className="text-gray-700 mr-2"
                          >
                            <TrashIcon className="h-6 w-6" />
                          </button>
                          <Link
                            to={getEditAttendanceUrl({ sessionId: id, attendanceId: s.relatedAttendanceId })}
                            className="text-gray-700"
                          >
                            <EditIcon className="h-6 w-6" />
                          </Link>
                        </>
                      ) : (
                        <Link
                          to={getAddAttendanceUrl({ sessionId: id, studentId: s.matric })}
                          className="text-gray-700"
                        >
                          <AddIcon className="h-6 w-6" />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Label styles={{ info: { main: 'bg-blue-200' } }}>
          <p className="text-sm text-gray-700 italic">
            <strong>*late</strong> means student arrives <strong>15 minutes</strong> after the lab has started
          </p>
        </Label>
      </div>
    </div>
  );
};

SessionDetail.propTypes = {
  id: PropTypes.string.isRequired,
  deleteAttendance: PropTypes.func.isRequired,
  studentList: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

SessionDetail.defaultProps = {};

const mapDispatchToProps = { deleteAttendance };

export default connect(
  null,
  mapDispatchToProps,
)(SessionDetail);
