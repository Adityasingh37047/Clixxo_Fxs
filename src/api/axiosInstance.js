import axios from "axios";

function getBaseURL() {
  const url = new URL(window.location.origin);
  const ip = url.hostname;
  const port = url.port || (url.protocol === "https:" ? "443" : "80");
  const isLocalhost =
    ip === "localhost" || ip === "127.0.0.1" || ip === "0.0.0.0";
  
  // Check if we're running on Vite dev server (port 5173)
  const isViteDevServer = port === "5173" || port === "";

  if (isLocalhost || isViteDevServer) {
    // In development, use Vite proxy (relative URL)
    // Vite proxy will forward /api requests to the backend
    return "/api";
  } else {
    // Production → use whatever URL the site is running on
    console.log('Production → use whatever URL the site is running on', ip, port);
    return `${url.protocol}//${ip}:${port}/api`;
  }
}

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to determine if current user is read-only (from localStorage only – no React hooks here)
function isCurrentUserReadOnly() {
  try {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) return false;
    const user = JSON.parse(userRaw);
    if (!user) return false;

    // Admin should always be allowed to write
    if (user.username && String(user.username).toLowerCase() === 'admin') {
      return false;
    }

    const perm = (user.permission || user.role || '').toString().toLowerCase();
    if (!perm) return false;

    return (
      perm === 'read-only' ||
      perm === 'read' ||
      perm.includes('read-only')
    );
  } catch {
    return false;
  }
}

// Request interceptor → add auth token and enforce read-only mode
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Block all non-GET requests for read-only users,
    // but allow safe informational commands like /linuxcmd (used for navbar time)
    const method = (config.method || 'get').toLowerCase();
    const url = config.url || '';

    const isLinuxCmd =
      url.endsWith('/linuxcmd') || url === '/linuxcmd';

    if (method !== 'get' && isCurrentUserReadOnly() && !isLinuxCmd) {
      // Instead of sending the request, reject immediately
      return Promise.reject(
        new Error('You are in read-only mode and cannot perform changes.')
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
