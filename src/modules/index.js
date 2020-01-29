import { combineReducers } from 'redux';
import counter from '@/counter';
import auth from '@/auth';
import attendance from '@/attendance';

export default combineReducers({
  counter,
  auth,
  attendance,
});
