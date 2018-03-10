import React from 'react';

class ComposeForm extends React.Component {

  state = {
    subject: "",
    body: ""
  }

  handleSendButton = (event) => {
    event.preventDefault();
    let newMessage = { ...this.state };
    if (newMessage.subject && newMessage.body) {
      this.props.sendMessage(newMessage);
    }
    this.setState({
      subject: "",
      body: ""
    });
  }

  updateSubject = (event) => {
    this.setState({
      subject: event.target.value
    });
  };

  updateBody = (event) => {
    this.setState({
      body: event.target.value
    });
  }

  render() {
    return (
      <form
        className="form-horizontal well"
        style={ this.props.display?{ "display": "block" }:{ "display": "none" }}
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
              onChange={ this.updateSubject }
              value={ this.state.subject }
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
              onChange={ this.updateBody }
              value={ this.state.body }
            ></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input
              type="submit"
              value="Send"
              className="btn btn-primary"
              onClick={ this.handleSendButton }
            />
          </div>
        </div>
      </form>
    );
  }
}

export default ComposeForm;
