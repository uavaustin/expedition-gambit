import React, { useState } from 'react';
import { Button, Grid, Header, Label, Segment, Portal, Icon } from 'semantic-ui-react'
import FlightPanel from './FlightPanel'

const SideView = () => {
  return <div className="side-bar">
    <SettingsButtons />
    <LogView title={'Logs'} />
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

const SettingsButtons = () => {
  return <Button.Group className="full">
    <Button icon className="no-borderrad">
      <Icon name='cogs' />
    </Button>
    <Button icon>
      <Icon name='camera retro' />
    </Button>
    <Button icon>
      <Icon name='chart bar' />
    </Button>
    <Button icon className="no-borderrad">
      <Icon name='fighter jet' />
    </Button>
  </Button.Group>;
};

const ActionButtons = () => {
  return <Button.Group style={{ width: '100%', padding: '10px' }}>
    <Button><Icon name='location arrow' />Path Find</Button>
    <Button.Or />
    <Button positive><Icon name='sync' />Refresh&nbsp;&nbsp;&nbsp;&nbsp;</Button>
  </Button.Group>;
};

const LogView = ({ title }: any) => {
  let [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <Segment.Group>
        <Segment className="no-borderrad">
          <Button
            compact
            size='small'
            floated='right'
            onClick={() => setLog(['[123:548Z] No.'].concat(log))}>
            Clear
          </Button>
          {title} &nbsp;
          <Label circular>{log.length}</Label>
          <Label color="yellow" circular>{0}</Label>
          <Label color="red" circular>{0}</Label>
        </Segment>
        <Segment secondary 
          style={{ borderRadius: '0px;', height: '350px', overflowY: 'scroll', paddingBottom: '0' }}>
          <pre style={{marginTop: '0px'}}>
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
