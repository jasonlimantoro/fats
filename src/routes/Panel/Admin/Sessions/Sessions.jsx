import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cls from 'classnames';
import moment from 'moment';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Link, Route, Switch } from 'react-router-dom';
import { feedData, addSession } from '@/ui/sessions/actions';
import { selectTimetable, selectRecentSessions } from '@/ui/sessions/selector';
import { routes } from 'config/routes';
import { reverse } from 'named-urls';
import SessionDetailRoutes from 'routes/Panel/Admin/SessionDetail/routes';

const Sessions = ({ schedules, match, feedData, timetables, addSession }) => {
  React.useEffect(
    () => {
      feedData();
    },
    [feedData],
  );
  const handleAddSession = body => {
    addSession(body);
  };
  const { url } = match;
  return (
    <div>
      <BreadcrumbsItem className="breadcrumb" to={url}>
        All Sessions
      </BreadcrumbsItem>
      <Switch>
        <Route
          exact
          path={url}
          render={() => (
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
                      <td className="border border-gray-400 py-2 px-4">
                        {moment(time).format('YYYY-MM-DD HH:mm')}
                      </td>
                      <td className="border border-gray-400 py-2 px-4 text-center">
                        <Link
                          className="inline-block"
                          to={reverse(String(routes.panel.admin.sessions.detail), { sessionId: id })}
                        >
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
              <hr className="my-4" />
              <p className="text-2xl font-bold">Schedule</p>
              {timetables.length > 0 &&
                timetables.map((t, idx) => (
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
                                  {s.schedule.map(({ label, past, week }) => (
                                    <li
                                      key={label}
                                      className={cls('py-4', {
                                        'line-through italic text-gray-700': past,
                                      })}
                                    >
                                      {label} (Week {week}){' '}
                                      <button
                                        onClick={() =>
                                          handleAddSession({
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
                ))}
            </div>
          )}
        />
        <Route path={String(routes.panel.admin.sessions.detail)} component={SessionDetailRoutes} />
      </Switch>
    </div>
  );
};

Sessions.propTypes = {
  schedules: PropTypes.array,
  match: PropTypes.object,
  feedData: PropTypes.func.isRequired,
  addSession: PropTypes.func.isRequired,
  timetables: PropTypes.array.isRequired,
};

Sessions.defaultProps = {};

const mapStateToProps = state => ({
  schedules: selectRecentSessions(state),
  timetables: selectTimetable(state),
});
const mapDispatchToProps = { feedData, addSession };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sessions);
