import React, { useState, useEffect } from 'react';
import './Billing.css';
import { Download } from 'react-feather';

// Define the Order type
interface Order {
  date: string;
  type: string;
}

// Define the API response type
interface BillingResponse {
  orders: Order[];
  total: number;
}

const Billing: React.FC = () => {
  // Sample data as fallback
  const sampleOrders = [
    { date: 'Oct. 21, 2021', type: 'Pro Annual' },
    { date: 'Aug. 21, 2021', type: 'Pro Portfolio' },
    { date: 'July. 21, 2021', type: 'Sponsored Post' },
    { date: 'Jun. 21, 2021', type: 'Sponsored Post' },
  ];

  // State for orders, loading status, and error
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  // Get API URL from environment variables or use default
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  // Function to fetch orders from the API
  const fetchOrders = async (currentOffset: number, replace: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/billing?offset=${currentOffset}&length=10`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: BillingResponse = await response.json();
      
      // Update state with the fetched orders
      if (replace) {
        setOrders(data.orders);
      } else {
        setOrders(prevOrders => [...prevOrders, ...data.orders]);
      }
      
      setTotal(data.total);
      setHasMore(currentOffset + data.orders.length < data.total);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Using sample data instead.');
      
      // If it's the initial load, use sample data as fallback
      if (replace) {
        setOrders(sampleOrders);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders(0, true);
  }, []);

  // Handle "Load more" button click
  const handleLoadMore = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);
    fetchOrders(newOffset);
  };

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
          
          <div className="order-table-content">
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
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            {loading && (
              <div className="loading-message">
                Loading...
              </div>
            )}
          </div>
          
          {hasMore && (
            <div className="load-more">
              <button 
                className="text-btn" 
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
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