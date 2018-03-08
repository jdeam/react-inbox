import React from 'react';
import Message from './Message'

const MessageList = ({ messages, onSelect, onStar }) => (
  <div>
    { messages.map((message, i) => <Message
      key={ i }
      message={ message }
      onSelect={ onSelect(i) }
      onStar={ onStar(i) }
    />)}
  </div>
);

export default MessageList;
