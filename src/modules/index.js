import { combineReducers } from 'redux';
import counter from '@/counter';
import auth from '@/auth';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

export const history = createBrowserHistory();

export default combineReducers({
  router: connectRouter(history),
  counter,
  auth,
});
