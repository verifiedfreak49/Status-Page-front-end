import axios from 'axios';

const API = axios.create({
  baseURL: 'https://status-page-back-end.onrender.com/api',
});

export const getServices = () => API.get('/services');
export const createService = (data) => API.post('/services', data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);
export const subscribeToService = (data) => API.post('/services/subscribe', data);
