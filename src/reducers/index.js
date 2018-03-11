import { combineReducers } from 'redux';
import messages from './messages';
import composeForm from './composeForm';

export default combineReducers({
  messages,
  composeForm
});
