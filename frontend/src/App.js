import React, { Component } from 'react';
import Header from './Header';
import Meteodash from './Meteodash';
import Graph from './Graph';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="app">
            <Header/>
            <Meteodash/>
            <Graph/>
        </div>
    );
  }
}

export default App;
