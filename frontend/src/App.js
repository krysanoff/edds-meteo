import React, { Component } from 'react'
import Header from './Header'
import Meteodash from './Meteodash'
import Graph from './Graph'
import './assets/css/bootstrap.min.css'
import './assets/css/style.css'
import './assets/css/weather-icons.min.css'

class App extends Component {
  render() {
    return (
        <div className="app">
            <Header/>
            <Meteodash/>
            <Graph/>
        </div>
    )
  }
}

export default App
