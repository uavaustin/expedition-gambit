import React, { useState } from 'react';
import { Button, Label, Segment, Icon, Progress } from 'semantic-ui-react'
import FlightPanel from './FlightPanel'
import { ServicesContext } from '../services';

import SettingsModal from './SettingsModal';

const SideView = () => {
  let [viewConfig, setViewConfig] = useState(false);
  let optionClicked = (optName: string) => {
    if (optName == 'settings') {
      setViewConfig(true);
    }
  };
  return <div className="side-bar">
    <OptionsButtons onClick={(opt: string) => optionClicked(opt)} />
    <LogView title={'Logs'} />
    <ActionButtons />
    <MiscIndicators />
    <FlightPanels />
    <SettingsModal visable={viewConfig} setVisable={(v: boolean) => setViewConfig(v)} />
  </div>;
};

const MiscIndicators = () => {
  return (<ServicesContext.Consumer>
    {({ telemetry }: any) =>
      (<div>
        <Progress className='battery-slider' percent={telemetry?.battery.percentage} autoSuccess progress />
      </div>)}
  </ServicesContext.Consumer>);
};

const FlightPanels = () => {
  return (
    <ServicesContext.Consumer>
      {({ telemetry }: any) =>
        (<table>
          <tr>
            <td><FlightPanel pitch={telemetry?.rot.pitch}
              roll={telemetry?.rot.roll}
              panel="horizon" /></td>
            <td><FlightPanel speed={telemetry?.speed.airspeed} panel="speed" /></td>
          </tr>
          <tr>
            <td><FlightPanel altitude={telemetry?.alt.msl} panel="altitude" /></td>
            <td><FlightPanel heading={telemetry?.rot.yaw} panel="heading" /></td>
          </tr>
        </table>)}
    </ServicesContext.Consumer>);
};

const OptionsButtons = ({ onClick }: any) => {
  return <Button.Group className="full">
    <Button icon className="no-borderrad" onClick={() => onClick('settings')}>
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
  let cntLogType = (logs: any[], type: string) => logs.reduce((acc: number, log: any) => acc + (log.level == type ? 1 : 0), 0);
  return (<ServicesContext.Consumer>
    {({ logs }: any) =>
      (<div>
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
            <Label circular>{cntLogType(logs, 'info')}</Label>
            <Label color="yellow" circular>{cntLogType(logs, 'warn')}</Label>
            <Label color="red" circular>{cntLogType(logs, 'error')}</Label>
          </Segment>
          <Segment secondary
            style={{ borderRadius: '0px;', height: '300px', overflowY: 'scroll', paddingBottom: '0' }}>
            <pre style={{ marginTop: '0px' }}>
              {logs.map((e: any, i: number) => (
                <div key={i}>[{e.level.toUpperCase()}] {e.text}</div>
              ))}
            </pre>
          </Segment>
        </Segment.Group>
      </div>)}
  </ServicesContext.Consumer>
  );
};

export default SideView;
