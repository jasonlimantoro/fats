import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cls from 'classnames';
import { createAgent } from 'react-through';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Link, Route, Switch } from 'react-router-dom';
import { list } from '@/schedule/schedule.actions';
import { selectSchedule } from '@/schedule/schedule.selector';
import { routes } from 'config/routes';
import { reverse } from 'named-urls';
import SessionDetail from 'routes/Panel/Admin/SessionDetail/SessionDetail';

const TitleAgent = createAgent('title');

const Sessions = ({ schedules, list, match }) => {
  React.useEffect(
    () => {
      list();
    },
    [list],
  );
  const { url } = match;
  return (
    <div>
      <BreadcrumbsItem className="breadcrumb" to={url}>
        All
      </BreadcrumbsItem>
      <Switch>
        <Route
          exact
          path={url}
          render={() => (
            <>
              <TitleAgent>Recent Sessions</TitleAgent>
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
            </>
          )}
        />
        <Route path={String(routes.panel.admin.sessions.detail)} component={SessionDetail} />
      </Switch>
    </div>
  );
};

Sessions.propTypes = {
  schedules: PropTypes.array,
  match: PropTypes.object,
  list: PropTypes.func.isRequired,
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
