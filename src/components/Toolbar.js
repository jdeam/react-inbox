import React from 'react';

const Toolbar = ({
  messages,
  selectAll,
  markRead,
  markUnread,
  applyLabel,
  removeLabel,
  deleteMessage,
  defaultValue
 }) => {

  const numSelected = messages.reduce((numSelected, message) => {
     return message.selected?numSelected+1:numSelected;
  }, 0);

  const numUnread = messages.reduce((numUnread, message) => {
     return !message.read?numUnread+1:numUnread;
  }, 0);

  let selectBoxStatus;
  if (!numSelected) selectBoxStatus = "fa fa-square-o";
  else if (numSelected < messages.length) selectBoxStatus = "fa fa-minus-square-o";
  else selectBoxStatus = "fa fa-check-square-o";

  const disabledStatus = numSelected?"":"disabled";

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{ numUnread }</span>
          unread {numUnread===1?"message":"messages"}
        </p>

        <button className="btn btn-default" onClick={ selectAll }>
          <i className={ selectBoxStatus }></i>
        </button>

        <button
          className="btn btn-default"
          disabled={ disabledStatus }
          onClick={ markRead }
        >
          Mark As Read
        </button>

        <button
          className="btn btn-default"
          disabled={ disabledStatus }
          onClick={ markUnread }
        >
          Mark As Unread
        </button>

        <select
          className="form-control label-select"
          disabled={ disabledStatus }
          onChange={ applyLabel }
          value={ defaultValue }
        >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className="form-control label-select"
          disabled={ disabledStatus }
          onChange={ removeLabel }
          value={ defaultValue }
        >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button
          className="btn btn-default"
          disabled={ disabledStatus }
          onClick={ deleteMessage }
        >
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
