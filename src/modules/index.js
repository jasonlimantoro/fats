import { combineReducers } from 'redux';
import counter from '@/counter';
import auth from '@/auth';
import attendance from '@/attendance';
import schedule from '@/schedule';

export default combineReducers({
  counter,
  auth,
  attendance,
  schedule,
});
