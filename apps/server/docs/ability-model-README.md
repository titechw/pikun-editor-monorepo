# 能力模型管理系统 - 实现方案

## 📋 概述

基于《个人能力的科学划分与系统建模》论文，实现"核心底层能力 + 专项应用能力"的二级个人能力模型管理系统，支持等级和经验系统。

## 🎯 核心特性

1. **二级能力模型结构**：核心底层能力 + 专项应用能力
2. **灵活的等级配置系统**：支持全局模板和独立配置
3. **经验值系统**：支持多种经验获得方式，自动升级机制
4. **管理端**：完整的能力模型管理功能
5. **用户端**：能力等级展示、经验记录、成长分析

## 📊 数据库设计

### 核心表结构

1. **ability_categories** - 能力类别表（2个类别）
2. **ability_dimensions** - 能力维度表（6个维度）
3. **ability_items** - 能力项表（约50个能力项）
4. **ability_item_level_configs** - 能力项等级配置表（支持全局模板和独立配置）
5. **user_ability_levels** - 用户能力等级表（存储用户每个能力项的等级和经验）
6. **user_ability_experience_logs** - 用户经验获得记录表（记录经验变化历史）

### 等级配置策略

- **全局模板模式**：`item_id` 为 NULL，`is_template=true`，所有能力项默认使用
- **独立配置模式**：`item_id` 不为 NULL，`is_template=false`，该能力项使用独立配置
- **配置优先级**：独立配置 > 全局模板 > 默认配置

### 经验值系统

- 支持固定值配置（如：1级10点，2级100点，3级500点）
- 支持公式计算（可在 metadata 中配置）
- 支持多种经验获得方式（task_complete, daily_practice, assessment 等）
- 自动升级机制：经验值达到要求时自动升级

### 考核机制

- 每个等级可配置是否需要考核（`requires_assessment` 字段）
- 考核类型支持：考试、实践、评审、自定义等
- 考核信息存储在等级配置的 `metadata` 中
- 升级流程：经验值达标 → 完成考核（如需要）→ 自动升级

## 🚀 开发计划

### ✅ 阶段一：数据库设计与迁移（已完成）

- [x] 创建数据库表结构
- [x] 编写数据库迁移脚本 `004_create_ability_model_tables.sql`
- [ ] 初始化基础数据（2个类别、6个维度、约50个能力项）
- [ ] 初始化全局等级模板（默认1-10级）

### 📝 阶段二：后端 API 开发

#### 2.1 实体类定义
- [ ] `AbilityCategory` - 能力类别实体
- [ ] `AbilityDimension` - 能力维度实体
- [ ] `AbilityItem` - 能力项实体
- [ ] `AbilityItemLevelConfig` - 等级配置实体
- [ ] `UserAbilityLevel` - 用户能力等级实体
- [ ] `UserAbilityExperienceLog` - 经验记录实体

#### 2.2 DAO 层
- [ ] `AbilityCategoryDAO` - 能力类别数据访问
- [ ] `AbilityDimensionDAO` - 能力维度数据访问
- [ ] `AbilityItemDAO` - 能力项数据访问
- [ ] `AbilityItemLevelConfigDAO` - 等级配置数据访问
- [ ] `UserAbilityLevelDAO` - 用户能力等级数据访问
- [ ] `UserAbilityExperienceLogDAO` - 经验记录数据访问

#### 2.3 Service 层
- [ ] `AbilityModelService` - 能力模型管理服务
- [ ] `AbilityLevelConfigService` - 等级配置管理服务
- [ ] `UserAbilityService` - 用户能力等级服务
- [ ] `ExperienceService` - 经验值计算和升级服务

#### 2.4 Controller 层
- [ ] `AbilityCategoryController` - 能力类别管理
- [ ] `AbilityDimensionController` - 能力维度管理
- [ ] `AbilityItemController` - 能力项管理
- [ ] `AbilityItemLevelConfigController` - 等级配置管理
- [ ] `UserAbilityController` - 用户能力查询

#### 2.5 API 路由
- [ ] 管理端 API：`/api/admin/ability-*`
- [ ] 用户端 API：`/api/ability/*`

### 🎨 阶段三：前端多入口改造

- [ ] 配置 Vite 多入口（`index.html` 和 `admin.html`）
- [ ] 创建管理端路由配置
- [ ] 创建管理端布局组件
- [ ] 创建用户端路由配置（保持现有）

### 💻 阶段四：管理端开发

- [ ] 能力类别管理页面
- [ ] 能力维度管理页面
- [ ] 能力项管理页面
- [ ] 能力项等级配置管理页面（全局模板 + 独立配置）

### 👤 阶段五：用户端开发

- [ ] 我的能力等级页面
- [ ] 经验获得记录页面
- [ ] 能力雷达图（基于等级）
- [ ] 成长趋势图（基于经验值）

### 🧪 阶段六：测试与优化

- [ ] 功能测试
- [ ] 性能优化
- [ ] 用户体验优化

## 📁 文件结构

```
apps/server/
├── src/
│   ├── entities/
│   │   └── index.ts (新增能力模型相关实体)
│   ├── dao/
│   │   ├── ability-category.dao.ts
│   │   ├── ability-dimension.dao.ts
│   │   ├── ability-item.dao.ts
│   │   ├── ability-item-level-config.dao.ts
│   │   ├── user-ability-level.dao.ts
│   │   └── user-ability-experience-log.dao.ts
│   ├── services/
│   │   ├── ability-model.service.ts
│   │   ├── ability-level-config.service.ts
│   │   ├── user-ability.service.ts
│   │   └── experience.service.ts
│   ├── api/
│   │   ├── ability/
│   │   │   ├── ability-category.controller.ts
│   │   │   ├── ability-dimension.controller.ts
│   │   │   ├── ability-item.controller.ts
│   │   │   ├── ability-item-level-config.controller.ts
│   │   │   └── user-ability.controller.ts
│   └── app/
│       └── api/
│           ├── admin/
│           │   └── ability-*/route.ts
│           └── ability/
│               └── */route.ts
├── migrations/
│   ├── 004_create_ability_model_tables.sql (已完成)
│   └── 005_init_ability_model_data.sql (待创建)
└── docs/
    ├── ability-model-design.md (详细设计文档)
    └── ability-model-README.md (本文件)

apps/growth-client/
├── index.html (用户端入口)
├── admin.html (管理端入口，待创建)
├── vite.config.ts (多入口配置，待修改)
└── src/
    ├── views/
    │   ├── app/ (用户端路由)
    │   └── admin/ (管理端路由，待创建)
    │       ├── ability-categories/
    │       ├── ability-dimensions/
    │       ├── ability-items/
    │       └── ability-level-configs/
    └── stores/
        ├── ability-model/ (能力模型 Store)
        └── user-ability/ (用户能力 Store)
```

## 🔑 关键设计决策

### 1. 等级配置存储方式

**选择独立表而非 metadata**：
- ✅ 等级配置是核心业务逻辑，需要频繁查询和计算
- ✅ 需要支持前端管理页面的 CRUD 操作
- ✅ 需要建立索引优化查询性能
- ✅ 需要数据完整性约束（唯一性、外键等）

### 2. 全局模板 vs 独立配置

**混合模式**：
- 全局模板：适合大多数能力项使用相同等级体系
- 独立配置：适合特殊能力项需要不同等级体系
- 配置优先级：独立配置 > 全局模板 > 默认配置

### 3. 经验值计算

**灵活配置**：
- 固定值：直接在 `required_exp` 字段存储
- 公式计算：在 `metadata` 中配置公式，后端解析计算
- 自定义规则：通过前端管理页面配置，后端统一处理

### 4. 升级机制

**自动升级**：
- 经验值增加时，检查是否达到升级条件
- 支持跨级升级（一次性获得大量经验）
- 记录升级日志到 `user_ability_experience_logs`

## 📚 相关文档

- [详细设计文档](./ability-model-design.md) - 完整的表结构、API 设计、前端设计等
- [数据库迁移脚本](../migrations/004_create_ability_model_tables.sql) - 表结构定义

## 🎯 下一步行动

1. **创建数据初始化脚本**：初始化能力模型基础数据和全局等级模板
2. **实现后端实体类和 DAO 层**：按照设计文档实现数据访问层
3. **实现 Service 层**：实现业务逻辑，特别是经验值计算和升级逻辑
4. **实现 Controller 和 API 路由**：提供 RESTful API
5. **前端多入口配置**：配置 Vite 支持多入口
6. **实现管理端页面**：能力模型管理功能
7. **实现用户端页面**：能力等级展示和分析功能

## ⚠️ 注意事项

1. **数据完整性**：删除能力项时需检查是否有关联的等级配置和用户数据
2. **并发安全**：经验值增加操作需要使用事务和锁机制
3. **性能优化**：能力模型树形结构查询需要优化，避免 N+1 查询
4. **权限控制**：管理端 API 需要管理员权限验证
5. **公式安全**：如果使用公式计算经验值，需要验证公式安全性

