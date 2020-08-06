import React, { Component } from 'react';
import './App.scss';
import Nav from './components/navbar/Nav';
import Home from './components/home/Home';

class App extends Component {
  constructor (props) {
    super(props)
  
    this.state = {

    }
  }

  render () {
    return (
      <div className="app">
        <Nav />
        <Home />
      </div>
    );
  }
  
}

export default App;
