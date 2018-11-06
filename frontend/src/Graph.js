import React, { Component } from 'react'

class Graph extends Component {
    render() {
        return (
            <section key="1" className="row d-flex flex-wrap justify-content-around align-items-center">
                <div className="col-sm-11 col-lg-6 graph">
                    <canvas id="canvas"></canvas>
                    <span id="chart" data-chart='<?php echo $chart; ?>'></span>
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