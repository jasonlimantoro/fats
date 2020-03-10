import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch } from 'react-router-dom';
import { feedData, addSession, deleteSession } from '@/ui/sessions/actions';
import { selectTimetable, selectRecentSessions } from '@/ui/sessions/selector';
import { routes } from 'config/routes';
import SessionDetailRoutes from 'routes/Panel/Admin/SessionDetail/routes';
import Timetables from './Timetable';
import RecentSessions from './RecentSessions';

const Sessions = ({ schedules, match, feedData, timetables, addSession, deleteSession }) => {
  React.useEffect(
    () => {
      feedData();
    },
    [feedData],
  );
  const handleAddSession = body => {
    addSession(body);
  };
  const handleDeleteSession = id => {
    if (confirm('Are you sure you want to delete this session?')) {
      deleteSession(id);
    }
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
              <RecentSessions onDelete={handleDeleteSession} schedules={schedules} />
              <hr className="my-4" />
              <Timetables timetables={timetables} onAddSession={handleAddSession} />
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
  deleteSession: PropTypes.func.isRequired,
  timetables: PropTypes.array.isRequired,
};

Sessions.defaultProps = {};

const mapStateToProps = state => ({
  schedules: selectRecentSessions(state),
  timetables: selectTimetable(state),
});
const mapDispatchToProps = { feedData, addSession, deleteSession };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sessions);
