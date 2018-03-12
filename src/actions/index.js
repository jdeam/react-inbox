import axios from 'axios';
const BaseURL = 'http://localhost:8082';

export const TOGGLED_COMPOSE_FORM = 'TOGGLED_COMPOSE_FORM';
export function toggleComposeForm() {
  return (dispatch) => {
    dispatch({ type: TOGGLED_COMPOSE_FORM });
  }
}

export const UPDATED_FORM_SUBJECT = 'UPDATED_FORM_SUBJECT';
export function updateFormSubject(subject) {
  return (dispatch) => {
    dispatch({ type: UPDATED_FORM_SUBJECT, subject });
  }
}

export const UPDATED_FORM_BODY = 'UPDATED_FORM_BODY';
export function updateFormBody(body) {
  return (dispatch) => {
    dispatch({ type: UPDATED_FORM_BODY, body });
  }
}

export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export function fetchMessages() {
  return async (dispatch) => {
    const response = await axios.get(`${BaseURL}/api/messages`);
    const messages = response.data._embedded.messages;
    dispatch({
      type: MESSAGES_RECEIVED,
      messages
    });
  }
}

export const SELECTED_SINGLE_MESSAGE = 'SELECTED_SINGLE_MESSAGE';
export function selectSingleMessage(id) {
  return (dispatch) => {
    dispatch({ type: SELECTED_SINGLE_MESSAGE, id });
  };
}

export const STARRED_SINGLE_MESSAGE = 'STARRED_SINGLE_MESSAGE';
export function starSingleMessage(id, starStatus) {
  return async (dispatch) => {
    const starBody = {
      messageIds: [ id ],
      command: 'star',
      star: starStatus==='star fa fa-star-o'?true:false
    };
    const response = await axios.patch(`${BaseURL}/api/messages`, starBody);
    if (response.status === 200) {
      dispatch({ type: STARRED_SINGLE_MESSAGE, id });
    }
  }
}

export const SELECTED_ALL_MESSAGES = 'SELECTED_ALL_MESSAGES';
export function selectAllMessages() {
  return (dispatch) => {
    dispatch({ type: SELECTED_ALL_MESSAGES });
  }
}

export const MARKED_READ = 'MARKED_READ';
export function markRead(ids) {
  return async (dispatch) => {
    const readBody = {
      messageIds: ids,
      command: 'read',
      read: true
    };
    const response = await axios.patch(`${BaseURL}/api/messages`, readBody);
    if (response.status === 200) {
      dispatch({ type: MARKED_READ, ids })
    }
  }
}

export const MARKED_UNREAD = 'MARKED_UNREAD';
export function markUnread(ids) {
  return async (dispatch) => {
    const readBody = {
      messageIds: ids,
      command: 'read',
      read: false
    };
    const response = await axios.patch(`${BaseURL}/api/messages`, readBody);
    if (response.status === 200) {
      dispatch({ type: MARKED_UNREAD, ids })
    }
  }
}

export const APPLIED_LABEL = 'APPLIED_LABEL';
export function applyLabel(ids, label) {
  return async (dispatch) => {
    const applyBody = {
      messageIds: ids,
      command: 'addLabel',
      label
    };
    const response = await axios.patch(`${BaseURL}/api/messages`, applyBody);
    if (response.status === 200) {
      dispatch({ type: APPLIED_LABEL, ids, label });
    }
  }
}

export const REMOVED_LABEL = 'REMOVED_LABEL';
export function removeLabel(ids, label) {
  return async (dispatch) => {
    const removeBody = {
      messageIds: ids,
      command: 'removeLabel',
      label
    };
    const response = await axios.patch(`${BaseURL}/api/messages`, removeBody);
    if (response.status === 200) {
      dispatch({ type: REMOVED_LABEL, ids, label });
    }
  }
}

export const DELETED_MESSAGE = 'DELETED_MESSAGE';
export function deleteMessages(ids) {
  return async (dispatch) => {
    const deleteBody = {
      messageIds: ids,
      command: 'delete'
    };
    const response = await axios.patch(`${BaseURL}/api/messages`, deleteBody);
    if (response.status === 200) {
      dispatch({ type: DELETED_MESSAGE, ids });
    }
  }
}

export const MESSAGE_CREATED = 'MESSAGE_CREATED';
export function createMessage(subject, body) {
  return async (dispatch) => {
    if (!subject || !body) return;
    const message = { subject, body };
    const response = await axios.post(`${BaseURL}/api/messages`, message);
    const newMessage = response.data;
    console.log(newMessage);
    dispatch({ type: MESSAGE_CREATED, newMessage });
    dispatch({ type: TOGGLED_COMPOSE_FORM });
  }
}
