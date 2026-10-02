import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
/// <reference types="vitest" />

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // SPA routing: all 404s serve index.html so React Router handles them
        historyApiFallback: true,
      },
      plugins: [react()],
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
