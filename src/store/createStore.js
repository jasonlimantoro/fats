import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

const store = (rootReducer, initialState) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk)),
  );

export default store;
