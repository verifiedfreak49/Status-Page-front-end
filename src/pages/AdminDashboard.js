import React, { useEffect, useState } from "react";
import { updateService, getServices } from '../api/api';
import { useNavigate } from "react-router-dom";
import { createService } from "../api/api";
import { deleteService as deleteServiceAPI } from '../api/api';
import { FaTrash } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

function AdminDashboard() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceStatus, setNewServiceStatus] = useState('operational');

  // Fetch the list of services from the backend when the component mounts
  useEffect(() => {
    getServices()
      .then((res) => {
        console.log("Fetched services:", res.data);
        setServices(res.data);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Handle changing the status of an existing service
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateService(id, { status: newStatus });

      const updated = services.map((s) =>
        s._id === id ? { ...s, status: newStatus } : s
      );
      setServices(updated);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Handle form submission to create a new service
  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      const newService = await createService({
        name: newServiceName,
        status: newServiceStatus,
      });
      setServices([...services, newService.data]);
      setNewServiceName('');
      setNewServiceStatus('operational');
    } catch (err) {
      console.error('Error creating service:', err);
    }
  };

  // Handle deleting a service
  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      await deleteServiceAPI(id);
      setServices(services.filter((s) => s._id !== id));
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  // Handle admin logout and redirect to public page
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div className="container">
      <Helmet>
        <title>Admin Dashboard | Status Page</title>
      </Helmet>

      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>

      <h2>Create New Service</h2>
      <form onSubmit={handleCreateService}>
        <input
          type="text"
          value={newServiceName}
          onChange={(e) => setNewServiceName(e.target.value)}
          placeholder="Service Name"
          required
        />
        <select
          value={newServiceStatus}
          onChange={(e) => setNewServiceStatus(e.target.value)}
        >
          <option value="operational">Operational</option>
          <option value="degraded-performance">Degraded Performance</option>
          <option value="major-outage">Major Outage</option>
          <option value="maintenance">Maintenance</option>
          <option value="investigating">Investigating</option>
          <option value="partial-outage">Partial Outage</option>
          <option value="under-monitoring">Under Monitoring</option>
          <option value="maintenance-complete">Maintenance Complete</option>
        </select>
        <button type="submit">Add Service</button>
      </form>

      <p>Update service statuses below:</p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Status</th>
              <th>Change</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td>{service.name}</td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <span className={`badge ${service.status.replace(/\s+/g, '-').toLowerCase()}`}>
                      {service.status}
                    </span>
                    <small style={{ color: '#888' }}>
                      Last updated: {new Date(service.lastUpdated).toLocaleString()}
                    </small>
                  </div>
                </td>
                <td>
                  <select
                    value={service.status}
                    onChange={(e) => handleStatusChange(service._id, e.target.value)}
                  >
                    <option value="operational">Operational</option>
                    <option value="degraded-performance">Degraded Performance</option>
                    <option value="major-outage">Major Outage</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="investigating">Investigating</option>
                    <option value="partial-outage">Partial Outage</option>
                    <option value="under-monitoring">Under Monitoring</option>
                    <option value="maintenance-complete">Maintenance Complete</option>
                  </select>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteService(service._id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: "20px" }}>
        <a href="/">← Back to Public Page</a>
      </p>
    </div>
  );
}

export default AdminDashboard;
