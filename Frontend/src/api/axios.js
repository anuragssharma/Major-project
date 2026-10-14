import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://major-project-backend-vt6r.onrender.com/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('edonation_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;