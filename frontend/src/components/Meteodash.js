import React, { Component } from 'react'
import * as Actions from '../actions'
import meteoStore from '../stores/MeteoStore'

class Meteodash extends Component {
    constructor(props) {
        super(props)
        this.state = meteoStore.initState()
    }
    componentDidMount() {
        meteoStore.on('updateMeteo', this.updateState)
        setInterval(this.updateMeteo, 10000)
    }

    componentWillUnmount() {
        meteoStore.removeListener('updateMeteo', this.updateMeteo)
    }

    updateMeteo() {
        Actions.updateMeteo()
    }

    updateState = () => {
        this.setState(meteoStore.getState())
        console.log('state update', this.state)
    }

    render() {
        return (
            <section className="row d-flex flex-wrap justify-content-around">
                <div className="col meteo__block">
                    <div className="meteo__basic meteo__basic_color_t">
                        <i className="wi wi-thermometer"></i>
                        <span id="Ta"> {this.state.temperature}</span><i className="wi wi-degrees"></i>
                    </div>
                    <div className="meteo__title meteo__title_color_t">Температура</div>
                </div>
                <div className="col meteo__block">
                    <div className="meteo__basic meteo__basic_color_w">
                        <i className="wi wi-windy"></i>
                        <span id="Sm"> {this.state.wind}</span>
                        <span className="meteo__wind-measure">м/с</span>
                        <p id="Dm" className="meteo__basic_text_sm">южный</p>
                    </div>
                    <div className="meteo__title meteo__title_color_w">ветер</div>
                </div>
                <div className="col meteo__block">
                    <div className="meteo__basic meteo__basic_color_p">
                        <i className="wi wi-barometer"></i>
                        <span id="Pa"> {this.state.pressure}</span>
                        <p className="meteo__basic_text_sm">мм ртутного столба</p>
                    </div>
                    <div className="meteo__title meteo__title_color_p">давление</div>
                </div>
                <div className="col meteo__block">
                    <div className="meteo__basic meteo__basic_color_h">
                        <i className="wi wi-humidity"></i>
                        <span id="Ua"> {this.state.relative_humidity}</span>
                    </div>
                    <div className="meteo__title meteo__title_color_h">влажность</div>
                </div>
            </section>
        )
    }
}

export default Meteodash