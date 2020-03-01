import { combineReducers } from 'redux';
import sessions from './sessions';
import camera from './camera';

export default combineReducers({
  sessions,
  camera,
});
