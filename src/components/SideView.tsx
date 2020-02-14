import React, { useState } from 'react';
import { Button, Grid, Header, Label, Segment, Portal, Icon } from 'semantic-ui-react'

declare const FlightIndicator: any;
FlightIndicator.setOptions({
  assets: "/pfd/"
});

setTimeout(() => {
  var horizon = new FlightIndicator.Horizon({
    containerId: "horizon-container",
    onIndicatorReady: () => {
    }
  });
}, 1000);

const SideView = () => {
  return <div className="sidebar">
    <LogView />
    <LogView />
    <Button.Group style={{ width: '100%' }}>
      <Button><Icon name='location arrow' /> Path Find</Button>
      <Button.Or />
      <Button positive><Icon name='sync' /> Refresh</Button>
    </Button.Group>
    <div><div id="horizon-container"></div></div>
  </div>;
};

const LogView = () => {
  let [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <Segment.Group>
        <Segment>
          <Button
            compact
            size='small'
            floated='right'
            onClick={() => setLog(log.concat(['[123:548Z] No.']))}>
            Clear
              </Button>
              Event Log <Label circular>{log.length}</Label>
        </Segment>
        <Segment secondary style={{ maxHeight: '150px', overflowY: 'scroll', paddingBottom: '0' }}>
          <pre>
            {log.map((e, i) => (
              <div key={i}>{e}</div>
            ))}
          </pre>
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default SideView;
