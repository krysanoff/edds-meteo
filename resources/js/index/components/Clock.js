import React, { Component } from 'react'

class Clock extends Component {
    state = {
        time: this.getDate()
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    tick() {
        this.setState({
            time: this.getDate()
        })
    }

    getDate() {
        return new Date().toLocaleTimeString('ru-RU', {timeZone: 'Asia/Yekaterinburg'}).substring(0, 8)
    }

    render() {
        return (
            <span>{this.state.time}</span>
        )
    }
}

export default Clock
