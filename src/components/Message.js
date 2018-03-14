import React from 'react';
import { Link, Route } from 'react-router-dom';
import MessageBody from './MessageBody';

const Message = ({
  message,
  selectMessage,
  starMessage
}) => {
  return [
    <div
      className={
        `row message ${ message.read?"read":"unread" }
        ${ message.selected?"selected":"" }`
      }
      key="message"
    >
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
        <Link to={ `/messages/${message.id}` }>
          { message.subject }
        </Link>
      </div>
    </div>,
    <Route
      key="message-body"
      path={ `/messages/${message.id}` }
      render={ () => {
        return <MessageBody id={ message.id } />
      } }
    />
  ];
}

export default Message;
