import React from 'react'

const Meteodash = () => (
    <section className="row d-flex flex-wrap justify-content-around">
        <div className="col meteo__block">
            <div className="meteo__basic meteo__basic_color_t">
                <i className="wi wi-thermometer"></i>
                <span id="Ta">10</span><i className="wi wi-degrees"></i>
            </div>
            <div className="meteo__title meteo__title_color_t">Температура</div>
        </div>
        <div className="col meteo__block">
            <div className="meteo__basic meteo__basic_color_w">
                <i className="wi wi-windy"></i>
                <span id="Sm">3</span>
                <span className="meteo__wind-measure">м/с</span>
                <p id="Dm" className="meteo__basic_text_sm">южный</p>
            </div>
            <div className="meteo__title meteo__title_color_w">ветер</div>
        </div>
        <div className="col meteo__block">
            <div className="meteo__basic meteo__basic_color_p">
                <i className="wi wi-barometer"></i>
                <span id="Pa">760</span>
                <p className="meteo__basic_text_sm">мм ртутного столба</p>
            </div>
            <div className="meteo__title meteo__title_color_p">давление</div>
        </div>
        <div className="col meteo__block">
            <div className="meteo__basic meteo__basic_color_h">
                <i className="wi wi-humidity"></i>
                <span id="Ua">80</span>
            </div>
            <div className="meteo__title meteo__title_color_h">влажность</div>
        </div>
    </section>
)

export default Meteodash