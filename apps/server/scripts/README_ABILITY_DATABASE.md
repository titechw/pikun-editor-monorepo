# 能力模型数据库初始化指南

## 快速开始

### 方法 1：使用初始化脚本（推荐）

```bash
cd apps/server
./scripts/init_ability_database.sh
```

这个脚本会自动：
1. 创建 `pikun_db` schema
2. 启用 UUID 扩展
3. 创建必要的函数
4. 创建所有能力模型相关表
5. 添加必要的字段（talent_ratio, acquired_training_ratio）

### 方法 2：手动执行 SQL

```bash
# 1. 创建 schema 和基础表结构
psql -U pikun -d postgres -f migrations/004_create_ability_model_tables.sql

# 2. 添加 talent_ratio 字段（如果表已存在但没有这些字段）
psql -U pikun -d postgres -f migrations/006_add_talent_ratio_fields.sql
```

## 导入数据

初始化完成后，运行导入脚本：

```bash
cd apps/server
npx tsx scripts/import_ability_data.ts
```

或者使用 pnpm：

```bash
cd apps/server
pnpm tsx scripts/import_ability_data.ts
```

## 验证

### 检查表是否创建成功

```sql
-- 连接到数据库
psql -U pikun -d postgres

-- 查看所有能力模型相关表
SET search_path TO pikun_db, public;
\dt ability*

-- 查看表结构
\d ability_categories
\d ability_dimensions
\d ability_items
```

### 检查数据是否导入成功

```sql
-- 查看能力类别
SELECT * FROM pikun_db.ability_categories;

-- 查看能力维度
SELECT 
    ac.name AS category_name,
    ad.name AS dimension_name,
    ad.code AS dimension_code
FROM pikun_db.ability_dimensions ad
JOIN pikun_db.ability_categories ac ON ad.category_id = ac.category_id
ORDER BY ac.sort_order, ad.sort_order;

-- 查看能力项
SELECT 
    ac.name AS category_name,
    ad.name AS dimension_name,
    ai.name AS item_name,
    ai.code AS item_code,
    ai.talent_ratio,
    ai.acquired_training_ratio
FROM pikun_db.ability_items ai
JOIN pikun_db.ability_dimensions ad ON ai.dimension_id = ad.dimension_id
JOIN pikun_db.ability_categories ac ON ad.category_id = ac.category_id
ORDER BY ac.sort_order, ad.sort_order, ai.sort_order;
```

## 数据库结构

### 表关系

```
ability_categories (能力类别)
    ↓ 1:N
ability_dimensions (能力维度)
    ↓ 1:N
ability_items (能力项)
    ↓ 1:10
ability_item_level_configs (能力项等级配置)
    ↓ N:1
user_ability_levels (用户能力等级)
    ↓ 1:N
user_ability_experience_logs (用户经验获得记录)
```

### 主要表说明

1. **ability_categories** - 能力类别表
   - 存储能力的一级分类（如：元系统层、核心底层能力、专项应用能力）

2. **ability_dimensions** - 能力维度表
   - 存储能力的二级分类（如：认知能力、情绪与意志能力）

3. **ability_items** - 能力项表
   - 存储具体的能力项（如：逻辑思维、记忆力、财商等）
   - 包含 `talent_ratio`（天赋占比）和 `acquired_training_ratio`（后天训练占比）

4. **ability_item_level_configs** - 能力项等级配置表
   - 存储每个能力项的1-10级配置
   - 包含每级所需经验值、是否需要评估等

5. **user_ability_levels** - 用户能力等级表
   - 存储用户当前的能力等级和经验值

6. **user_ability_experience_logs** - 用户经验获得记录表
   - 记录用户获得经验的历史

## 常见问题

### 1. 如果表已存在，但缺少字段怎么办？

运行迁移脚本添加字段：

```bash
psql -U pikun -d postgres -f migrations/006_add_talent_ratio_fields.sql
```

### 2. 如何清空数据重新导入？

导入脚本会自动清空现有数据，直接运行即可：

```bash
npx tsx scripts/import_ability_data.ts
```

### 3. 如何查看导入的数据统计？

```sql
SELECT 
    (SELECT COUNT(*) FROM pikun_db.ability_categories) AS categories,
    (SELECT COUNT(*) FROM pikun_db.ability_dimensions) AS dimensions,
    (SELECT COUNT(*) FROM pikun_db.ability_items) AS items,
    (SELECT COUNT(*) FROM pikun_db.ability_item_level_configs) AS level_configs;
```

## 注意事项

1. **数据库连接**：确保使用正确的数据库连接信息（默认：`psql -U pikun -d postgres`）
2. **Schema 隔离**：所有表都在 `pikun_db` schema 中
3. **字段约束**：`talent_ratio + acquired_training_ratio` 必须等于 100
4. **唯一约束**：每个维度下的能力项 code 必须唯一

