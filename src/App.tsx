import React from 'react';
import './App.css';
import 'codemirror/lib/codemirror.css';

import SideView from './components/SideView';
import Map from './components/Map';
import CONFIG from './config';

import { Telemetry, InteropProxy, ServicesContext, ServerState } from './flight/services';
import Watcher, {LogLevel} from './flight/watcher';

let poll = (func: Function, rate: number) => {
  func();
  setInterval(() => {
    func();
  }, rate);
};

class App extends React.Component<any, any> {

  watcher: Watcher;

  constructor(props: any) {
    super(props);
    this.watcher = new Watcher();
    this.state = {
      telemetry: null,
      logs: []
    };
  }

  log(level: LogLevel, text: string) {
    this.setState((state: any) => {
      if(state.logs.length > 0 && state.logs[0].text == text) {
        state.logs[0].cnt++;
      } else {
        state.logs = [{level: level, text: text, cnt: 1}].concat(state.logs);
      }
      return state;
    });
  }

  componentDidMount() {
    this.watcher.setLogFunc(this.log.bind(this));
    poll(async () => {
      try {
        let telemetry = await Telemetry.overview();
        let mission = await InteropProxy.mission();
        let odlcs = await InteropProxy.odlcs();
        this.setState({ telemetry, mission, odlcs });
        this.watcher.feedData({ telemetry, mission, odlcs });
      } catch (err) {
        this.watcher.feedData({});
      }
    }, CONFIG.services.telemetry.rate);
  }

  render() {
    let serviceState: ServerState = {
      telemetry: this.state.telemetry,
      mission: this.state.mission,
      odlcs: this.state.odlcs,
      logs: this.state.logs
    };
    return (
      <div className="App">
        <ServicesContext.Provider value={serviceState}>
          <SideView />
          <Map />
        </ServicesContext.Provider>
      </div>
    );
  }

};

export default App;
