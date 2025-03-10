import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Billing from './components/Billing';
import SubscriptionInfo from './components/SubscriptionInfo';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Billing />
        <SubscriptionInfo />
      </div>
    </div>
  );
}

export default App;
