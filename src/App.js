import React from 'react';
import './App.css';
import Telemetry from './components/Telemetry';
import Map from './components/Map';


function App() {
  return (
    <div className="App">
      <Map />
      <Telemetry />
    </div>
  );
}

export default App;
