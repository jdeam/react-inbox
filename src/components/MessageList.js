import React from 'react';
import Message from './Message'

const MessageList = ({ messages, selectMessage, starMessage }) => (
  <div>
    { messages.map((message, i) => <Message
      key={ i }
      message={ message }
      selectMessage={ selectMessage(i) }
      starMessage={ starMessage(i) }
    />)}
  </div>
);

export default MessageList;
