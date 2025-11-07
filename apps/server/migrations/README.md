# 数据库迁移执行指南

## 快速开始

### 方法 1：使用迁移脚本（推荐）

```bash
cd apps/server
./scripts/migrate.sh
```

### 方法 2：手动执行 SQL

```bash
psql -U pikun -h localhost -d postgres -f migrations/002_create_schema_and_tables.sql
```

## 数据库连接信息

- **用户**: `pikun`
- **主机**: `localhost`
- **数据库**: `postgres`
- **Schema**: `pikun_db`

## 环境变量配置

在 `apps/server/.env` 文件中配置数据库连接：

```env
DATABASE_URL=postgresql://pikun@localhost:5432/postgres
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
```

注意：连接字符串中不需要指定 schema，代码会自动设置 `search_path`。

## 验证迁移

执行迁移后，可以验证表是否创建成功：

```sql
-- 连接到数据库
psql -U pikun -h localhost -d postgres

-- 查看 schema
\dn

-- 切换到 schema
SET search_path TO pikun_db, public;

-- 查看所有表
\dt pikun_db.*

-- 查看表结构
\d pikun_db.users
\d pikun_db.documents
\d pikun_db.workspaces
```

## 创建的表

迁移脚本会在 `pikun_db` schema 中创建以下表：

1. **users** - 用户表
2. **workspaces** - 工作空间表
3. **documents** - 文档表
4. **document_snapshots** - 文档快照表（历史记录）
5. **document_embeddings** - 文档嵌入表（用于搜索）
6. **workspace_members** - 工作空间成员表
7. **refresh_tokens** - 刷新令牌表

## 注意事项

1. **pgvector 扩展**：`document_embeddings` 表中的 `embedding` 字段当前使用 `BYTEA` 类型。如果需要使用向量搜索，需要安装 `pgvector` 扩展：
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
   然后将 `embedding BYTEA` 改为 `embedding VECTOR(1536)`

2. **默认工作空间**：创建第一个用户后，可以手动创建默认工作空间：
   ```sql
   INSERT INTO pikun_db.workspaces (workspace_id, name, owner_uid) 
   VALUES ('00000000-0000-0000-0000-000000000000', '默认工作空间', 1);
   ```

3. **Schema 隔离**：所有表都在 `pikun_db` schema 中，不会影响 `public` schema 中的其他表。
