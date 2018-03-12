import React from 'react';
import Toolbar from './components/Toolbar';
import ComposeForm from './components/ComposeForm';
import MessageList from './components/MessageList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
  toggleComposeForm,
  updateFormSubject,
  updateFormBody,
  selectSingleMessage,
  starSingleMessage,
  selectAllMessages,
  markRead,
  markUnread,
  applyLabel,
  removeLabel,
  deleteMessages,
  createMessage
} from './actions'

const App = ({
  messages,
  composeForm,
  selectAll,
  markRead,
  markUnread,
  applyLabel,
  removeLabel,
  deleteMessages,
  toggleComposeForm,
  updateSubject,
  updateBody,
  createMessage,
  selectMessage,
  starMessage
 }) => (
  <div className="container">
    <Toolbar
      messages={ messages }
      selectAll={ selectAll }
      markRead={ markRead }
      markUnread={ markUnread }
      applyLabel={ applyLabel }
      removeLabel={ removeLabel }
      deleteMessages={ deleteMessages }
      toggleComposeForm={ toggleComposeForm }
      defaultValue="default"
    />
    <ComposeForm
      display={ composeForm.display }
      content={ composeForm.content }
      updateSubject={ updateSubject }
      updateBody={ updateBody }
      sendMessage={ createMessage }
    />
    <MessageList
      messages={ messages }
      selectMessage={ selectMessage }
      starMessage={ starMessage }
    />
  </div>
);

const mapStateToProps = (state) => ({
  messages: state.messages,
  composeForm: state.composeForm
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectAll: selectAllMessages,
  markRead: markRead,
  markUnread: markUnread,
  applyLabel: applyLabel,
  removeLabel: removeLabel,
  deleteMessages: deleteMessages,
  toggleComposeForm: toggleComposeForm,
  updateSubject: updateFormSubject,
  updateBody: updateFormBody,
  createMessage: createMessage,
  selectMessage: selectSingleMessage,
  starMessage: starSingleMessage
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
