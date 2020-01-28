import { combineReducers } from 'redux';
import counter from '@/counter';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

export const history = createBrowserHistory();

export default combineReducers({ counter, router: connectRouter(history) });
