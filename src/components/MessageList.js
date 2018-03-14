import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectMessage, starMessage } from '../actions';
import { withRouter } from 'react-router-dom';
import Message from './Message';

const MessageList = ({
  messages,
  selectMessage,
  starMessage,
}) => {
  return (
    <div>
      { messages.map(message => <Message
        key={ message.id }
        message={ message }
        selectMessage={ () => { selectMessage(message.id) } }
        starMessage={ (e) => { starMessage(message.id, e.target.className) } }
      />) }
    </div>
  );
}

const mapStateToProps = (state) => ({ messages: state.messages });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectMessage,
  starMessage,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList));
