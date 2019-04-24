import React, { Component } from 'react'

class Clock extends Component {
    state = {
        time: new Date().toTimeString().substring(0, 8)
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
            time: new Date().toTimeString().substring(0, 8)
        })
    }

    render() {
        return (
            <span>{this.state.time}</span>
        )
    }
}

export default Clock
