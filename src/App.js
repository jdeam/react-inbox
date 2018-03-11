import React from 'react';
import Toolbar from './components/Toolbar';
import ComposeForm from './components/ComposeForm';
import MessageList from './components/MessageList';
import axios from 'axios';
const BaseURL = 'http://localhost:8082';

class App extends React.Component {

  state = {
    messages: [],
    composeForm: {
      display: false,
      content: {
        subject: '',
        body: ''
      }
    }
  };

  componentDidMount = async () => {
    const response = await axios.get(`${BaseURL}/api/messages`);
    const messages = response.data._embedded.messages;
    this.setState({ messages });
  };

  toggleComposeForm = () => {
    if (this.state.composeForm.display) {
      this.setState({
        composeForm: {
          display: false,
          content: {
            subject: '',
            body: ''
          }
        }
      });
    } else {
      this.setState({
        composeForm: {
          display: true,
          content: {
            subject: '',
            body: ''
          }
        }
      });
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
      const response = await axios.patch(`${BaseURL}/api/messages`, starBody);
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
    const readBody = { messageIds, command: 'read', read: true };
    const response = await axios.patch(`${BaseURL}/api/messages`, readBody);
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
    const unreadBody = { messageIds, command: 'read', read: false };
    const response = await axios.patch(`${BaseURL}/api/messages`, unreadBody);
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
    const applyBody = { messageIds, label, command: 'addLabel' };
    const response = await axios.patch(`${BaseURL}/api/messages`, applyBody);
    if (response.status === 200) {
      const newState = this.state.messages.map(message => {
        if (message.selected && !message.labels.includes(label)) message.labels.push(label);
        return message;
      });
      this.setState({ messages: newState });
    }
  };

  removeLabel = async (event) => {
    const label = event.target.value;
    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected?[ ...ids, message.id ]:ids;
    }, []);
    const removeBody = { messageIds, label, command: 'removeLabel' };
    const response = await axios.patch(`${BaseURL}/api/messages`, removeBody);
    if (response.status === 200) {
      const newState = this.state.messages.map(message => {
        if (message.selected) {
          message.labels = message.labels.filter(el => el !== label);
        }
        return message;
      });
      this.setState({ messages: newState });
    }
  };

  deleteMessage = async () => {
    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected?[ ...ids, message.id ]:ids;
    }, []);
    const deleteBody = { messageIds, command: 'delete' }
    const response = await axios.patch(`${BaseURL}/api/messages`, deleteBody);
    if (response.status === 200) {
      const newState = this.state.messages.filter(message => !messageIds.includes(message.id));
      this.setState({ messages: newState });
    }
  };

  updateSubject = (event) => {
    this.setState({
      composeForm: {
        display: true,
        content: {
          ...this.state.composeForm.content,
          subject: event.target.value
        }
      }
    });
  };

  updateBody = (event) => {
    this.setState({
      composeForm: {
        display: true,
        content: {
          ...this.state.composeForm.content,
          body: event.target.value
        }
      }
    });
  };

  sendMessage = async (event) => {
    event.preventDefault();
    const message = this.state.composeForm.content;
    if (!message.subject || !message.body) return;
    const response = await axios.post(`${BaseURL}/api/messages`, message);
    const newMessage = response.data;
    this.setState({
      messages: [ ...this.state.messages, newMessage ],
      composeForm: {
        display: false,
        content: {
          subject: '',
          body: ''
        }
      }
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
          toggleComposeForm={ this.toggleComposeForm }
          defaultValue="default"
        />
        <ComposeForm
          display={ this.state.composeForm.display }
          content={ this.state.composeForm.content }
          updateSubject={ this.updateSubject }
          updateBody={ this.updateBody }
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
