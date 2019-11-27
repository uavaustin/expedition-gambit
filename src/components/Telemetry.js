import React, { Component } from 'react';

class Telemetry extends Component {
    state = {
        time: 0,
        pos: {},
        rot: {},
        alt: {},
        vel: {},
        speed: {},
        battery: 100
    }

    componentDidMount() {
        this.loadData();
        setInterval(this.loadData.bind(this), 1000);
    }

    render() {
        return (
            <div>
                <div className="telemetry-entry">
                    <span>Time: </span>
                </div>
                <div className="telemetry-entry">
                    <span>span: </span>
                </div>
                <div className="telemetry-entry">
                    <span>Rotation: </span>
                </div>
                <div className="telemetry-entry">
                    <span>Altitude: </span>
                </div>
                <div className="telemetry-entry">
                    <span>Velocity: </span>
                </div>
                <div className="telemetry-entry">
                    <span>Speed: </span>
                </div>
                <div className="telemetry-entry">
                    <span>Battery: </span>
                    <span className="green">{this.state.battery}%</span>
                </div>
            </div>
        )
    }

    loadData() {
        this.setState({ battery: this.state.battery - 1 });
    }
}

export default Telemetry;