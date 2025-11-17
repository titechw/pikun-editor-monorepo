# 数据库数据导出文件

本目录包含从 PostgreSQL 数据库导出的所有表数据。

## 文件说明

- `00_import_all_data.sql` - 汇总文件，包含所有表的导入顺序（按依赖关系排序）
- `data_*.sql` - 各个表的数据文件

## 导出统计

- **总表数**: 31 个表
- **有数据的表**: 11 个表
- **总数据行数**: 约 7,000+ 行

### 主要数据表

1. **学科分类数据** (`data_subject_categories.sql`) - 3,620 行
2. **学科数据** (`data_subjects.sql`) - 2,804 行
3. **能力项等级配置** (`data_ability_item_level_configs.sql`) - 350 行
4. **用户能力经验日志** (`data_user_ability_experience_logs.sql`) - 150 行
5. **能力项** (`data_ability_items.sql`) - 34 行
6. **能力维度** (`data_ability_dimensions.sql`) - 8 行
7. **用户能力等级** (`data_user_ability_levels.sql`) - 8 行
8. **能力类别** (`data_ability_categories.sql`) - 3 行
9. **用户** (`data_users.sql`) - 2 行
10. **工作空间** (`data_workspaces.sql`) - 2 行
11. **课程相关表** - 3 行（courses, course_contents, course_ability_bindings, assessments）

## 导入方法

### 方法 1: 使用汇总文件（推荐）

```bash
cd /path/to/project/data
psql -U pikun -d postgres -f 00_import_all_data.sql
```

### 方法 2: 逐个导入

```bash
cd /path/to/project/data
psql -U pikun -d postgres -f data_users.sql
psql -U pikun -d postgres -f data_workspaces.sql
# ... 按顺序导入其他文件
```

### 方法 3: 批量导入

```bash
cd /path/to/project/data
for file in data_*.sql; do
  echo "导入 $file..."
  psql -U pikun -d postgres -f "$file"
done
```

## 注意事项

1. **导入前确保表结构已创建**: 这些 SQL 文件只包含数据，不包含表结构。请先运行 `apps/server/migrations/` 目录下的迁移脚本创建表结构。

2. **依赖关系**: 导入顺序已按照表之间的外键依赖关系排序，请按照 `00_import_all_data.sql` 中的顺序导入。

3. **冲突处理**: 所有 INSERT 语句都使用了 `ON CONFLICT DO NOTHING`，如果数据已存在则不会重复插入。

4. **事务处理**: 数据按每 1000 条一个事务批量导入，确保数据一致性。

5. **Schema**: 所有表都在 `pikun_db` schema 中，导入时会自动设置 `search_path`。

## 重新导出

如果需要重新导出数据，运行：

```bash
cd apps/server
pnpm tsx scripts/export_database_data.ts
```

## 文件格式

每个 SQL 文件包含：
- 文件头注释（表名、数据行数、导出时间）
- `SET search_path TO pikun_db, public;` 语句
- 批量 INSERT 语句（每 1000 条一个事务）
- `ON CONFLICT DO NOTHING` 处理，避免重复插入

## 数据完整性

导出的数据包括：
- ✅ 所有表的所有列
- ✅ JSON/JSONB 字段
- ✅ 数组字段
- ✅ 日期时间字段
- ✅ 布尔值
- ✅ 二进制数据（BYTEA）
- ✅ NULL 值处理

