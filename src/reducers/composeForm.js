import {
  TOGGLED_COMPOSE_FORM,
  UPDATED_FORM_SUBJECT,
  UPDATED_FORM_BODY,
  CLEARED_COMPOSE_FORM
} from '../actions';

function composeForm(state = {}, action) {
  switch(action.type) {
    case TOGGLED_COMPOSE_FORM:
      return {

      };
    case UPDATED_FORM_SUBJECT:
      return {

      };
    case UPDATED_FORM_BODY:
      return {

      };
    case CLEARED_COMPOSE_FORM:
      return {

      };
    default:
      return state;
  }
}

export default composeForm;
