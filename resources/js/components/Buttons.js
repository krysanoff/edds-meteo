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
            <div className="col-4">
                <div className="row">
                    <div className="col-6">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            {this.years.map((year, index) => {
                                    return  <label className="btn btn-outline-primary">
                                                <input type="radio"
                                                       name="year" id={year.toString()}
                                                       key={"year" + index.toString()}
                                                       autoComplete="off"
                                                       value={year} />{year}
                                            </label>
                                }
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="btn-group-toggle" data-toggle="buttons">
                            {this.months.map((month, index) => {
                                    return  <label className="btn btn-outline-secondary">
                                                <input type="radio"
                                                       name="month"
                                                       id={month.toString()}
                                                       key={"month" + index.toString()}
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
        )
    }
}

export default Buttons
