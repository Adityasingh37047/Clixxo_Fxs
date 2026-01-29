import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: {
    host: true, // allow access from LAN/public IP
    port: 5173, // default Vite dev port (you can change if needed)
    proxy: {
      "/api": {
        // Try HTTPS first (port 443), fallback to HTTP (port 8000) if needed
        // Change this to match your Postman working URL
        target: "https://192.168.0.71:443", // backend API server
        changeOrigin: true,
        secure: false, // Allow self-signed certificates
        timeout: 30000, // 30 second timeout
        // rewrite: (path) => path.replace(/^\/api/, ""), 
        // ^ uncomment if backend doesn't have `/api` prefix
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Vite proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying:', req.method, req.url, '→', proxyReq.path);
          });
        },
      },
    },
  },
  esbuild: {
    // Drop console and debugger statements in production builds
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));


