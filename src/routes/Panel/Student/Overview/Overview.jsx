import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from 'config/routes';
import { feedData } from '@/ui/student/overview/actions';
import {
  selectRecentAttendances,
  selectTotalAttendancesCount,
  selectMissedAttendancesCount,
} from '@/ui/student/overview/selector';

const Overview = ({ recentAttendances, total, missed, feedData }) => {
  React.useEffect(
    () => {
      feedData();
    },
    [feedData],
  );
  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-bold m-0">Overview</h1>
      <div className="flex my-8">
        <div className="flex-1 mr-2 flex flex-col justify-center bg-gray-800 text-white h-32 py-3 px-4 text-center border rounded shadow-lg">
          <p className="font-semibold text-lg mb-4">Total Lab Attended</p>
          <p>{total}</p>
        </div>
        <div className="flex-1 ml-2 flex flex-col justify-center bg-red-700 text-white h-32 py-3 px-4 text-center border rounded shadow-lg">
          <p className="font-semibold text-lg mb-4">Total Lab Missed</p>
          <p>{missed}</p>
        </div>
      </div>
      <div className="flex">
        <h2 className="text-2xl text-gray-800 font-bold">Recent Attendances</h2>
        <Link to={routes.panel.student.attendances} className="ml-6 btn btn-gray">
          View More
        </Link>
      </div>
      <div className="flex">
        <table className="table-fixed w-full mt-4 text-center">
          <thead className="text-gray-600">
            <tr>
              <th>Course</th>
              <th>Index</th>
              <th>Group</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {recentAttendances.map((a, idx) => (
              <tr
                key={a.id}
                className={cls({
                  'bg-gray-300': idx % 2 === 0,
                })}
              >
                <td className="border border-gray-400 py-2 px-4">{a.lab.course}</td>
                <td className="border border-gray-400 py-2 px-4">{a.lab.index}</td>
                <td className="border border-gray-400 py-2 px-4">{a.lab.name}</td>
                <td className="border border-gray-400 py-2 px-4">{a.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Overview.propTypes = {
  feedData: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  missed: PropTypes.number.isRequired,
  recentAttendances: PropTypes.array.isRequired,
};

Overview.defaultProps = {};

const mapStateToProps = () => state => ({
  recentAttendances: selectRecentAttendances(state),
  total: selectTotalAttendancesCount(state),
  missed: selectMissedAttendancesCount(state),
});
const mapDispatchToProps = { feedData };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overview);
