import { combineReducers } from 'redux';

import auth from './authReducer/authReducer';
import user from './userReducer/userReducer';

export default combineReducers({
  auth,
  user,
});
