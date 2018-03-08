import React from 'react';

const Message = ({ message, onSelect, onStar }) => (
  <div className={ `row message ${ message.read?"read":"unread" } ${ message.selected?"selected":"" }`}>
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input
            type="checkbox"
            checked={ message.selected?"checked":"" }
            onChange={ onSelect }
           />
        </div>
        <div className="col-xs-2">
          <i
            className={ message.starred?"star fa fa-star":"star fa fa-star-o"}
            onClick={ onStar }
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

export default Message;
