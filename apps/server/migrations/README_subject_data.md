# 学科分类数据录入说明

## 数据来源

数据来源于 GB/T 13745 标准（学科分类与代码），通过解析 `xuekefenlei.pdf` 文件获得。

## 数据统计

- **一级学科分类**: 62 个
- **二级学科分类**: 754 个
- **三级学科分类**: 2804 个
- **学科总数**: 2804 个（每个三级学科分类对应一个学科）

## SQL 文件清单

### 表结构
- `010_create_subject_classification_system_tables.sql` - 创建学科分类系统表结构
- `011_create_subject_category_path_function.sql` - 创建分类路径自动计算函数

### 一级学科分类（62个）
- `017_init_subject_categories_level1_complete.sql` - 所有一级学科分类（完整版）

### 二级学科分类（754个，分16批）
- `018_init_subject_categories_level2_batch1.sql` - 第1批（50个）
- `018_init_subject_categories_level2_batch2.sql` - 第2批（50个）
- ... (共16个批次)

### 三级学科分类（2804个，分31批）
- `019_init_subject_categories_level3_batch1.sql` - 第1批（100个）
- `019_init_subject_categories_level3_batch2.sql` - 第2批（100个）
- ... (共31个批次)

### 学科数据（2804个，分16批）
- `020_init_subjects_batch1.sql` - 第1批（200个）
- `020_init_subjects_batch2.sql` - 第2批（200个）
- ... (共16个批次)

## 执行顺序

1. 执行表结构创建：`010_create_subject_classification_system_tables.sql`
2. 执行路径函数创建：`011_create_subject_category_path_function.sql`
3. 执行一级学科分类：`017_init_subject_categories_level1_complete.sql`
4. 执行二级学科分类：按顺序执行 `018_init_subject_categories_level2_batch*.sql`（1-16）
5. 执行三级学科分类：按顺序执行 `019_init_subject_categories_level3_batch*.sql`（1-31）
6. 执行学科数据：按顺序执行 `020_init_subjects_batch*.sql`（1-16）

## 数据说明

- **学科分类代码**: 使用 GB/T 13745 标准中的数字代码
  - 一级学科：3位数字（如：110 数学）
  - 二级学科：5位数字（如：11011 数学史）
  - 三级学科：7位数字（如：1101410 演绎逻辑学）

- **学科代码**: 使用 `subject_` 前缀 + 三级学科代码（如：`subject_1101410`）

- **分类路径**: 自动计算，格式如：`/一级ID/二级ID/三级ID`

## 注意事项

1. 所有 SQL 文件都使用 `ON CONFLICT` 处理，可以重复执行
2. 分类路径通过触发器自动计算
3. 学科分类支持树形结构，可以无限层级扩展
4. 学科与能力关联需要后续单独建立（通过 `subject_ability_bindings` 表）

## 后续工作

1. 为学科补充详细信息（定义、描述、作用、价值、应用场景等）
2. 建立学科与能力的关联关系
3. 为学科添加图标和封面图

