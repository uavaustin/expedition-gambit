import React from 'react';

declare const FlightIndicator: any;

const PANEL_TO_FUNC: { [key: string]: any; } = {};
PANEL_TO_FUNC['horizon'] = FlightIndicator.Horizon;
PANEL_TO_FUNC['speed'] = FlightIndicator.Speed;
PANEL_TO_FUNC['altitude'] = FlightIndicator.Altitude;
PANEL_TO_FUNC['heading'] = FlightIndicator.Heading;

class FlightPanel extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: Math.random().toString(36).substring(2, 15)
    };
  }

  componentDidMount() {
    let { panel } = this.props;
    let { id } = this.state;
    let pan = new (PANEL_TO_FUNC[panel])({
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
