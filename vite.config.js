import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    /* Pull React + ReactDOM into their own chunk so the vendor bundle
       is cached separately from app code — when we deploy, only the
       smaller app chunk needs re-downloading. */
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) return 'react';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});
