import React, { Component } from 'react'
import graphStore from '../stores/GraphStore'
import * as Actions from '../actions'
import { Line } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'


class Graph extends Component {
    state = graphStore.initState()

    componentDidMount() {
        graphStore.on('updateGraph', this.updateState)
        setInterval(this.updateGraph, 15000)
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
        this.setState(graphStore.getState())
    }

    render() {
       const data = {
            labels: this.state.graph.map(i => {
                return i.created_at
            }),
            datasets: [{
                label: 'Температура',
                backgroundColor: 'orangered',
                borderColor: 'orangered',
                data: [-10, -15, -14],
                fill: false,
            },
                {
                    label: 'Ветер',
                    backgroundColor: 'skyblue',
                    borderColor: 'skyblue',
                    data: [1, 2, 0],
                    fill: false,
                }]
        }

        const options = {
            responsive: true,
            title: {
                display: true,
                text: 'ПОГОДНЫЙ ГРАФИК',
                fontSize: 32,
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'ВРЕМЯ',
                        fontSize: 32,
                        fontFamily: 'Roboto',
                        backgroundColor: 'skyblue',
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'ЗНАЧЕНИЕ',
                        fontSize: 32,
                        fontFamily: 'Roboto'
                    }
                }]
            }
        }

        return(
            <section key="1" className="row d-flex flex-wrap justify-content-around align-items-center">
                <div className="col-sm-11 col-lg-6 graph">
                    <Line
                        data={data}
                        options={options}
                    />
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