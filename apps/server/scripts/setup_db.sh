#!/bin/bash

# 数据库迁移脚本 - 需要分两步执行
# 第一步：使用超级用户创建 schema 和扩展
# 第二步：使用普通用户创建表

echo "=========================================="
echo "数据库迁移脚本"
echo "=========================================="
echo ""
echo "步骤 1: 使用超级用户创建 schema 和扩展"
echo "请执行以下命令（需要超级用户权限）："
echo ""
echo "psql -U postgres -h localhost -d postgres << 'EOF'"
echo "CREATE SCHEMA IF NOT EXISTS pikun_db;"
echo "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
echo "GRANT ALL ON SCHEMA pikun_db TO pikun;"
echo "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA pikun_db TO pikun;"
echo "ALTER DEFAULT PRIVILEGES IN SCHEMA pikun_db GRANT ALL ON TABLES TO pikun;"
echo "EOF"
echo ""
echo "步骤 2: 使用普通用户创建表"
echo "执行以下命令："
echo ""
echo "psql -U pikun -h localhost -d postgres -f migrations/002_create_tables_only.sql"
echo ""
echo "=========================================="

# 如果用户是超级用户，可以直接执行
if [ "$1" == "--superuser" ]; then
    echo "使用超级用户模式执行..."
    psql -U postgres -h localhost -d postgres << 'EOF'
CREATE SCHEMA IF NOT EXISTS pikun_db;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
GRANT ALL ON SCHEMA pikun_db TO pikun;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA pikun_db TO pikun;
ALTER DEFAULT PRIVILEGES IN SCHEMA pikun_db GRANT ALL ON TABLES TO pikun;
EOF
    
    echo ""
    echo "Schema 创建完成，现在创建表..."
    psql -U pikun -h localhost -d postgres -f migrations/002_create_tables_only.sql
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ 数据库迁移成功完成！"
        echo ""
        echo "验证表是否创建成功："
        psql -U pikun -h localhost -d postgres -c "\dt pikun_db.*"
    else
        echo ""
        echo "❌ 数据库迁移失败！"
        exit 1
    fi
fi

