import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { history } from '@/index';
import reduxThunk from 'redux-thunk';
import middlewares from './middlewares';

const store = (rootReducer, initialState) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), reduxThunk, ...middlewares),
    ),
  );

export default store;
