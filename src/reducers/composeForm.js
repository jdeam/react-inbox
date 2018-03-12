import {
  TOGGLED_COMPOSE_FORM,
  UPDATED_FORM_SUBJECT,
  UPDATED_FORM_BODY,
  CLEARED_COMPOSE_FORM
} from '../actions';

const initialFormState = { display: false, content: { subject: '', body: '' } };

function composeForm(state = initialFormState, action) {
  switch(action.type) {
    case TOGGLED_COMPOSE_FORM:
      if (action.toggle) {
        return {
          ...this.state,
          display: true
        };
      } else {
        return {
          ...this.state,
          display: false,
          content: { subject: '', body: ''}
        }
      }
    case UPDATED_FORM_SUBJECT:
      return {
        ...this.state,
        content: {
          ...this.state.content,
          subject: action.subject
        }
      };
    case UPDATED_FORM_BODY:
      return {
        ...this.state,
        content: {
          ...this.state.content,
          body: action.body
        }
      };
    case CLEARED_COMPOSE_FORM:
      return {
        ...this.state,
        content: {
          subject: '',
          body: ''
        }
      };
    default:
      return state;
  }
}

export default composeForm;
