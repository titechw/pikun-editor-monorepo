import path, { relative } from 'node:path';
import fg from 'fast-glob';
import { basename, dirname, join, resolve } from 'path';

export interface BaseViteConfigOptions {
  appDir: string;
  dedupeDeps: string[];
}

const getPackageDependencies = () => {
  const paths: Array<{ find: string; replacement: any }> = [];
  const relativePath = '../../';

  function collectPackageInformation(path: string) {
    // editor-demo 相对于根目录的地址
    fg.sync(`${relativePath}${path}/*`, { onlyDirectories: true })
      .map((name) => name.replace(`${relativePath}${path}/`, ''))
      .forEach((name) => {
        if (name === 'pm') {
          fg.sync(`${relativePath}${path}/${name}/*`, { onlyDirectories: true }).forEach(
            (subName) => {
              const subPkgName = subName.replace(`${relativePath}${path}/${name}/`, '');

              if (subPkgName === 'dist' || subPkgName === 'node_modules') {
                return;
              }

              paths.push({
                find: `@pikun/${name}/${subPkgName}`,
                replacement: resolve(`${relativePath}${path}/${name}/${subPkgName}/index.ts`),
              });
            }
          );
        } else if (
          name === 'extension-text-style' ||
          name === 'extension-table' ||
          name === 'extensions' ||
          name === 'extension-list' ||
          name === 'react' ||
          name === 'vue-2' ||
          name === 'vue-3'
        ) {
          fg.sync(`${relativePath}${path}/${name}/src/*`, { onlyDirectories: true }).forEach(
            (subName) => {
              const subPkgName = subName.replace(`${relativePath}${path}/${name}/src/`, '');

              paths.push({
                find: `@pikun/${name}/${subPkgName}`,
                replacement: resolve(`${relativePath}${path}/${name}/src/${subPkgName}/index.ts`),
              });
            }
          );
          paths.push({
            find: `@pikun/${name}`,
            replacement: resolve(`${relativePath}${path}/${name}/src/index.ts`),
          });
        } else {
          paths.push({
            find: `@pikun/${name}`,
            replacement: resolve(`${relativePath}${path}/${name}/src/index.ts`),
          });
        }
      });
  }

  collectPackageInformation('packages');

  // Handle the JSX runtime alias
  paths.unshift({
    find: '@pikun/core/jsx-runtime',
    replacement: resolve(`${relativePath}packages/core/src/jsx-runtime.ts`),
  });
  paths.unshift({
    find: '@pikun/core/jsx-dev-runtime',
    replacement: resolve(`${relativePath}packages/core/src/jsx-runtime.ts`),
  });

  return paths;
};

const paths = getPackageDependencies();
console.log('pathspathspaths:', paths);

export function createBaseViteConfig({ appDir, dedupeDeps }: BaseViteConfigOptions) {
  return {
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(appDir, 'src') }, ...paths],
      dedupe: dedupeDeps,
    },
    css: {
      preprocessorOptions: {
        less: { javascriptEnabled: true },
      },
    },
    server: {
      // 允许访问应用目录与 monorepo 根（支持 workspace 链接包真实路径）
      fs: { allow: [path.resolve(appDir, '.'), path.resolve(appDir, '../../')] },
      port: Number(process.env.APP_PORT || 5174),
      open: false,
    },
  };
}
