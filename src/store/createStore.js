import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import middlewares from './middlewares';

const configureStore = (rootReducer, initialState) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk, ...middlewares)),
  );

export default configureStore;
