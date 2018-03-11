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
} from '../actions'

function messages(state = { messages: [] }, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        messages: action.messages
      };
    case SELECTED_SINGLE_MESSAGE:
      return {

      };
    case STARRED_SINGLE_MESSAGE:
      return {

      };
    case SELECTED_ALL_MESSAGES:
      return {

      };
    case MARKED_READ:
      return {

      };
    case MARKED_UNREAD:
      return {

      };
    case APPLIED_LABEL:
      return {

      };
    case REMOVED_LABEL:
      return {

      };
    case DELETED_MESSAGE:
      return {

      };
    case MESSAGE_CREATED:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message
        ]
      };
    default:
      return state;
  }
}

export default messages;
