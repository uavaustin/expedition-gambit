import React from 'react';
import './App.css';

import SideView from './components/SideView';
import Map from './components/Map';

const App = () => {
  return (
    <div className="App">
      <SideView />
      <Map />
    </div>
  );
};

export default App;
