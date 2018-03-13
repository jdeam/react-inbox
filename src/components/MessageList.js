import React from 'react';
import MessageBody from './MessageBody';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  selectMessage,
  starMessage,
  clearForm
} from '../actions';
import { withRouter, Link, Route } from 'react-router-dom';

const MessageList = ({
  messages,
  selectMessage,
  starMessage,
  clearForm
}) => {
  return (
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
        clearForm={ clearForm }
      />) }
    </div>
  );
}

const Message = ({
  message,
  selectMessage,
  starMessage,
  clearForm
}) => {
  return [
    <div
      className={ `row message ${ message.read?"read":"unread" } ${ message.selected?"selected":"" }`}
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
        <Link
          to={ `/messages/${message.id}` }
          onClick={ () => {
            clearForm();
          } }
        >
          { message.subject }
        </Link>
      </div>
    </div>,
    <Route
      key="message-body"
      path={ `/messages/${message.id}` }
      render={ props => {
        return <MessageBody id={ message.id } />
      } }
    />
  ];
}

const mapStateToProps = (state) => ({ messages: state.messages });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectMessage,
  starMessage,
  clearForm
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList));
