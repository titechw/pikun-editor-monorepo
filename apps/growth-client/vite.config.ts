import { defineConfig, Plugin } from 'vite';
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

/**
 * 路径式多入口插件
 * 让 /admin 和 /test 路径能够正确加载对应的 HTML 文件（支持无后缀访问）
 */
function pathBasedEntryPlugin(): Plugin {
  return {
    name: 'path-based-entry',
    configureServer(server) {
      return () => {
        // 添加中间件处理路径重写（支持无后缀访问）
        // 例如：/admin 或 /admin/xxx -> /admin.html
        //      /test 或 /test/xxx -> /test.html
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';
          
          // 跳过静态资源（JS、CSS、图片、字体、API 等）
          const isStaticResource = 
            (url.includes('.') && !url.endsWith('.html') && !url.endsWith('/')) ||
            url.startsWith('/@') ||
            url.startsWith('/node_modules') ||
            url.startsWith('/src') ||
            url.startsWith('/api') ||
            url.startsWith('/favicon');
          
          if (isStaticResource) {
            return next();
          }
          
          // 处理 /admin 路径及其子路径 -> /admin.html
          if (url === '/admin' || url === '/admin/' || url.startsWith('/admin/')) {
              req.url = '/admin.html';
          }
          // 处理 /test 路径及其子路径 -> /test.html
          else if (url === '/test' || url === '/test/' || url.startsWith('/test/')) {
              req.url = '/test.html';
          }
          
          next();
        });
      };
    },
  };
}

export default defineConfig(() => {
  const port = Number(process.env.APP_PORT || 5174);
  
  return {
    appType: 'mpa' as const, // 启用多页应用模式
    plugins: [
      react(),
      pathBasedEntryPlugin(), // 必须在 react() 之后，以便在服务器配置完成后修改中间件
    ],
  ...baseConfig,
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        admin: path.resolve(__dirname, 'admin.html'),
        test: path.resolve(__dirname, 'test.html'),
      },
    },
  },
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
      port,
      // 允许 Vite 访问项目根目录下的 HTML 文件（MPA 模式需要）
      fs: {
        ...baseConfig.server?.fs,
        allow: [
          ...(baseConfig.server?.fs?.allow || []),
          path.resolve(__dirname, '.'),
        ],
      },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  };
});
