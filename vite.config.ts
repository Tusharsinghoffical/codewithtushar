import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createSecurityMiddleware } from './server/security-monitor.js';
/// <reference types="vitest" />

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block'
};

const securityMonitorPlugin = () => ({
  name: 'security-monitor-middleware',
  configureServer(server) {
    server.middlewares.use(createSecurityMiddleware());
  },
  configurePreviewServer(server) {
    server.middlewares.use(createSecurityMiddleware());
  }
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        headers: SECURITY_HEADERS,
        // SPA routing: all 404s serve index.html so React Router handles them
        historyApiFallback: true,
      },
      plugins: [react(), securityMonitorPlugin()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      base: '/',
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
                return 'vendor';
              }
              if (id.includes('node_modules/lucide-react')) {
                return 'icons';
              }
              if (id.includes('node_modules/fuse.js')) {
                return 'search';
              }
              if (id.includes('pages/TasqOne')) {
                return 'page-tasqone';
              }
              if (id.includes('pages/SaathiBot')) {
                return 'page-saathibot';
              }
              if (id.includes('pages/Home')) {
                return 'page-home';
              }
              if (id.includes('pages/Services')) {
                return 'page-services';
              }
              if (id.includes('pages/Projects')) {
                return 'page-projects';
              }
              if (id.includes('pages/Contact')) {
                return 'page-contact';
              }
            },
          },
        },
      },
      // Enable proper routing for production
      preview: {
        port: 3000,
        host: true,
        headers: SECURITY_HEADERS,
        // SPA routing for npm run preview
        historyApiFallback: true,
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./test/setup.ts'],
        css: false,
      }
    };
});
