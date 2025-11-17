#!/bin/bash

# 运行能力数据导入脚本

set -e

cd "$(dirname "$0")/.."

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "错误: .env 文件不存在"
    echo "请先创建 .env 文件，并配置 DATABASE_URL"
    echo "示例: DATABASE_URL=postgresql://pikun@localhost:5432/postgres"
    exit 1
fi

# 检查 DATABASE_URL 是否配置
if ! grep -q "DATABASE_URL" .env; then
    echo "错误: .env 文件中没有配置 DATABASE_URL"
    echo "请添加: DATABASE_URL=postgresql://pikun@localhost:5432/postgres"
    exit 1
fi

echo "开始运行导入脚本..."
echo ""

# 运行导入脚本
pnpm tsx scripts/import_ability_data.ts

