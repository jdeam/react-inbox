import React from 'react';
import Toolbar from './components/Toolbar';
import ComposeForm from './components/ComposeForm';
import MessageList from './components/MessageList';

const App = () => (
  <div className="container">
    <Toolbar />
    <ComposeForm />
    <MessageList />
  </div>
);

export default App;
