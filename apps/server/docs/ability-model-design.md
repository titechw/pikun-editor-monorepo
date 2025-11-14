# 能力模型管理系统设计文档

## 一、概述

基于《个人能力的科学划分与系统建模》论文，设计并实现"核心底层能力 + 专项应用能力"的二级个人能力模型管理系统。

### 1.1 能力模型结构

```
能力模型
├── 核心底层能力（Core Abilities）
│   ├── 认知能力（Cognitive Ability）
│   │   ├── 逻辑思维
│   │   ├── 记忆力
│   │   ├── 专注力
│   │   ├── 学习力
│   │   ├── 感知力
│   │   ├── 基础想象力
│   │   ├── 基础创造力
│   │   └── 基础计算力
│   ├── 情绪与意志能力（Emotional & Willpower Ability）
│   │   ├── 情商
│   │   ├── 耐心
│   │   ├── 毅力
│   │   ├── 抗挫力
│   │   └── 自律性
│   └── 元能力（Meta Ability）
│       ├── 自我认知
│       ├── 目标管理
│       ├── 复盘迭代
│       └── 决策力
└── 专项应用能力（Specialized Abilities）
    ├── 专业知识与技能（Professional Knowledge & Skills）
    │   ├── 专业计算力
    │   ├── 专业想象力
    │   ├── 专业创造力
    │   ├── 信息检索与处理能力
    │   ├── 跨文化沟通能力
    │   ├── 数学运算能力
    │   ├── 物理推理能力
    │   ├── 化学分析能力
    │   ├── 文学创作能力
    │   └── 编程能力
    ├── 实践与策略能力（Practical & Strategic Ability）
    │   ├── 解题能力（跨学科）
    │   ├── 财商
    │   ├── 危机应对能力
    │   ├── 谋略能力
    │   ├── 沟通表达能力
    │   └── 创造力
    └── 场景适配能力（Scenario Adaptation Ability）
        ├── 职场执行能力
        ├── 项目管理能力
        ├── 学习应试能力
        ├── 创业运营能力
        └── 终身学习能力
```

## 二、数据库设计

### 2.1 表结构设计

#### 2.1.1 能力类别表（ability_categories）

存储能力的两大类别：核心底层能力、专项应用能力。

| 字段名      | 类型         | 说明                         |
| ----------- | ------------ | ---------------------------- |
| category_id | UUID         | 主键                         |
| code        | VARCHAR(50)  | 类别代码（core/specialized） |
| name        | VARCHAR(100) | 类别名称                     |
| description | TEXT         | 类别描述                     |
| sort_order  | INTEGER      | 排序顺序                     |
| metadata    | JSONB        | 扩展元数据                   |
| created_at  | TIMESTAMP    | 创建时间                     |
| updated_at  | TIMESTAMP    | 更新时间                     |

#### 2.1.2 能力维度表（ability_dimensions）

存储 6 个能力维度。

| 字段名       | 类型         | 说明                |
| ------------ | ------------ | ------------------- |
| dimension_id | UUID         | 主键                |
| category_id  | UUID         | 所属类别 ID（外键） |
| code         | VARCHAR(50)  | 维度代码            |
| name         | VARCHAR(100) | 维度名称            |
| description  | TEXT         | 维度描述            |
| sort_order   | INTEGER      | 排序顺序            |
| metadata     | JSONB        | 扩展元数据          |
| created_at   | TIMESTAMP    | 创建时间            |
| updated_at   | TIMESTAMP    | 更新时间            |

#### 2.1.3 能力项表（ability_items）

存储具体的能力子指标。

| 字段名                  | 类型         | 说明                |
| ----------------------- | ------------ | ------------------- |
| item_id                 | UUID         | 主键                |
| dimension_id            | UUID         | 所属维度 ID（外键） |
| code                    | VARCHAR(50)  | 能力项代码          |
| name                    | VARCHAR(100) | 能力项名称          |
| description             | TEXT         | 能力项描述          |
| definition              | TEXT         | 能力项定义          |
| performance_description | TEXT         | 具体表现描述        |
| evaluation_points       | TEXT         | 评估要点            |
| training_strategies     | TEXT         | 锻炼策略            |
| theoretical_basis       | TEXT         | 理论依据            |
| sort_order              | INTEGER      | 排序顺序            |
| metadata                | JSONB        | 扩展元数据          |
| created_at              | TIMESTAMP    | 创建时间            |
| updated_at              | TIMESTAMP    | 更新时间            |

#### 2.1.4 能力项等级配置表（ability_item_level_configs）

存储每个能力项的等级配置信息（等级、所需经验值等）。支持为每个能力项独立配置等级体系，也可使用全局模板。

| 字段名              | 类型        | 说明                                                        |
| ------------------- | ----------- | ----------------------------------------------------------- |
| config_id           | UUID        | 主键                                                        |
| item_id             | UUID        | 能力项 ID（外键，NULL 表示全局模板）                        |
| level               | INTEGER     | 等级（如 1-10 级）                                          |
| required_exp        | BIGINT      | 升级所需经验值（如 1 级 10 点，2 级 100 点，3 级 500 点）   |
| requires_assessment | BOOLEAN     | 是否需要考核才能升级（true=需要考核，false=经验值达标即可） |
| level_name          | VARCHAR(50) | 等级名称（如 "初级"、"中级"、"高级"）                       |
| level_description   | TEXT        | 等级描述                                                    |
| is_template         | BOOLEAN     | 是否为全局模板（true=全局模板，false=能力项独立配置）       |
| sort_order          | INTEGER     | 排序顺序                                                    |
| metadata            | JSONB       | 扩展元数据（可存储经验计算公式、升级奖励、考核要求等）      |
| created_at          | TIMESTAMP   | 创建时间                                                    |
| updated_at          | TIMESTAMP   | 更新时间                                                    |

**设计说明**：

- 支持两种模式：
  1. **全局模板模式**：`item_id` 为 NULL，`is_template=true`，所有能力项默认使用此模板
  2. **独立配置模式**：`item_id` 不为 NULL，`is_template=false`，该能力项使用独立配置
- 如果能力项没有独立配置，则使用全局模板
- 经验值支持灵活配置，可通过前端管理页面调整
- **考核机制**：
  - `requires_assessment=false`：经验值达标后自动升级
  - `requires_assessment=true`：经验值达标后，需要完成考核并通过才能升级
  - 考核相关信息存储在 `metadata` 中，格式示例：
    ```json
    {
      "assessment": {
        "type": "exam", // 考核类型：exam（考试）、practice（实践）、review（评审）等
        "exam_id": "uuid", // 关联的考试ID（如果type为exam）
        "passing_score": 80, // 及格分数
        "description": "需要通过编程能力测试", // 考核描述
        "requirements": ["完成10道编程题", "正确率≥80%"] // 考核要求
      }
    }
    ```

#### 2.1.5 用户能力等级表（user_ability_levels）

存储用户每个能力项的当前等级和经验值。

| 字段名               | 类型      | 说明                                     |
| -------------------- | --------- | ---------------------------------------- |
| user_level_id        | UUID      | 主键                                     |
| uid                  | BIGINT    | 用户 ID（外键）                          |
| item_id              | UUID      | 能力项 ID（外键）                        |
| current_level        | INTEGER   | 当前等级（默认 1 级）                    |
| current_exp          | BIGINT    | 当前经验值（默认 0）                     |
| total_exp            | BIGINT    | 累计总经验值                             |
| level_up_count       | INTEGER   | 升级次数                                 |
| last_level_up_at     | TIMESTAMP | 最后升级时间                             |
| metadata             | JSONB     | 扩展元数据                               |
| created_at           | TIMESTAMP | 创建时间                                 |
| updated_at           | TIMESTAMP | 更新时间                                 |
| UNIQUE(uid, item_id) | -         | 唯一约束：每个用户每个能力项只有一条记录 |

#### 2.1.6 用户经验获得记录表（user_ability_experience_logs）

记录用户经验获得的历史记录，用于追踪和分析。

| 字段名       | 类型         | 说明                                                         |
| ------------ | ------------ | ------------------------------------------------------------ |
| log_id       | UUID         | 主键                                                         |
| uid          | BIGINT       | 用户 ID（外键）                                              |
| item_id      | UUID         | 能力项 ID（外键）                                            |
| exp_amount   | BIGINT       | 获得的经验值（可为负数，表示扣除）                           |
| exp_type     | VARCHAR(50)  | 经验类型（如：task_complete, daily_practice, assessment 等） |
| source_id    | VARCHAR(100) | 来源 ID（如任务 ID、练习 ID 等）                             |
| source_type  | VARCHAR(50)  | 来源类型（如：task, practice, assessment 等）                |
| before_level | INTEGER      | 获得经验前的等级                                             |
| after_level  | INTEGER      | 获得经验后的等级                                             |
| before_exp   | BIGINT       | 获得经验前的经验值                                           |
| after_exp    | BIGINT       | 获得经验后的经验值                                           |
| is_level_up  | BOOLEAN      | 是否触发升级                                                 |
| notes        | TEXT         | 备注                                                         |
| metadata     | JSONB        | 扩展元数据                                                   |
| created_at   | TIMESTAMP    | 创建时间                                                     |

### 2.2 索引设计

```sql
-- 能力类别表索引
CREATE INDEX idx_ability_categories_code ON pikun_db.ability_categories(code);
CREATE INDEX idx_ability_categories_sort_order ON pikun_db.ability_categories(sort_order);

-- 能力维度表索引
CREATE INDEX idx_ability_dimensions_category_id ON pikun_db.ability_dimensions(category_id);
CREATE INDEX idx_ability_dimensions_code ON pikun_db.ability_dimensions(code);
CREATE INDEX idx_ability_dimensions_sort_order ON pikun_db.ability_dimensions(sort_order);

-- 能力项表索引
CREATE INDEX idx_ability_items_dimension_id ON pikun_db.ability_items(dimension_id);
CREATE INDEX idx_ability_items_code ON pikun_db.ability_items(code);
CREATE INDEX idx_ability_items_sort_order ON pikun_db.ability_items(sort_order);

-- 能力项等级配置表索引
CREATE INDEX idx_ability_item_level_configs_item_id ON pikun_db.ability_item_level_configs(item_id);
CREATE INDEX idx_ability_item_level_configs_is_template ON pikun_db.ability_item_level_configs(is_template);
CREATE INDEX idx_ability_item_level_configs_level ON pikun_db.ability_item_level_configs(level);
CREATE INDEX idx_ability_item_level_configs_sort_order ON pikun_db.ability_item_level_configs(sort_order);

-- 用户能力等级表索引
CREATE INDEX idx_user_ability_levels_uid ON pikun_db.user_ability_levels(uid);
CREATE INDEX idx_user_ability_levels_item_id ON pikun_db.user_ability_levels(item_id);
CREATE INDEX idx_user_ability_levels_level ON pikun_db.user_ability_levels(current_level);

-- 用户经验获得记录表索引
CREATE INDEX idx_user_ability_experience_logs_uid ON pikun_db.user_ability_experience_logs(uid);
CREATE INDEX idx_user_ability_experience_logs_item_id ON pikun_db.user_ability_experience_logs(item_id);
CREATE INDEX idx_user_ability_experience_logs_created_at ON pikun_db.user_ability_experience_logs(created_at DESC);
CREATE INDEX idx_user_ability_experience_logs_exp_type ON pikun_db.user_ability_experience_logs(exp_type);
```

## 三、API 设计

### 3.1 能力模型管理 API（管理员）

#### 3.1.1 能力类别管理

- `GET /api/admin/ability-categories` - 获取能力类别列表
- `GET /api/admin/ability-categories/:id` - 获取能力类别详情
- `POST /api/admin/ability-categories` - 创建能力类别
- `PUT /api/admin/ability-categories/:id` - 更新能力类别
- `DELETE /api/admin/ability-categories/:id` - 删除能力类别

#### 3.1.2 能力维度管理

- `GET /api/admin/ability-dimensions` - 获取能力维度列表（支持按类别筛选）
- `GET /api/admin/ability-dimensions/:id` - 获取能力维度详情
- `POST /api/admin/ability-dimensions` - 创建能力维度
- `PUT /api/admin/ability-dimensions/:id` - 更新能力维度
- `DELETE /api/admin/ability-dimensions/:id` - 删除能力维度

#### 3.1.3 能力项管理

- `GET /api/admin/ability-items` - 获取能力项列表（支持按维度筛选）
- `GET /api/admin/ability-items/:id` - 获取能力项详情
- `POST /api/admin/ability-items` - 创建能力项
- `PUT /api/admin/ability-items/:id` - 更新能力项
- `DELETE /api/admin/ability-items/:id` - 删除能力项

#### 3.1.4 能力项等级配置管理

- `GET /api/admin/ability-item-level-configs` - 获取等级配置列表（支持按能力项筛选）
- `GET /api/admin/ability-item-level-configs/template` - 获取全局模板配置
- `GET /api/admin/ability-item-level-configs/:id` - 获取等级配置详情
- `POST /api/admin/ability-item-level-configs` - 创建等级配置（支持批量创建）
- `PUT /api/admin/ability-item-level-configs/:id` - 更新等级配置
- `DELETE /api/admin/ability-item-level-configs/:id` - 删除等级配置
- `POST /api/admin/ability-item-level-configs/copy-to-item` - 将全局模板复制到指定能力项

### 3.2 能力评估 API（用户）

#### 3.2.1 能力模型查询

- `GET /api/ability/categories` - 获取能力类别列表（树形结构）
- `GET /api/ability/dimensions` - 获取能力维度列表
- `GET /api/ability/items` - 获取能力项列表

#### 3.2.2 用户能力等级

- `GET /api/ability/my-levels` - 获取我的能力等级列表
- `GET /api/ability/my-levels/:itemId` - 获取指定能力项的等级详情
- `POST /api/ability/experience/add` - 增加经验值（系统调用，用户不可直接调用）
- `GET /api/ability/experience/logs` - 获取经验获得记录

#### 3.2.3 能力升级考核

- `GET /api/ability/level-up/available` - 获取可升级的能力项列表（经验值达标但未通过考核）
- `GET /api/ability/level-up/:itemId/assessment` - 获取升级考核信息
- `POST /api/ability/level-up/:itemId/assessment/submit` - 提交考核结果
- `POST /api/ability/level-up/:itemId/upgrade` - 执行升级（经验值达标且考核通过后）

#### 3.2.4 能力分析

- `GET /api/ability/analysis/radar` - 获取能力雷达图数据（基于等级）
- `GET /api/ability/analysis/growth` - 获取能力成长趋势（基于经验值变化）
- `GET /api/ability/analysis/level-distribution` - 获取等级分布统计

## 四、前端设计

### 4.1 多入口配置

将 `apps/growth-client` 改造为多入口项目：

- **主入口** (`index.html`): 用户端应用
- **管理入口** (`admin.html`): 管理员应用

### 4.2 管理端功能模块

#### 4.2.1 能力模型管理

- **能力类别管理页面**

  - 列表展示能力类别
  - 新增/编辑/删除能力类别
  - 拖拽排序

- **能力维度管理页面**

  - 列表展示能力维度（支持按类别筛选）
  - 新增/编辑/删除能力维度
  - 拖拽排序

- **能力项管理页面**

  - 列表展示能力项（支持按维度筛选）
  - 新增/编辑/删除能力项
  - 批量导入能力项
  - 拖拽排序

- **能力项等级配置管理页面**

  - 全局模板配置：设置默认等级体系（等级、经验值等）
  - 能力项独立配置：为特定能力项配置独立的等级体系
  - 等级配置列表：展示所有等级配置（支持按能力项筛选）
  - 批量操作：批量复制模板到能力项、批量调整经验值等
  - 经验值计算公式配置（可在 metadata 中配置，或单独设计）

#### 4.2.2 数据统计

- 能力模型使用统计
- 用户评估数据统计
- 能力成长趋势分析

### 4.3 用户端功能模块

#### 4.3.1 能力等级与经验

- **我的能力等级页面**

  - 展示能力模型树形结构
  - 显示每个能力项的当前等级和经验值
  - 显示距离下一级所需经验值
  - 能力项等级进度条

- **经验获得记录页面**

  - 查看经验获得历史记录
  - 支持按能力项、经验类型筛选
  - 显示升级记录

- **能力升级考核页面**

  - 显示可升级的能力项（经验值达标）
  - 如果 `requires_assessment=true`，显示考核入口
  - 完成考核后自动升级
  - 显示考核历史记录

#### 4.3.2 能力分析

- **能力雷达图**

  - 基于等级展示当前能力水平
  - 支持按类别/维度筛选
  - 可对比不同时期的能力等级

- **成长趋势图**

  - 展示经验值变化曲线
  - 展示等级变化趋势
  - 支持按能力项筛选
  - 显示升级节点

## 五、技术实现

### 5.1 后端实现

- **DAO 层**: 实现各表的 CRUD 操作
- **Service 层**: 实现业务逻辑（能力模型管理、评估计算等）
- **Controller 层**: 处理 HTTP 请求
- **API 路由**: Next.js API Routes

### 5.2 前端实现

- **Store 层**: 使用 MobX 管理状态
  - `AbilityModelStore`: 能力模型数据管理
  - `AbilityAssessmentStore`: 能力评估管理
- **组件层**: 使用 Antd 组件库
- **路由**: React Router DOM

### 5.3 数据初始化

创建数据库迁移脚本，初始化能力模型的基础数据：

- 2 个类别（核心底层能力、专项应用能力）
- 6 个维度
- 约 50 个能力项
- 全局等级模板（默认 1-10 级，经验值可配置）

## 六、开发计划

### 阶段一：数据库设计与迁移

1. 创建数据库表结构
2. 编写数据库迁移脚本
3. 初始化基础数据

### 阶段二：后端 API 开发

1. 实现实体类定义
2. 实现 DAO 层
3. 实现 Service 层
4. 实现 Controller 层
5. 实现 API 路由

### 阶段三：前端多入口改造

1. 配置 Vite 多入口
2. 创建管理端路由
3. 创建管理端布局

### 阶段四：管理端开发

1. 能力类别管理页面
2. 能力维度管理页面
3. 能力项管理页面

### 阶段五：用户端开发

1. 能力评估页面
2. 能力分析页面

### 阶段六：测试与优化

1. 功能测试
2. 性能优化
3. 用户体验优化

## 七、等级与经验系统设计说明

### 7.1 等级配置策略

**全局模板模式**：

- 所有能力项默认使用全局模板的等级配置
- 适合大多数能力项使用相同等级体系的情况
- 便于统一管理和调整

**独立配置模式**：

- 为特定能力项配置独立的等级体系
- 适合某些能力项需要特殊等级体系的情况
- 例如：基础计算力可能只需要 5 级，而编程能力需要 10 级

**配置优先级**：

1. 如果能力项有独立配置，使用独立配置
2. 如果没有独立配置，使用全局模板
3. 如果都没有，使用默认配置（1-10 级，经验值递增）

### 7.2 经验值计算方式

经验值配置支持多种方式：

1. **固定值**：每个等级固定经验值（如 1 级 10，2 级 100，3 级 500）
2. **公式计算**：可在 metadata 中配置公式（如 `level * 100 * (level + 1)`）
3. **自定义规则**：通过前端管理页面灵活配置

### 7.3 经验获得机制

经验值可通过以下方式获得：

- 完成任务（task_complete）
- 日常练习（daily_practice）
- 能力评估（assessment）
- 系统奖励（system_reward）
- 其他自定义来源

### 7.4 升级机制

**升级条件**：

1. **经验值达标**：用户经验值达到当前等级所需经验值
2. **考核通过**（如果 `requires_assessment=true`）：需要通过考核才能升级

**升级流程**：

- 如果 `requires_assessment=false`：经验值达标后自动升级
- 如果 `requires_assessment=true`：经验值达标后，需要完成考核并通过才能升级
- 考核相关信息存储在 `metadata` 中（如考核类型、考核要求、考核题目等）

**升级记录**：

- 升级时记录升级日志到 `user_ability_experience_logs`
- 记录升级前的等级和经验值、升级后的等级和经验值
- 记录是否触发升级（`is_level_up=true`）

**跨级升级**：

- 支持跨级升级（如果一次性获得大量经验）
- 但需要逐级通过考核（如果设置了考核要求）
- 例如：从 1 级直接升到 3 级，需要先通过 2 级考核，再通过 3 级考核

**考核机制**：

- 考核类型支持：
  - **exam**：考试类型（关联考试系统，如 `exam_id`）
  - **practice**：实践类型（需要完成实践任务）
  - **review**：评审类型（需要他人评审通过）
  - **custom**：自定义类型（可在 metadata 中定义具体规则）
- 考核结果存储：
  - 考核通过后，记录到 `user_ability_experience_logs` 的 `metadata` 中
  - 或创建独立的考核记录表（后续扩展）

## 八、注意事项

1. **数据完整性**:
   - 删除维度时需检查是否有关联的能力项
   - 删除能力项时需检查是否有关联的等级配置和用户数据
2. **等级配置**:
   - 全局模板修改会影响所有使用模板的能力项
   - 建议在修改前备份或创建新版本
3. **经验值计算**:
   - 经验值计算逻辑应在后端统一处理，前端仅展示
   - 支持通过 metadata 配置计算公式，但需验证公式安全性
4. **权限控制**:
   - 管理端 API 需要管理员权限验证
   - 用户只能查看和操作自己的能力等级数据
5. **性能优化**:
   - 能力模型树形结构查询需要优化，避免 N+1 查询
   - 用户能力等级数据量大时，考虑分页和缓存
6. **数据导入**:
   - 支持批量导入能力项数据（Excel/CSV）
   - 支持批量导入等级配置
7. **并发处理**:
   - 经验值增加操作需要考虑并发安全
   - 使用数据库事务和锁机制保证数据一致性
