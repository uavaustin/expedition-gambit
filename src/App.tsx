import React from 'react';
import './App.css';

import SideView from './components/SideView';
import Map from './components/Map';

import { Telemetry, InteropProxy, ServicesContext } from './services';

let poll = (func: Function) => {
  func();
  setInterval(() => {
    func();
  }, 10000);
};

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      telemetry: null,
      logs: []
    };
  }

  componentDidMount() {
    poll(async () => {
      let telemetry = await Telemetry.overview();
      let mission = await InteropProxy.mission();
      this.setState({ telemetry, mission });
    });
  }

  render() {
    let serviceState = {
      telemetry: this.state.telemetry,
      mission: this.state.mission,
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
