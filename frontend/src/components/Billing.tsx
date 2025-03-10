import React from 'react';
import './Billing.css';
import { Download } from 'react-feather';

const Billing: React.FC = () => {
  const orders = [
    { date: 'Oct. 21, 2021', type: 'Pro Annual' },
    { date: 'Aug. 21, 2021', type: 'Pro Portfolio' },
    { date: 'July. 21, 2021', type: 'Sponsored Post' },
    { date: 'Jun. 21, 2021', type: 'Sponsored Post' },
  ];

  return (
    <div className="billing-container">
      <h2>Billing</h2>
      
      <div className="section order-history">
        <div className="section-header">
          <h3>Order History</h3>
          <p>Manage billing information and view receipts</p>
        </div>
        
        <div className="order-table">
          <div className="table-header">
            <span>Date</span>
            <span>Type</span>
            <span>Receipt</span>
          </div>
          
          {orders.map((order, index) => (
            <div className="table-row" key={index}>
              <span className="date">{order.date}</span>
              <span className="type">{order.type}</span>
              <div className="receipt-cell">
                <button className="download-btn">
                  <Download size={14} style={{ marginRight: '5px' }} />
                  Download
                </button>
              </div>
            </div>
          ))}
          
          <div className="load-more">
            <button className="text-btn">Load more</button>
          </div>
        </div>
      </div>
      
      <div className="section payment-method">
        <div className="section-header">
          <h3>Payment Method</h3>
          <p>Manage billing information and view receipts</p>
        </div>
        
        <div className="payment-card">
          <div className="card-logo">
            <span className="visa-logo">VISA</span>
          </div>
          <div className="card-info">
            <span>Visa ending in 2255</span>
          </div>
          <button className="remove-btn">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default Billing; 