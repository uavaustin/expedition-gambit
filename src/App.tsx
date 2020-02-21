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

class App extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      telemetry: null
    };
  }

  componentDidMount() {
    poll(async () => {
      let telemetry = await Telemetry.overview();
      this.setState({ telemetry: telemetry });
    });
  }

  render() {
    return (
      <div className="App">
        <ServicesContext.Provider value={this.state}>
          <SideView />
          <Map />
        </ServicesContext.Provider>
      </div>
    );
  }

};

export default App;
