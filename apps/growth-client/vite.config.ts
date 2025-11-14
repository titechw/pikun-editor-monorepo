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
 * 让 /admin 和 /test 路径能够正确加载对应的 HTML 文件
 */
function pathBasedEntryPlugin(): Plugin {
  return {
    name: 'path-based-entry',
    configureServer(server) {
      // 保存原始的 transformIndexHtml
      const originalTransformIndexHtml = server.transformIndexHtml;
      
      // 重写 transformIndexHtml 来处理多入口
      server.transformIndexHtml = (url, html, req) => {
        // 处理 /admin 路径及其子路径
        if (url === '/admin' || url === '/admin/' || url.startsWith('/admin/')) {
          const adminHtmlPath = path.resolve(__dirname, 'admin.html');
          if (fs.existsSync(adminHtmlPath)) {
            html = fs.readFileSync(adminHtmlPath, 'utf-8');
          }
        }
        // 处理 /test 路径及其子路径
        else if (url === '/test' || url === '/test/' || url.startsWith('/test/')) {
          const testHtmlPath = path.resolve(__dirname, 'test.html');
          if (fs.existsSync(testHtmlPath)) {
            html = fs.readFileSync(testHtmlPath, 'utf-8');
          }
        }
        
        // 调用原始的 transformIndexHtml
        if (originalTransformIndexHtml) {
          return originalTransformIndexHtml.call(server, url, html, req);
        }
        return html;
      };
      
      // 在服务器配置完成后添加中间件
      return () => {
        // 添加中间件处理 HTML 请求（必须在最前面执行）
        const middleware = (req: any, res: any, next: any) => {
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
          
          // 处理 /admin 路径及其子路径
          if (url === '/admin' || url === '/admin/' || url.startsWith('/admin/')) {
            req.url = '/admin.html';
            console.log(`[path-based-entry] Rewriting ${url} to /admin.html`);
          }
          // 处理 /test 路径及其子路径
          else if (url === '/test' || url === '/test/' || url.startsWith('/test/')) {
            req.url = '/test.html';
            console.log(`[path-based-entry] Rewriting ${url} to /test.html`);
          }
          
          next();
        };
        
        // 将中间件添加到最前面（使用 unshift 确保优先执行）
        const stack = (server.middlewares as any).stack;
        if (Array.isArray(stack)) {
          stack.unshift({ route: '', handle: middleware });
        } else {
          // 如果不是数组，使用 use 方法
          server.middlewares.use(middleware);
        }
      };
    },
  };
}

export default defineConfig(() => {
  const port = Number(process.env.APP_PORT || 5174);
  
  return {
    appType: 'mpa', // 启用多页应用模式
    plugins: [
      react(),
      pathBasedEntryPlugin(), // 必须在 react() 之后，以便在服务器配置完成后修改中间件
    ],
    ...baseConfig,
    build: {
      ...baseConfig.build,
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
