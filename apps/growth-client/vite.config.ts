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
      // 直接注册中间件，Vite 会按顺序执行
      // 我们需要在 Vite 的 HTML 处理之前执行
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const pathname = url.split('?')[0]; // 移除查询参数
        const query = url.includes('?') ? url.substring(url.indexOf('?')) : '';
        
        // 跳过静态资源（JS、CSS、图片、字体、API、Vite 内部资源等）
        const isStaticResource = 
          (pathname.includes('.') && !pathname.endsWith('.html') && !pathname.endsWith('/')) ||
          pathname.startsWith('/@') ||
          pathname.startsWith('/node_modules') ||
          pathname.startsWith('/src') ||
          pathname.startsWith('/api') ||
          pathname.startsWith('/favicon') ||
          pathname.startsWith('/assets');
        
        if (isStaticResource) {
          return next();
        }
        
        // 处理 /admin 路径及其子路径 -> /admin.html
        if (pathname === '/admin' || pathname === '/admin/' || pathname.startsWith('/admin/')) {
          req.url = '/admin.html' + query;
          return next();
        }
        // 处理 /test 路径及其子路径 -> /test.html
        if (pathname === '/test' || pathname === '/test/' || pathname.startsWith('/test/')) {
          req.url = '/test.html' + query;
          return next();
        }
        // 如果已经是 HTML 文件，直接通过
        if (pathname.endsWith('.html')) {
          return next();
        }
        // 其他路径默认为 index.html（单页应用路由 fallback）
        req.url = '/index.html' + query;
        next();
      });
    },
  };
}

export default defineConfig(() => {
  const port = Number(process.env.APP_PORT || 5174);
  
  return {
    appType: 'mpa' as const, // 启用多页应用模式
    plugins: [
      pathBasedEntryPlugin(), // 必须在最前面，确保中间件先执行
      react(),
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
