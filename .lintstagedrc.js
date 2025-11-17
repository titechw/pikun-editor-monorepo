/**
 * lint-staged 配置
 * 只检查改动的文件，提升提交速度
 */
module.exports = {
  // TypeScript/TSX 文件：直接对改动的文件运行 eslint
  'apps/**/*.{ts,tsx}': (filenames) => {
    // 按工作区分组文件
    const workspaceMap = new Map();
    
    filenames.forEach((file) => {
      const match = file.match(/^apps\/([^/]+)\//);
      if (match) {
        const workspace = match[1];
        if (!workspaceMap.has(workspace)) {
          workspaceMap.set(workspace, []);
        }
        workspaceMap.get(workspace).push(file);
      }
    });

    // 为每个工作区运行 eslint（只检查改动的文件）
    const commands = [];
    workspaceMap.forEach((files, workspace) => {
      // 使用相对路径，eslint 会自动查找对应工作区的配置文件
      // 从项目根目录运行，eslint 会根据文件路径找到正确的配置
      commands.push(`eslint --fix ${files.join(' ')}`);
    });

    return commands;
  },

  // JavaScript/JSX 文件：直接对改动的文件运行 eslint
  'apps/**/*.{js,jsx}': (filenames) => {
    const workspaceMap = new Map();
    
    filenames.forEach((file) => {
      const match = file.match(/^apps\/([^/]+)\//);
      if (match) {
        const workspace = match[1];
        if (!workspaceMap.has(workspace)) {
          workspaceMap.set(workspace, []);
        }
        workspaceMap.get(workspace).push(file);
      }
    });

    const commands = [];
    workspaceMap.forEach((files) => {
      commands.push(`eslint --fix ${files.join(' ')}`);
    });

    return commands;
  },

  // packages 下的文件
  'packages/**/*.{ts,tsx,js,jsx}': (filenames) => {
    if (filenames.length === 0) return [];
    return [`eslint --fix ${filenames.join(' ')}`];
  },
};

