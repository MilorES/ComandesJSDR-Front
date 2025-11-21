import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const buildDate = (() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}`;
})();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, 
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(buildDate)
  }
})
