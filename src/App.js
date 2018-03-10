import React from 'react';
import Toolbar from './components/Toolbar';
import ComposeForm from './components/ComposeForm';
import MessageList from './components/MessageList';
const BaseURL = 'http://localhost:8082';

class App extends React.Component {

  state = {
    messages: [],
    fetchingMessages: true,
    displayComposeForm: false
  };

  componentDidMount = async () => {
    const messagesResponse = await fetch(`${BaseURL}/api/messages`);
    const messagesJson = await messagesResponse.json();
    this.setState({
      messages: messagesJson._embedded.messages,
      fetchingMessages: false
    });
  };

  toggleComposeForm = () => {
    if (this.state.displayComposeForm) {
      this.setState({ displayComposeForm: false });
    } else {
      this.setState({ displayComposeForm: true });
    }
  };

  selectMessage = (i) => {
    const fn = () => {
      let newState = [ ...this.state.messages ];
      if (newState[i].selected) delete newState[i].selected
      else newState[i].selected = true;
      this.setState({ messages: newState });
    };
    return fn;
  };

  starMessage = (i) => {
    const fn = async () => {
      const messageIds = [ this.state.messages[i].id ];
      const starBody = {
        messageIds,
        command: 'star',
        star: !this.state.messages[i].starred
      };
      const response = await fetch(`${BaseURL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(starBody),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      if (response.status === 200) {
        let newState = [ ...this.state.messages ];
        newState[i].starred = !newState[i].starred;
        this.setState({ messages: newState });
      }
    };
    return fn;
  };

  selectAllMessages = () => {
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
    this.setState({ messages: newState });
  };

  markRead = async () => {
    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected?[ ...ids, message.id ]:ids;
    }, []);
    const readBody = {
      messageIds,
      command: 'read',
      read: true
    };
    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(readBody),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    if (response.status === 200) {
      const newState = this.state.messages.map(message => {
        if (messageIds.includes(message.id)) message.read = true;
        return message;
      });
      this.setState({ messages: newState });
    }
  };

  markUnread = async () => {
    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected?[ ...ids, message.id ]:ids;
    }, []);
    const unreadBody = {
      messageIds,
      command: 'read',
      read: false
    };
    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(unreadBody),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    if (response.status === 200) {
      const newState = this.state.messages.map(message => {
        if (messageIds.includes(message.id)) message.read = false;
        return message;
      });
      this.setState({ messages: newState });
    }
  };

  applyLabel = async (event) => {
    const label = event.target.value;
    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected?[ ...ids, message.id ]:ids;
    }, []);
    const applyBody = {
      messageIds,
      label,
      command: 'addLabel',
    };
    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(applyBody),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    if (response.status === 200) {
      const newState = this.state.messages.map(message => {
        if (message.selected && !message.labels.includes(label)) {
          message.labels.push(label);
        }
        return message;
      });
      this.setState({
        messages: newState
      });
    }
  };

  removeLabel = async (event) => {
    const label = event.target.value;
    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected?[ ...ids, message.id ]:ids;
    }, []);
    const removeBody = {
      messageIds,
      label,
      command: 'removeLabel',
    };
    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(removeBody),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    if (response.status === 200) {
      const newState = this.state.messages.map(message => {
        if (message.selected) {
          message.labels = message.labels.filter(lab => lab !== label);
        }
        return message;
      });
      this.setState({
        messages: newState
      });
    }
  };

  deleteMessage = async () => {
    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected?[ ...ids, message.id ]:ids;
    }, []);
    const deleteBody = { messageIds, command: 'delete' }
    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(deleteBody),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    if (response.status === 200) {
      const newState = this.state.messages.filter(message => !messageIds.includes(message.id));
      this.setState({ messages: newState });
    }
  };

  sendMessage = async (message) => {
    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    const newMessage = await response.json();
    this.setState({
      messages: [ ...this.state.messages, newMessage ],
      displayComposeForm: false
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
          toggleComposeForm={ this.toggleComposeForm }
        />
        <ComposeForm
          display={ this.state.displayComposeForm }
          sendMessage={ this.sendMessage }
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
