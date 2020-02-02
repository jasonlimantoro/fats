import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes } from 'config/routes';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import AddAttendance from 'routes/Panel/Admin/AddAttendance';
import SessionDetail from './SessionDetail';
import { selectSessionDetailUI, selectStudentList } from '@/ui/sessionDetail/selector';
import { feedData } from '@/ui/sessionDetail/actions';

const Routes = ({ match, scheduleDetail, studentList, feedData }) => {
  const {
    params: { sessionId },
  } = match;
  React.useEffect(
    () => {
      feedData(sessionId);
    },
    [feedData, sessionId],
  );
  const { url } = match;
  return (
    <div>
      <BreadcrumbsItem className="breadcrumb" to={url}>
        Session {sessionId}
      </BreadcrumbsItem>
      <table className="border-collapse table-auto">
        <thead>
          <tr>
            <th>Course</th>
            <th>Index</th>
            <th>Group</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody className="bg-gray-300">
          <tr>
            <td className="border border-gray-400 p-2">{scheduleDetail.course}</td>
            <td className="border border-gray-400 p-2">{scheduleDetail.index}</td>
            <td className="border border-gray-400 p-2">{scheduleDetail.group}</td>
            <td className="border border-gray-400 p-2">{scheduleDetail.time}</td>
          </tr>
        </tbody>
      </table>
      <Switch>
        <Route
          exact
          path={url}
          render={() => <SessionDetail id={sessionId} studentList={studentList} match={match} />}
        />
        <Route
          path={String(routes.panel.admin.sessions.detail.attendance.add.student)}
          render={props => <AddAttendance sessionId={sessionId} session={scheduleDetail} {...props} />}
        />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  match: PropTypes.object,
  feedData: PropTypes.func.isRequired,
  scheduleDetail: PropTypes.object.isRequired,
  studentList: PropTypes.array.isRequired,
};

Routes.defaultProps = {};
const mapStateToProps = (state, props) => ({
  scheduleDetail: selectSessionDetailUI(state, props.match.params.sessionId),
  studentList: selectStudentList(state, props.match.params.sessionId),
});
const mapDispatchToProps = { feedData };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
