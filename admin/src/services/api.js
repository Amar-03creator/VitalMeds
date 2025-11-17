import axios from 'axios';

// Get base URL from env, fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🌐 API Base URL:', API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('📤 Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error.message);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, '- Items:', response.data?.length || 1);
    return response;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('❌ NETWORK ERROR');
      console.error('   Backend not reachable at:', API_BASE_URL);
      console.error('   Fix: Run "npm start" in server folder');
    } else if (error.response) {
      console.error('❌ Server error:', error.response.status, error.response.data?.message);
    } else if (error.request) {
      console.error('❌ No response from server');
    } else {
      console.error('❌ Error:', error.message);
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminName');
      localStorage.removeItem('adminEmail');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
