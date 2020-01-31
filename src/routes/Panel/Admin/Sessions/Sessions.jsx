import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import { list } from '@/schedule/schedule.actions';
import { selectSchedule } from '@/schedule/schedule.selector';

const Sessions = ({ schedules, list, match }) => {
  const { url } = match;
  React.useEffect(
    () => {
      list();
    },
    [list],
  );
  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-bold m-0">
        Recent Lab Sessions
      </h1>
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
              <td className="border border-gray-400 py-2 px-4">{time}</td>
              <td className="border border-gray-400 py-2 px-4 text-center">
                <Link className="inline-block" to={`${url}/${id}`}>
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                  </svg>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Sessions.propTypes = {
  schedules: PropTypes.array,
  list: PropTypes.func.isRequired,
  match: PropTypes.object,
};

Sessions.defaultProps = {};

const mapStateToProps = state => ({
  schedules: selectSchedule(state),
});
const mapDispatchToProps = { list };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sessions);
