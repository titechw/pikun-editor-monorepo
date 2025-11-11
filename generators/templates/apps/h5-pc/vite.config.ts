import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createBaseViteConfig } from '../../tooling/vite-react.config';
import fs from 'fs';
const dedupeDeps = fs
  .readFileSync('./dedupeDeps.txt')
  .toString()
  .replace(/\r\n/g, '\n')
  .split('\n')
  .filter((value) => value);

const baseConfig = createBaseViteConfig({ appDir: __dirname, dedupeDeps });

export default defineConfig(() => ({
  plugins: [react()],
  ...baseConfig,
  server: {
    ...baseConfig.server,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
