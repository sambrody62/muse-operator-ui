import React, { useState } from 'react';
import './App.css';
import IntegratedApp from './IntegratedApp';
import DemoApp from './DemoApp';

function App() {
  // Always show demo for now
  const isDemo = true;

  return (
    <div className="App">
      {isDemo ? <DemoApp /> : <IntegratedApp />}
    </div>
  );
}

export default App;