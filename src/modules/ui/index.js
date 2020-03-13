import { combineReducers } from 'redux';
import sessions from './sessions';
import camera from './camera';
import student from './student';

export default combineReducers({
  sessions,
  camera,
  student,
});
