import React from 'react';
import './SubscriptionInfo.css';

const SubscriptionInfo: React.FC = () => {
  return (
    <div className="subscription-info">
      <div className="subscription-content">
        <h3>Your plan</h3>
        <h2>Pro Annual</h2>
        <p>Renews on Nov. 2021</p>
        <button className="cancel-btn">Cancel subscription</button>
      </div>
    </div>
  );
};

export default SubscriptionInfo; 