import React from 'react';
import SideView from './components/SideView';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <SideView />
      <div className="map" style={{backgroundColor: '#aaaaaa', width: '100%', height: window.innerHeight + 'px'}}></div>
    </div>
  );
}

export default App;
