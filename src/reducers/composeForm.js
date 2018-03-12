import {
  TOGGLED_COMPOSE_FORM,
  UPDATED_FORM_SUBJECT,
  UPDATED_FORM_BODY,
} from '../actions';

const initialFormState = { display: false, content: { subject: '', body: '' } };

function composeForm(state = initialFormState, action) {
  switch(action.type) {
    case TOGGLED_COMPOSE_FORM:
      if (this.state.display) {
        return {
          display: false,
          content: { subject: '', body: '' }
        }
      }
      return {
        ...this.state,
        display: true
      };

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
    default:
      return state;
  }
}

export default composeForm;
