import React, { Component } from 'react';

import {CommentsSection} from './components/CommentsSection/CommentsSection';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <CommentsSection />
      </div>
    );
  }
}

export default App;
