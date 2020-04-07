import React from 'react';

declare const FlightIndicator: any;

const PANEL_TO_FUNC: { [key: string]: any; } = {};
PANEL_TO_FUNC['horizon'] = FlightIndicator.Horizon;
PANEL_TO_FUNC['speed'] = FlightIndicator.Speed;
PANEL_TO_FUNC['altitude'] = FlightIndicator.Altitude;
PANEL_TO_FUNC['heading'] = FlightIndicator.Heading;

class FlightPanel extends React.Component<any, any> {

  instument: any;

  constructor(props: any) {
    super(props);
    this.state = {
      id: Math.random().toString(36).substring(2, 15)
    };
  }

  componentDidUpdate(prevProps: any) {
    let { panel } = this.props;
    if (panel == 'heading') {
      this.instument.update(this.props.heading || 0);
    } else if (panel == 'altitude') {
      this.instument.update(this.props.altitude || 0);
    } else if (panel == 'speed') {
      this.instument.update(this.props.speed || 0);
    } else if (panel == 'horizon') {
      this.instument.update(this.props.pitch || 0, this.props.roll || 0);
    }
  }

  componentDidMount() {
    let { panel } = this.props;
    let { id } = this.state;
    this.instument = new (PANEL_TO_FUNC[panel])({
      containerId: panel + "-container-" + id,
      onIndicatorReady: () => { }
    });
  }

  render() {
    let { panel } = this.props;
    let { id } = this.state;
    return (
      <div id={panel + "-container-" + id}></div>
    )
  }

}

export default FlightPanel;
