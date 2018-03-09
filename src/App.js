import React from 'react';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';

class App extends React.Component {

  state = {
    messages: this.props.messages
  };

  selectMessage = (i) => {
    const fn = (event) => {
      let newState = [ ...this.state.messages ];
      if (newState[i].selected) delete newState[i].selected
      else newState[i].selected = true;
      this.setState({
        messages: newState
      });
    };
    return fn;
  };

  starMessage = (i) => {
    const fn = (event) => {
      let newState = [ ...this.state.messages ];
      if (newState[i].starred) newState[i].starred = false;
      else newState[i].starred = true;
      this.setState({
        messages: newState
      });
    };
    return fn;
  };

  selectAllMessages = (event) => {
    let newState;
    if (this.state.messages.some(message => message.selected)) {
      newState = this.state.messages.map(message => {
        delete message.selected;
        return message;
      });
    } else {
      newState = this.state.messages.map(message => {
        message.selected = true;
        return message;
      });
    }
    this.setState({
      messages: newState
    });
  };

  markRead = (event) => {
    let newState = this.state.messages.map(message => {
      if (message.selected) message.read = true;
      return message;
    });
    this.setState({
      messages: newState
    });
  };

  markUnread = (event) => {
    let newState = this.state.messages.map(message => {
      if (message.selected) message.read = false;
      return message;
    });
    this.setState({
      messages: newState
    });
  };

  applyLabel = (event) => {
    let newState = this.state.messages.map(message => {
      if (message.selected && !message.labels.includes(event.target.value)) {
        message.labels.push(event.target.value);
      }
      return message;
    });
    this.setState({
      messages: newState
    });
  };

  removeLabel = (event) => {
    let newState = this.state.messages.map(message => {
      if (message.selected) {
        message.labels = message.labels.filter(label => label !== event.target.value);
      }
      return message;
    });
    this.setState({
      messages: newState
    });
  };

  deleteMessage = (event) => {
    let newState = this.state.messages.filter(message => !message.selected);
    this.setState({
      messages: newState
    });
  };

  render() {
    return (
      <div className="container">
        <Toolbar
          messages={ this.state.messages }
          selectAll={ this.selectAllMessages }
          markRead={ this.markRead }
          markUnread={ this.markUnread }
          applyLabel={ this.applyLabel }
          removeLabel={ this.removeLabel }
          deleteMessage={ this.deleteMessage }
          defaultValue="default"
        />
        <MessageList
          messages={ this.state.messages }
          selectMessage={ this.selectMessage }
          starMessage={ this.starMessage }
        />
      </div>
    );
  }

}

export default App;
