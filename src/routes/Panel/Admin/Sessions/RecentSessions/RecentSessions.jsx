import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { reverse } from 'named-urls';
import { routes } from 'config/routes';
import { TrashIcon, ViewIcon } from 'components/Icons';

const RecentSessions = ({ onDelete, schedules }) => {
  return (
    <div>
      <p className="text-2xl font-bold">Recent Sessions</p>
      <table className="table-auto w-full mt-4 text-center">
        <thead className="text-gray-600">
          <tr>
            <th>No</th>
            <th>Course</th>
            <th>Index</th>
            <th>Group</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {schedules.map(({ id, time, lab: { course, index, name } }, idx) => (
            <tr
              key={id}
              className={cls({
                'bg-gray-300': idx % 2 === 0,
              })}
            >
              <td className="border border-gray-400 py-2 px-4">{idx + 1}</td>
              <td className="border border-gray-400 py-2 px-4">{course}</td>
              <td className="border border-gray-400 py-2 px-4">{index}</td>
              <td className="border border-gray-400 py-2 px-4">{name}</td>
              <td className="border border-gray-400 py-2 px-4">{moment(time).format('YYYY-MM-DD HH:mm')}</td>
              <td className="border border-gray-400 py-2 px-4 text-center">
                <Link
                  className="inline-block"
                  to={reverse(String(routes.panel.admin.sessions.detail), { sessionId: id })}
                >
                  <ViewIcon className="h-4 w-4" />
                </Link>
                <button onClick={() => onDelete(id)} className="text-gray-700 ml-6">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RecentSessions.propTypes = {
  schedules: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

RecentSessions.defaultProps = {};

export default RecentSessions;
