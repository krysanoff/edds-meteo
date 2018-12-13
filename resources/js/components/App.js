import React from 'react'
import Header from './Header'
import MeteoDash from './Meteodash'
import Graph from './Graph'
import '../assets/css/bootstrap.min.css'
import '../assets/css/style.css'
import '../assets/css/weather-icons.min.css'

const App = () => (
    <div className="app">
        <Header/>
        <MeteoDash/>
        <Graph/>
    </div>
)

export default App
