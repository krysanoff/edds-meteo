import React from 'react'
import Header from './Header'
import Meteodash from '../containers/Meteodash'
import Graph from './Graph'
import '../assets/css/bootstrap.min.css'
import '../assets/css/style.css'
import '../assets/css/weather-icons.min.css'

const App = () => (
    <div className="app">
        <Header/>
        <Meteodash/>
        <Graph/>
    </div>
)

export default App
