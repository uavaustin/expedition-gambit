import React from 'react';
import './App.css';
import 'codemirror/lib/codemirror.css';

import SideView from './components/SideView';
import Map from './components/Map';
import CONFIG from './config';

import { Telemetry, InteropProxy, ServicesContext } from './services';

let poll = (func: Function, rate: number) => {
  func();
  setInterval(() => {
    func();
  }, rate);
};

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      telemetry: null,
      logs: []
    };
  }

  log(level: 'warn' | 'error' | 'info ', text: string) {
    console.log(text);
    this.setState((state: any) => {
      state.logs = state.logs.concat([{level: level, text: text}]);
      return state;
    });
  }

  componentDidMount() {
    poll(async () => {
      try {
        let telemetry = await Telemetry.overview();
        let mission = await InteropProxy.mission();
        let odlcs = await InteropProxy.odlcs();
        this.setState({ telemetry, mission, odlcs });
      } catch (err) {
        this.log('error', 'Failed to fetch telemetry.');
      }
    }, CONFIG.services.telemetry.rate);
  }

  render() {
    let serviceState = {
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
