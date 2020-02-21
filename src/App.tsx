import React from 'react';
import './App.css';

import SideView from './components/SideView';
import Map from './components/Map';

import { Telemetry, ServicesContext } from './services';

let poll = (func: Function) => {
  func();
  setInterval(() => {
    func();
  }, 1000);
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
      this.setState({ telemetry: telemetry });
    });
  }

  render() {
    let addLog = (lvl: string, msg: string) => 
      this.setState((state: any) => {return {...state, logs: [{msg: msg, lvl: lvl}].concat(state.logs)}});
    let serviceState = {
      telemetry: this.state.telemetry,
      logs: this.state.logs,
      addLog: addLog
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
