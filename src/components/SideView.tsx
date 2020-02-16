import React, { useState } from 'react';
import { Button, Grid, Header, Label, Segment, Portal, Icon } from 'semantic-ui-react'
import FlightPanel from './FlightPanel'

const SideView = () => {
  return <div className="side-bar">
    <LogView title={'Logs'} />
    <LogView title={'Warnings'} />
    <ActionButtons />
    <FlightPanels />
  </div>;
};

const FlightPanels = () => {
  return <table>
    <tr>
      <td><FlightPanel panel="horizon" /></td>
      <td><FlightPanel panel="speed" /></td>
    </tr>
    <tr>
      <td><FlightPanel panel="altitude" /></td>
      <td><FlightPanel panel="heading" /></td>
    </tr>
  </table>
}

const ActionButtons = () => {
  return <Button.Group style={{ width: '100%', padding: '10px' }}>
    <Button><Icon name='location arrow' /> Path Find</Button>
    <Button.Or />
    <Button positive><Icon name='sync' /> Refresh</Button>
  </Button.Group>;
};

const LogView = ({ title }: any) => {
  let [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <Segment.Group>
        <Segment>
          <Button
            compact
            size='small'
            floated='right'
            onClick={() => setLog(['[123:548Z] No.'].concat(log))}>
            Clear
          </Button>
          {title} <Label circular>{log.length}</Label>
        </Segment>
        <Segment secondary style={{ height: '150px', overflowY: 'scroll', paddingBottom: '0' }}>
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
