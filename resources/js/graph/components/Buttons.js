import React, { Component } from 'react'
import { updateGraph } from '../actions'

class Buttons extends Component {
    year = document.getElementById('earliestYear').dataset.year
    months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]
    years = []

    constructor(props) {
        super(props)

        let dt = new Date()
        this.currentYear = dt.getFullYear()
    }

    componentWillMount() {
        for (this.year; this.year <= this.currentYear; this.year++) {
            this.years.push(this.year)
        }
    }

    handleClick() {
        let year = document.querySelector('input[name="year"]:checked') ? document.querySelector('input[name="year"]:checked').value : this.currentYear
        let month = document.querySelector('input[name="month"]:checked') ? document.querySelector('input[name="month"]:checked').value : null
        let day = null

        console.log(year, month)

        updateGraph(year, month, day)
    }

    render() {
        return (
            <div className="card">
                <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne"
                                aria-expanded="true" aria-controls="collapseOne">
                            Collapsible Group Item #1
                        </button>
                    </h5>
                </div>

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6" key="years">
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    {this.years.map((year, index) => {
                                            return  <label className="btn btn-primary" key={"year" + index.toString()}>
                                                <input type="checkbox"
                                                       name="year" id={year.toString()}
                                                       autoComplete="off"
                                                       value={year}
                                                       defaultChecked={year === this.currentYear ? 'checked': ''}/>{year}
                                            </label>
                                        }
                                    )}
                                </div>
                            </div>
                            <div className="col-6" key="months">
                                <div className="btn-group-toggle" data-toggle="buttons">
                                    {this.months.map((month, index) => {
                                            return  <label className="btn btn-outline-secondary" key={"month" + index.toString()}>
                                                <input type="radio"
                                                       name="month"
                                                       id={month.toString()}
                                                       autoComplete="off"
                                                       value={index + 1} />{month}
                                            </label>
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <input type="submit" className="btn btn-success" value="Показать" onClick={() => this.handleClick()}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Buttons
