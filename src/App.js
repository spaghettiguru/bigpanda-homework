import React, { Component } from 'react';

import {CommentsSection} from './components/CommentsSection/CommentsSection';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CommentsSection />
      </div>
    );
  }
}

export default App;
