#!/bin/bash

# 能力模型数据库初始化脚本
# 用途：创建数据库、schema、表结构和必要函数

set -e

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始初始化能力模型数据库...${NC}\n"

# 数据库连接信息
DB_USER="pikun"
DB_NAME="postgres"
DB_HOST="localhost"

# 1. 创建 schema 和扩展（如果不存在）
echo -e "${YELLOW}步骤 1: 创建 schema 和扩展...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" <<EOF
-- 创建 schema
CREATE SCHEMA IF NOT EXISTS pikun_db;

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建更新时间触发器函数（如果不存在）
CREATE OR REPLACE FUNCTION pikun_db.update_updated_at_column()
RETURNS TRIGGER AS \$\$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
\$\$ LANGUAGE plpgsql;
EOF

echo -e "${GREEN}✓ Schema 和扩展创建完成${NC}\n"

# 2. 创建能力模型相关表
echo -e "${YELLOW}步骤 2: 创建能力模型表结构...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -f "$(dirname "$0")/../migrations/004_create_ability_model_tables.sql"
echo -e "${GREEN}✓ 表结构创建完成${NC}\n"

# 3. 添加 talent_ratio 和 acquired_training_ratio 字段（如果不存在）
echo -e "${YELLOW}步骤 3: 检查并添加必要字段...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" <<EOF
SET search_path TO pikun_db, public;

-- 检查并添加 talent_ratio 字段
DO \$\$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'pikun_db' 
        AND table_name = 'ability_items' 
        AND column_name = 'talent_ratio'
    ) THEN
        ALTER TABLE pikun_db.ability_items
        ADD COLUMN talent_ratio DECIMAL(5,2) DEFAULT 50.00 CHECK (talent_ratio >= 0 AND talent_ratio <= 100),
        ADD COLUMN acquired_training_ratio DECIMAL(5,2) DEFAULT 50.00 CHECK (acquired_training_ratio >= 0 AND acquired_training_ratio <= 100);
        
        -- 添加约束：确保两者之和等于 100
        ALTER TABLE pikun_db.ability_items
        ADD CONSTRAINT check_talent_ratio_sum CHECK (talent_ratio + acquired_training_ratio = 100);
        
        RAISE NOTICE '已添加 talent_ratio 和 acquired_training_ratio 字段';
    ELSE
        RAISE NOTICE 'talent_ratio 和 acquired_training_ratio 字段已存在';
    END IF;
END \$\$;
EOF

echo -e "${GREEN}✓ 字段检查完成${NC}\n"

# 4. 验证表是否创建成功
echo -e "${YELLOW}步骤 4: 验证表结构...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" <<EOF
SET search_path TO pikun_db, public;

SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_schema = 'pikun_db' AND table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'pikun_db' 
  AND table_name LIKE 'ability%'
ORDER BY table_name;
EOF

echo -e "\n${GREEN}数据库初始化完成！${NC}"
echo -e "${YELLOW}下一步：运行导入脚本导入数据${NC}"
echo -e "${YELLOW}  cd apps/server && npx tsx scripts/import_ability_data.ts${NC}\n"

