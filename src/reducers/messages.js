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
  MESSAGE_CREATED
} from '../actions';

function messages(state = { messages: [] }, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        messages: action.messages
      };
    case SELECTED_SINGLE_MESSAGE:
      const newState = [ ...this.state.messages ];
      if (newState[action.id].selected) delete newState[action.id].selected;
      else newState[action.id].selected = true;
      return {
        ...state,
        messages: newState
      };
    case STARRED_SINGLE_MESSAGE:
      const newState = [ ...this.state.messages ];
      if (newState[action.id].starred) newState[action.id].starred = false;
      else newState[action.id].starred = true;
      return {
        ...state,
        messages: newState
      };
    case SELECTED_ALL_MESSAGES:
      let newState;
      if (this.state.messages.some(message => message.selected)) {
        newState = this.state.messages.map(message => {
          if (message.selected) delete message.selected;
          return message;
        });
      } else {
        newState = this.state.messages.map(message => {
          message.selected = true;
          return message;
        });
      }
      return {
        ...state,
        messages: newState
      };
    case MARKED_READ:
      const newState = this.state.messages.map(message => {
        if (action.ids.includes(message.id)) message.read = true;
        return message;
      });
      return {
        ...this.state,
        messages: newState
      };
    case MARKED_UNREAD:
      const newState = this.state.messages.map(message => {
        if (action.ids.includes(message.id)) message.read = false;
        return message;
      });
      return {
        ...this.state,
        messages: newState
      };
    case APPLIED_LABEL:
      const ids = action.ids;
      const label = action.label;
      const newState = this.state.messages.map(message => {
        if (ids.includes(message.id) && !message.labels.includes(label)) {
          message.labels.push(label);
        }
        return message;
      });
      return {
        ...this.state,
        messages: newState
      };
    case REMOVED_LABEL:
      const ids = action.ids;
      const label = action.label;
      const newState = this.state.messages.map(message => {
        if (ids.includes(message.id)) {
          message.labels = message.labels.filter(el => el !== label);
        }
      });
      return {
        ...this.state,
        messages: newState
      };
    case DELETED_MESSAGE:
      const newState = this.state.messages.filter(message => {
        return !action.ids.includes(message.id);
      });
      return {
        ...this.state,
        messages: newState
      };
    case MESSAGE_CREATED:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.newMessage
        ]
      };
    default:
      return state;
  }
}

export default messages;
