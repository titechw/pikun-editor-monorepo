#!/bin/bash

# 数据库迁移脚本
# 使用方法: ./migrate.sh

DB_USER="pikun"
DB_HOST="localhost"
DB_NAME="postgres"
SCHEMA_NAME="pikun_db"
MIGRATION_FILE="apps/server/migrations/002_create_schema_and_tables.sql"

echo "开始执行数据库迁移..."
echo "数据库: $DB_NAME"
echo "Schema: $SCHEMA_NAME"
echo "迁移文件: $MIGRATION_FILE"
echo ""

# 执行迁移
psql -U $DB_USER -h $DB_HOST -d $DB_NAME -f $MIGRATION_FILE

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 数据库迁移成功完成！"
    echo ""
    echo "Schema '$SCHEMA_NAME' 已创建，包含以下表："
    echo "  - users (用户表)"
    echo "  - workspaces (工作空间表)"
    echo "  - documents (文档表)"
    echo "  - document_snapshots (文档快照表)"
    echo "  - document_embeddings (文档嵌入表)"
    echo "  - workspace_members (工作空间成员表)"
    echo "  - refresh_tokens (刷新令牌表)"
else
    echo ""
    echo "❌ 数据库迁移失败！"
    exit 1
fi




