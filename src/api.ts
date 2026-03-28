import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://180.235.121.253:8125";

const API = axios.create({
  baseURL: BASE_URL,
});


// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log('[API Interceptor] Token found:', !!token);

  if (token) {
    if (!config.headers) config.headers = {} as any;

    // Set both ways to be sure
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Authorization'] = `Bearer ${token}`;

    if (config.headers.set && typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// On 401 (unauthorized), dispatch a global event so AuthContext can properly log out
// and clear BOTH localStorage AND React state (window.location.href alone doesn't clear React state)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Dispatch event — AuthContext listens and calls logout() which clears everything
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(error);
  }
);

export default API;
