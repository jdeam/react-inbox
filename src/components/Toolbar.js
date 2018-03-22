import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import {
  selectAll,
  markRead,
  markUnread,
  applyLabel,
  removeLabel,
  deleteMessages
} from '../actions';

const Toolbar = ({
  messages,
  selectAll,
  markRead,
  markUnread,
  applyLabel,
  removeLabel,
  deleteMessages
}) => {

  const selectedIds = messages.reduce((arr, message) => {
     return message.selected ? [ ...arr, message.id ] : arr;
  }, []);

  const numUnread = messages.reduce((num, message) => {
     return !message.read ? num+1 : num;
  }, 0);

  let selectBoxStatus;
  if (!selectedIds.length) selectBoxStatus = "fa fa-square-o";
  else if (selectedIds.length < messages.length) selectBoxStatus = "fa fa-minus-square-o";
  else selectBoxStatus = "fa fa-check-square-o";

  const disabledStatus = selectedIds.length ? "" : "disabled";

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{ numUnread }</span>
          unread { numUnread === 1 ? "message" : "messages" }
        </p>

        <Switch>
          <Route exact path="/compose" render={ () => (
            <Link to="/" className="btn btn-danger">
              <i className="fa fa-plus"></i>
            </Link>
          )} />
          <Route path="/" render={ () => (
            <Link to="/compose" className="btn btn-danger">
              <i className="fa fa-plus"></i>
            </Link>
          )} />
        </Switch>

        <button className="btn btn-default" onClick={ selectAll }>
          <i className={ selectBoxStatus }></i>
        </button>

        <button
          className="btn btn-default"
          disabled={ disabledStatus }
          onClick={ () => { markRead(selectedIds) } }
        >
          Mark As Read
        </button>

        <button
          className="btn btn-default"
          disabled={ disabledStatus }
          onClick={ () => { markUnread(selectedIds) } }
        >
          Mark As Unread
        </button>

        <select
          className="form-control label-select"
          disabled={ disabledStatus }
          onChange={ (event) => {
            applyLabel(selectedIds, event.target.value);
          } }
          value={ "default" }
        >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className="form-control label-select"
          disabled={ disabledStatus }
          onChange={ (event) => {
            removeLabel(selectedIds, event.target.value);
          } }
          value={ "default" }
        >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button
          className="btn btn-default"
          disabled={ disabledStatus }
          onClick={ () => { deleteMessages(selectedIds) } }
        >
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ messages: state.messages });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectAll,
  markRead,
  markUnread,
  applyLabel,
  removeLabel,
  deleteMessages
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar));
