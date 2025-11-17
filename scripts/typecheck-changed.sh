#!/usr/bin/env sh
# 只对改动的文件所在的工作区运行 typecheck

# 获取所有改动的文件
CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')

if [ -z "$CHANGED_FILES" ]; then
  echo "没有改动的 TypeScript 文件，跳过 typecheck"
  exit 0
fi

# 提取改动的文件所在的工作区
WORKSPACES=$(echo "$CHANGED_FILES" | sed -n 's|^apps/\([^/]*\)/.*|\1|p' | sort -u)

if [ -z "$WORKSPACES" ]; then
  echo "改动的文件不在 apps 目录下，跳过 typecheck"
  exit 0
fi

# 为每个工作区运行 typecheck
for workspace in $WORKSPACES; do
  echo "检查工作区: $workspace"
  
  # 根据工作区名称匹配包名
  case $workspace in
    "growth-client")
      pnpm --filter "@globallink/growth-client" typecheck || exit 1
      ;;
    "server")
      pnpm --filter "@pikun/server" typecheck || exit 1
      ;;
    "editor-demo")
      pnpm --filter "@pikun/editor-demo" typecheck || exit 1
      ;;
    *)
      echo "未知的工作区: $workspace，跳过 typecheck"
      ;;
  esac
done

echo "所有改动的文件所在的工作区 typecheck 通过"

