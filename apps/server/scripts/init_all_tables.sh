#!/bin/bash

# 完整数据库初始化脚本
# 用途：创建所有必要的表结构（包括基础表和能力模型表）

set -e

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始初始化完整数据库...${NC}\n"

# 数据库连接信息
DB_USER="pikun"
DB_NAME="postgres"
DB_HOST="localhost"

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MIGRATIONS_DIR="$SCRIPT_DIR/../migrations"

# 1. 创建 schema 和基础表
echo -e "${YELLOW}步骤 1: 创建 schema 和基础表...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -f "$MIGRATIONS_DIR/002_create_schema_and_tables.sql"
echo -e "${GREEN}✓ 基础表创建完成${NC}\n"

# 2. 添加用户类型字段（如果迁移文件存在）
if [ -f "$MIGRATIONS_DIR/006_add_user_type.sql" ]; then
    echo -e "${YELLOW}步骤 2: 添加用户类型字段...${NC}"
    psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -f "$MIGRATIONS_DIR/006_add_user_type.sql" 2>/dev/null || echo -e "${YELLOW}⚠ 用户类型字段可能已存在，跳过${NC}"
    echo -e "${GREEN}✓ 用户类型字段处理完成${NC}\n"
fi

# 3. 添加用户角色字段（如果迁移文件存在）
if [ -f "$MIGRATIONS_DIR/006_add_user_role.sql" ]; then
    echo -e "${YELLOW}步骤 3: 添加用户角色字段...${NC}"
    psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -f "$MIGRATIONS_DIR/006_add_user_role.sql" 2>/dev/null || echo -e "${YELLOW}⚠ 用户角色字段可能已存在，跳过${NC}"
    echo -e "${GREEN}✓ 用户角色字段处理完成${NC}\n"
fi

# 3.5. 添加文档变更日志表（如果迁移文件存在）
if [ -f "$MIGRATIONS_DIR/003_add_change_log.sql" ]; then
    echo -e "${YELLOW}步骤 3.5: 创建文档变更日志表...${NC}"
    psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -f "$MIGRATIONS_DIR/003_add_change_log.sql" 2>/dev/null || echo -e "${YELLOW}⚠ 文档变更日志表可能已存在，跳过${NC}"
    echo -e "${GREEN}✓ 文档变更日志表处理完成${NC}\n"
fi

# 4. 创建能力模型相关表
echo -e "${YELLOW}步骤 4: 创建能力模型表...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -f "$MIGRATIONS_DIR/004_create_ability_model_tables.sql" 2>/dev/null || echo -e "${YELLOW}⚠ 能力模型表可能已存在，跳过${NC}"
echo -e "${GREEN}✓ 能力模型表创建完成${NC}\n"

# 5. 添加能力项字段（如果迁移文件存在）
if [ -f "$MIGRATIONS_DIR/006_add_talent_ratio_fields.sql" ]; then
    echo -e "${YELLOW}步骤 5: 添加能力项字段...${NC}"
    psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -f "$MIGRATIONS_DIR/006_add_talent_ratio_fields.sql" 2>/dev/null || echo -e "${YELLOW}⚠ 能力项字段可能已存在，跳过${NC}"
    echo -e "${GREEN}✓ 能力项字段处理完成${NC}\n"
fi

# 6. 验证表是否创建成功
echo -e "${YELLOW}步骤 6: 验证表结构...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" <<EOF
SET search_path TO pikun_db, public;

-- 检查基础表
SELECT 
    '基础表' AS category,
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_schema = 'pikun_db' AND table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'pikun_db' 
  AND table_name IN ('users', 'workspaces', 'documents', 'workspace_members', 'refresh_tokens')
ORDER BY table_name;

-- 检查能力模型表
SELECT 
    '能力模型表' AS category,
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_schema = 'pikun_db' AND table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'pikun_db' 
  AND table_name LIKE 'ability%'
ORDER BY table_name;
EOF

echo -e "\n${GREEN}数据库初始化完成！${NC}"
echo -e "${YELLOW}下一步：运行导入脚本导入能力模型数据${NC}"
echo -e "${YELLOW}  cd apps/server && pnpm tsx scripts/import_ability_data.ts${NC}\n"

