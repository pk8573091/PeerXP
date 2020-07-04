import { combineReducers } from 'redux';
import ticketReducer from './ticketReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';;


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  ticket: ticketReducer
});
