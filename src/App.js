import React from 'react';
import Toolbar from './components/Toolbar';
import ComposeForm from './components/ComposeForm';
import MessageList from './components/MessageList';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <div className="container">
      <Toolbar />
      <Route path="/compose" component={ ComposeForm } />
      <MessageList />
    </div>
  </Router>
);

export default App;
