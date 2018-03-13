import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateFormSubject, updateFormBody, createMessage } from '../actions';

const ComposeForm = ({
  display,
  content,
  updateSubject,
  updateBody,
  sendMessage
}) => (
  <form
    className="form-horizontal well"
    style={ display?{ "display": "block" }:{ "display": "none" } }
  >
    <div className="form-group">
      <div className="col-sm-8 col-sm-offset-2">
        <h4>Compose Message</h4>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          id="subject"
          placeholder="Enter a subject"
          name="subject"
          onChange={ (event) => {
            updateSubject(event.target.value);
          } }
          value={ content.subject }
        />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="body" className="col-sm-2 control-label">Body</label>
      <div className="col-sm-8">
        <textarea
          name="body"
          id="body"
          className="form-control"
          onChange={ (event) => {
            updateBody(event.target.value);
          } }
          value={ content.body }
        ></textarea>
      </div>
    </div>
    <div className="form-group">
      <div className="col-sm-8 col-sm-offset-2">
        <input
          type="submit"
          value="Send"
          className="btn btn-primary"
          onClick={ (event) => {
            event.preventDefault();
            sendMessage(content.subject, content.body);
          } }
        />
      </div>
    </div>
  </form>
);

const mapStateToProps = (state) => ({
  display: state.composeForm.display,
  content: state.composeForm.content
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateSubject: updateFormSubject,
  updateBody: updateFormBody,
  createMessage: createMessage,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposeForm);
