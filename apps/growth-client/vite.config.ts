import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createBaseViteConfig } from '../../tooling/vite-react.config';
import path from 'path';
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
  resolve: {
    ...baseConfig.resolve,
    alias: [
      ...(baseConfig.resolve?.alias || []),
      {
        find: '@pikun/tools',
        replacement: path.resolve(__dirname, '../../features/jarvis-tools/src/index.ts'),
      },
    ],
  },
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
