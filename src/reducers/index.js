import { combineReducers } from 'redux';
import {
  MESSAGES_RECEIVED,
  SELECTED_SINGLE_MESSAGE,
  STARRED_SINGLE_MESSAGE,
  SELECTED_ALL_MESSAGES,
  MARKED_READ,
  MARKED_UNREAD,
  APPLIED_LABEL,
  REMOVED_LABEL,
  DELETED_MESSAGE,
  MESSAGE_CREATED,
  UPDATED_FORM_SUBJECT,
  UPDATED_FORM_BODY,
  CLEARED_FORM,
  EXPANDED_MESSAGE
} from '../actions';

function messages(state = [], action) {
  switch (action.type) {
    case MESSAGES_RECEIVED: {
      return action.messages;
    }
    case SELECTED_SINGLE_MESSAGE: {
      const newState = [ ...state ];
      const i = newState.findIndex(message => message.id === action.id)
      if (newState[i].selected) delete newState[i].selected;
      else newState[i].selected = true;
      return newState;
    }
    case STARRED_SINGLE_MESSAGE: {
      const newState = [ ...state ];
      const i = newState.findIndex(message => message.id === action.id)
      if (newState[i].starred) newState[i].starred = false;
      else newState[i].starred = true;
      return newState;
    }
    case SELECTED_ALL_MESSAGES: {
      let newState;
      if (state.some(message => message.selected)) {
        newState = state.map(message => {
          if (message.selected) delete message.selected;
          return message;
        });
      } else {
        newState = state.map(message => {
          message.selected = true;
          return message;
        });
      }
      return newState;
    }
    case MARKED_READ: {
      const newState = state.map(message => {
        if (action.ids.includes(message.id)) message.read = true;
        return message;
      });
      return newState;
    }
    case MARKED_UNREAD: {
      const newState = state.map(message => {
        if (action.ids.includes(message.id)) message.read = false;
        return message;
      });
      return newState;
    }
    case APPLIED_LABEL: {
      const ids = action.ids;
      const label = action.label;
      const newState = state.map(message => {
        if (ids.includes(message.id) && !message.labels.includes(label)) {
          message.labels.push(label);
        }
        return message;
      });
      return newState;
    }
    case REMOVED_LABEL: {
      const ids = action.ids;
      const label = action.label;
      const newState = state.map(message => {
        if (ids.includes(message.id)) {
          message.labels = message.labels.filter(el => el !== label);
        }
        return message;
      });
      return newState;
    }
    case DELETED_MESSAGE: {
      const newState = state.filter(message => {
        return !action.ids.includes(message.id);
      });
      return newState;
    }
    case MESSAGE_CREATED: {
      return [ ...state, action.newMessage ];
    }
    default:
      return state;
  }
}

function composeForm(state = { subject: '', body: '' }, action) {
  switch(action.type) {
    case UPDATED_FORM_SUBJECT:
      return {
        ...state,
        subject: action.subject
      };
    case UPDATED_FORM_BODY:
      return {
        ...state,
        body: action.body
      };
    case CLEARED_FORM:
      return {
        subject: '',
        body: ''
      };
    default:
      return state;
  }
}

function messageBody(state = '', action) {
  switch(action.type) {
    case EXPANDED_MESSAGE:
      return action.body;
    default:
      return state;
  }
}

export default combineReducers({
  messages,
  composeForm,
  messageBody
});
