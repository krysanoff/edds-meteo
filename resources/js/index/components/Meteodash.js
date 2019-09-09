import React, { Component } from 'react'
import * as Actions from '../actions'
import meteoStore from '../stores/MeteoStore'

class Meteodash extends Component {
    state = meteoStore.initState()
    interval = document.getElementById('timeout').dataset.interval

    componentDidMount() {
        console.log('meteodash has just mounted')
        meteoStore.on('updateMeteo', this.updateState)
        setInterval(this.updateMeteo, this.interval)
    }

    componentWillUnmount() {
        console.log('meteodash will unmount')
        meteoStore.removeListener('updateMeteo', this.updateMeteo)
    }

    updateMeteo() {
        Actions.updateMeteo()
    }

    updateState = () => {
        this.setState(meteoStore.getState())
        // console.log('state update', this.state)
    }

    windDirLit = () => {
        let windDirection = ''

        // The directions is wrong because the station is not installed properly. The north must be equals 0.
        if (this.state.wind_dir <= 23 || this.state.wind_dir >= 337) {
            windDirection = 'юго-восточный';
        } else if (this.state.wind_dir > 23 && this.state.wind_dir < 67) {
            windDirection = 'южный';
        } else if (this.state.wind_dir >= 67 && this.state.wind_dir <= 113) {
            windDirection = 'юго-западный';
        } else if (this.state.wind_dir > 113 && this.state.wind_dir < 157) {
            windDirection = 'западный';
        } else if (this.state.wind_dir >= 157 && this.state.wind_dir <= 203) {
            windDirection = 'северо-западный';
        } else if (this.state.wind_dir > 203 && this.state.wind_dir < 247) {
            windDirection = 'северный';
        } else if (this.state.wind_dir >= 247 && this.state.wind_dir <= 293) {
            windDirection = 'северо-восточный';
        } else if (this.state.wind_dir > 293 && this.state.wind_dir < 337) {
            windDirection = 'восточный';
        }

        if (this.state.wind == 0) {
            windDirection = ''
        }

        return windDirection
    }

    render() {
        return (
            <section className="row d-flex justify-content-around mt-5">
                <div className="col-12 col-lg-6 col-xl-3 meteo__block">
                    <div className="meteo__basic meteo__basic_color_t">
                        <i className="wi wi-thermometer"></i>
                        <span id="Ta" className="animate" key={this.state.temperature}> {this.state.temperature.toFixed(1)}</span><i className="wi wi-degrees"></i>
                    </div>
                    <div className="meteo__title meteo__title_color_t">Температура</div>
                </div>
                <div className="col-12 col-lg-6 col-xl-3 meteo__block">
                    <div className="meteo__basic meteo__basic_color_w">
                        <i className="wi wi-windy"></i>
                        <span id="Sm" className="animate" key={this.state.wind}> {this.state.wind}</span>
                        <span className="meteo__wind-measure">м/с</span>
                        <p id="Dm" className="meteo__basic_text_sm"><span className="animate" key={this.windDirLit()}>{this.windDirLit()}</span></p>
                    </div>
                    <div className="meteo__title meteo__title_color_w">ветер</div>
                </div>
                <div className="col-12 col-lg-6 col-xl-3 meteo__block">
                    <div className="meteo__basic meteo__basic_color_p">
                        <i className="wi wi-barometer"></i>
                        <span id="Pa" className="animate" key={this.state.pressure}> {this.state.pressure}</span>
                        <p className="meteo__basic_text_sm">мм ртутного столба</p>
                    </div>
                    <div className="meteo__title meteo__title_color_p">давление</div>
                </div>
                <div className="col-12 col-lg-6 col-xl-3 meteo__block">
                    <div className="meteo__basic meteo__basic_color_h">
                        <i className="wi wi-humidity"></i>
                        <span id="Ua" className="animate" key={this.state.relative_humidity}> {this.state.relative_humidity}</span>
                    </div>
                    <div className="meteo__title meteo__title_color_h">влажность</div>
                </div>
            </section>
        )
    }
}

export default Meteodash
