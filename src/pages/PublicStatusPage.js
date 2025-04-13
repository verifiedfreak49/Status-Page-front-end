import React, { useEffect, useState } from 'react';
import { getServices, subscribeToService } from '../api/api';
import { Helmet } from 'react-helmet';

// Utility function to return a styled badge based on service status
const getStatusBadge = (status) => {
  switch (status) {
    case 'operational':
      return <span className="badge operational">Operational</span>;
    case 'degraded-performance':
      return <span className="badge degraded-performance">Degraded Performance</span>;
    case 'major-outage':
      return <span className="badge major-outage">Major Outage</span>;
    case 'maintenance':
      return <span className="badge maintenance">Maintenance</span>;
    case 'investigating':
      return <span className="badge investigating">Investigating</span>;
    case 'partial-outage':
      return <span className="badge partial-outage">Partial Outage</span>;
    case 'under-monitoring':
      return <span className="badge under-monitoring">Under Monitoring</span>;
    case 'maintenance-complete':
      return <span className="badge maintenance-complete">Maintenance Complete</span>;
    default:
      return <span className="badge">Unknown</span>;
  }
};

function PublicStatusPage() {
  // State to hold services, selected service for subscription, popup visibility, and email input
  const [services, setServices] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [email, setEmail] = useState('');

  // Fetch services on initial render
  useEffect(() => {
    getServices()
      .then((res) => {
        console.log('Fetched services:', res.data);
        setServices(res.data);
      })
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  // Open the email subscription popup for a selected service
  const openPopup = (service) => {
    setSelectedService(service);
    setShowPopup(true);
  };

  // Close the email subscription popup
  const closePopup = () => {
    setShowPopup(false);
    setEmail('');
  };

  // Handle form submission to subscribe to a service via email
  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await subscribeToService({ serviceId: selectedService._id, email });
      alert('Subscribed successfully!');
      closePopup();
    } catch (err) {
      console.error('Subscription failed:', err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="page-container">
      <Helmet>
        <title>Services Overview | Status Page</title>
      </Helmet>

      <div className="status-box">
        <h1>Status Page</h1>
        <p>Check the current status of our services below:</p>

        {/* Scrollable table of services */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Status</th>
                <th>Get Notified</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>{service.name}</td>
                  <td>
                    <div style={{ marginBottom: '0.3rem' }}>
                      {getStatusBadge(service.status)}
                    </div>
                    <small style={{ color: '#888' }}>
                      Last updated: {new Date(service.lastUpdated).toLocaleString()}
                    </small>
                  </td>
                  <td>
                    <button
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #d1d1d1',
                        borderRadius: '8px',
                        padding: '5px 12px',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => openPopup(service)}
                    >
                      <span role="img" aria-label="bell">🔔</span>
                      Notify Me
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Links to admin-related pages */}
        <div className="links">
          <a href="/admin">Admin Page</a>
          <a href="/login">Admin Login</a>
        </div>
      </div>

      {/* Subscription modal popup */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Get Notified for: <br />{selectedService.name}</h3>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="modal-buttons">
                <button type="submit">Subscribe</button>
                <button type="button" onClick={closePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicStatusPage;
