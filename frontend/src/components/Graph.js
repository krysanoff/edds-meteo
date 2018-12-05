import React, { Component } from 'react'
import graphStore from '../stores/GraphStore'
import * as Actions from '../actions'


class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = graphStore.initState()
    }

    componentDidMount() {
        graphStore.on('updateGraph', this.updateState)
        setInterval(this.updateGraph, 5000)
    }

    componentWillUnmount() {
        graphStore.removeListener('updateGraph')
    }

    timeToFullHour() {
        const d = new Date()
        const h = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() + 1, 2, 0, 0)
        return (h - d)
    }

    updateGraph() {
        Actions.updateGraph()
    }

    updateState = () => {
        this.setState(graphStore.getState)
    }

    render() {
        return(
            <section key="1" className="row d-flex flex-wrap justify-content-around align-items-center">
                <div className="col-sm-11 col-lg-6 graph">
                    <canvas id="canvas"></canvas>
                    <span id="chart"></span>
                </div>
                <div className="col d-none d-none d-lg-block meteo__block">
                    <div className="meteo__basic meteo__basic_color_ts">
                        <div className="clock clock__ts"></div>
                    </div>
                    <div className="meteo__title meteo__title_color_ts">Тарко-Сале</div>
                </div>
            </section>
        )
    }
}

export default Graph