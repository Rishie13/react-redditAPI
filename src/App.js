import React, { Component } from 'react';
import './App.css';
import Reddit from './Reddit'; // connect to the Reddit component

// new component, using ES6 reforms
class App extends Component {
 
  render() {
    return (
      // embed the Reddit component 
      <div className="App">
          <div className="App-header">Reddit Feed</div>
          
          <Reddit /> 
      </div>
    );
  }
}

export default App;
