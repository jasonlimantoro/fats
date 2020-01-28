import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import operation from './operation.reducer';
import credential from './credential.reducer';

const authPersistConfig = {
  key: 'currentUser',
  storage,
  whitelist: ['credential'],
  transforms: [immutableTransform()],
};

export default persistReducer(
  authPersistConfig,
  combineReducers({
    operation,
    credential,
  }),
);
