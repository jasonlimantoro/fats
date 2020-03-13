import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cls from 'classnames';
import { feedData } from '@/ui/student/overview/actions';
import { selectAttendances } from '@/ui/student/overview/selector';

const Attendances = ({ attendances, feedData }) => {
  React.useEffect(
    () => {
      feedData();
    },
    [feedData],
  );

  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-bold m-0">Overview</h1>
      <h2 className="text-gray-700 text-2xl font-bold">All attendances ({attendances.length})</h2>
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
          {attendances.map((a, idx) => (
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
  );
};

Attendances.propTypes = {
  attendances: PropTypes.array.isRequired,
  feedData: PropTypes.func.isRequired,
};

Attendances.defaultProps = {};

const mapStateToProps = state => ({
  attendances: selectAttendances(state),
});
const mapDispatchToProps = { feedData };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Attendances);
