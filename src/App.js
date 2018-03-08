import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    }
  }

  selectMessage = (i) => {
    const fn = (e) => {
      let newState = [ ...this.state.messages ];
      if (newState[i].selected) delete newState[i].selected
      else newState[i].selected = true;
      this.setState({
        messages: newState
      });
    };
    return fn;
  }

  starMessage = (i) => {
    const fn = (e) => {
      let newState = [ ...this.state.messages ];
      if (newState[i].starred) newState[i].starred = false;
      else newState[i].starred = true;
      this.setState({
        messages: newState
      });
    };
    return fn;
  }

  selectAllMessages = (e) => {
    let newState = [ ...this.state.messages ];
    if (newState.some(message => message.selected)) {
      newState = newState.map(message => {
        delete message.selected;
        return message;
      });
    } else {
      newState = newState.map(message => {
        message.selected = true;
        return message;
      });
    }
    this.setState({
      messages: newState
    });
  }

  markRead = (e) => {
    let newState = [ ...this.state.messages ];
    newState = newState.map(message => {
      if (message.selected) message.read = true;
      return message;
    });
    this.setState({
      messages: newState
    });
  }

  markUnread = (e) => {
    let newState = [ ...this.state.messages ];
    newState = newState.map(message => {
      if (message.selected) message.read = false;
      return message;
    });
    this.setState({
      messages: newState
    });
  }

  applyLabel = (e) => {
    let newState = [ ...this.state.messages ];
    newState = newState.map(message => {
      if (message.selected && !message.labels.includes(e.target.value)) {
        message.labels.push(e.target.value);
      }
      return message;
    });
    this.setState({
      messages: newState
    });
  }

  removeLabel = (e) => {
    let newState = [ ...this.state.messages ];
    newState = newState.map(message => {
      if (message.selected) {
        message.labels = message.labels.filter(label => label !== e.target.value);
      }
      return message;
    });
    this.setState({
      messages: newState
    });
  }

  deleteMessage = (e) => {
    let newState = [ ...this.state.messages ];
    newState = newState.filter(message => !message.selected);
    this.setState({
      messages: newState
    });
  }

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
          onSelect={ this.selectMessage }
          onStar={ this.starMessage }
        />
      </div>
    );
  }
}

export default App;
