import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import moment from 'moment';
import { DATETIME_FORMAT } from 'config/format';

const Timetables = ({ timetables, onAddSession }) => {
  return (
    <div>
      <p className="text-2xl font-bold">Schedule</p>
      {timetables.length > 0 &&
        timetables.map(
          (t, idx) =>
            t.schedules.length > 0 && (
              <div
                className={cls({
                  'mt-4': idx !== 0,
                })}
                key={t.id}
              >
                <div className="my-2">
                  <h1 className="text-xl underline">
                    {t.id} - {t.name}
                  </h1>
                </div>
                <table className="table-fixed">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Group</th>
                      <th>Date</th>
                      <th>Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.schedules.length > 0 ? (
                      t.schedules.map(s => (
                        <tr key={s.id}>
                          <td className="column">{s.lab.index}</td>
                          <td className="column">{s.lab.name}</td>
                          <td className="column">
                            <ul>
                              {s.completeSchedule.map(({ label, past, week }) => (
                                <li
                                  key={label}
                                  className={cls('py-4', {
                                    'line-through italic text-gray-700': past,
                                  })}
                                >
                                  {moment(label).format(DATETIME_FORMAT.HUMAN_DATETIME)} (Week {week}){' '}
                                  <button
                                    onClick={() =>
                                      onAddSession({
                                        time: `${label} ${s.start_at}`,
                                        lab: s.lab.index,
                                      })
                                    }
                                    disabled={past}
                                    className="btn btn-gray"
                                  >
                                    Add Session
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="column">
                            <ul>
                              <li>
                                Weeks: {s.start_week} - {s.end_week}
                              </li>
                              <li>
                                Recurrence: <b>{s.week}</b> weeks
                              </li>
                              <li>
                                Time : {s.start_at} - {s.end_at}
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="column" colSpan={3}>
                          <p className="italic text-gray-600">No schedules are recorded</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ),
        )}
    </div>
  );
};

Timetables.propTypes = {
  timetables: PropTypes.array.isRequired,
  onAddSession: PropTypes.func.isRequired,
};

Timetables.defaultProps = {};

export default Timetables;
