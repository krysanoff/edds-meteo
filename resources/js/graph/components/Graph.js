import React, { Component } from 'react'
import Buttons from './Buttons'
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
    }

    componentWillUnmount() {
        console.log('graph will unmount')
        graphStore.removeListener('updateGraph', this.updateGraph)
    }


    shouldComponentUpdate() {
        console.log('graph will be updated')
        return true
    }

    componentDidUpdate() {
        console.log('graph has updated')
    }

    updateGraph() {
        Actions.updateGraph()
    }

    updateState = () => {
        this.setState(graphStore.getState())
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
            <section key="1" className="row">
                <div className="col-9 graph">
                    <Line
                        data={graph.data}
                        options={graph.options}
                    />
                    <span id="chart"></span>
                </div>
                <div className="col-3">
                    <Buttons/>
                </div>

            </section>
        )
    }
}

export default Graph
