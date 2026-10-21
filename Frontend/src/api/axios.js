import axios from 'axios';

// Resolve backend API URL from Vite environment or default to local port 5000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('edonation_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle auth errors and suspensions
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle suspended account (403)
      if (status === 403 && data?.message?.toLowerCase().includes('suspended')) {
        alert(data.message || 'Your account has been suspended.');
        localStorage.removeItem('edonation_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Handle expired or invalid session token (401)
      if (status === 401 && !window.location.pathname.includes('/login')) {
        localStorage.removeItem('edonation_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;