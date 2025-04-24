// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy any request starting with /graphql to LeetCode’s GraphQL endpoint
      '/graphql': {
        target: 'https://leetcode.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
      },
    },
  },
});
