import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { history } from '@';
import reduxThunk from 'redux-thunk';

const store = (rootReducer, initialState) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), reduxThunk)),
  );

export default store;
