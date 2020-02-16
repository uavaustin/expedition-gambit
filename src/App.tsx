import React from 'react';
import SideView from './components/SideView';
import './App.css';
import Map from './components/Map';

const App = () => {
  return (
    <div className="App">
      <SideView />
      <Map></Map>
    </div>
  );
}

export default App;
