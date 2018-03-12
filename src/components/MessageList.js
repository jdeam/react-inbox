import React from 'react';

const MessageList = ({ messages, selectMessage, starMessage }) => (
  <div>
    { messages.map(message => <Message
      key={ message.id }
      message={ message }
      selectMessage={ (event) => {
        selectMessage(message.id);
      } }
      starMessage={ (event) => {
        starMessage(message.id, event.target.className);
      } }
    />)}
  </div>
);

const Message = ({ message, selectMessage, starMessage }) => (
  <div className={ `row message ${ message.read?"read":"unread" } ${ message.selected?"selected":"" }`}>
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input
            type="checkbox"
            checked={ message.selected?"checked":"" }
            onChange={ selectMessage }
           />
        </div>
        <div className="col-xs-2">
          <i
            className={ message.starred?"star fa fa-star":"star fa fa-star-o" }
            onClick={ starMessage }
            ></i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      { message.labels.map((label, i) => (
        <span key={ i } className="label label-warning">{ label }</span>
      )) }
      <a href="#">
        { message.subject }
      </a>
    </div>
  </div>
);

export default MessageList;
