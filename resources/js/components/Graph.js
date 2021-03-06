import React, { Component } from 'react'
import Clock from './Clock'
import graphStore from '../stores/GraphStore'
import * as Actions from '../actions'
import { Line, defaults } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'


class Graph extends Component {
    state = graphStore.initState()
    intervalId = 0;

    componentDidMount() {
        console.log('graph has just mounted')
        graphStore.on('updateGraph', this.updateState)
        this.setTimeToNextUpdate()
        console.log(this.timeToFullHour())
    }

    componentWillUnmount() {
        console.log('graph will unmount')
        graphStore.removeListener('updateGraph', this.updateGraph)
    }


    shouldComponentUpdate() {
        console.log('graph will be updated')
        clearInterval(this.intervalId)
        return true
    }

    componentDidUpdate() {
        console.log('graph has updated')
        this.setTimeToNextUpdate()
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

    setTimeToNextUpdate() {
        this.intervalId = setInterval(this.updateGraph, this.timeToFullHour())
    }

    render() {
        defaults.global.defaultFontColor = 'ghostwhite';
        let graph = {
            data: {
                labels: this.state.time,
                datasets: [{
                    label: 'Температура',
                    backgroundColor: 'orangered',
                    borderColor: 'orangered',
                    data: this.state.temperature,
                    fill: false,
                },
                    {
                        label: 'Ветер',
                        backgroundColor: 'skyblue',
                        borderColor: 'skyblue',
                        data: this.state.wind,
                        fill: false,
                    }]
            },
            options: {
                responsive: true,
                defaultFontColor: 'white',
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
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.5)'
                        },
                        scaleLabel: {
                            display: true,
                            gridLines: {
                                color: 'rgba(0, 0, 0, 0.5)',
                            },
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
        }

       return(
            <section key="1" className="row d-flex flex-wrap justify-content-around align-items-center mb-4">
                <div className="col-sm-11 col-lg-6 graph">
                    <Line
                        data={graph.data}
                        options={graph.options}
                    />
                    <span id="chart"></span>
                </div>
                <div className="col d-none d-none d-lg-block meteo__block">
                    <div className="meteo__basic meteo__basic_color_ts">
                        <div className="clock clock__ts">
                            <Clock />
                        </div>
                    </div>
                    <div className="meteo__title meteo__title_color_ts">Тарко-Сале</div>
                </div>
            </section>
        )
    }
}

export default Graph
