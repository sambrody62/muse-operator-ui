import React, { useState } from 'react';
import './App.css';
import IntegratedApp from './IntegratedApp';
import DemoApp from './DemoApp';

function App() {
  // Check if we're in demo mode based on URL parameter
  const isDemo = window.location.search.includes('demo=true') || window.location.pathname.includes('demo');

  return (
    <div className="App">
      {isDemo ? <DemoApp /> : <IntegratedApp />}
    </div>
  );
}

export default App;