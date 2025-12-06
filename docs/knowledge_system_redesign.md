# 知识系统重构设计方案

## 一、问题分析

### 当前问题

1. **层级关系混乱**
   - 代码中大量使用 `level === -1, 0, 1, 2, 3, 4` 的硬编码判断
   - 层级关系分散在多个表中（subject_domains, subject_categories, subjects, knowledge_points）
   - 知识点层级（parent_point_id）和学科层级混在一起

2. **学习顺序关系管理不统一**
   - 有 `subject_dependencies`（学科依赖）
   - 有 `knowledge_point_dependencies`（知识点依赖）
   - 但依赖关系没有统一管理，且层级关系和学习顺序关系混淆

### 设计目标

1. **统一层级关系管理**：通过数据结构本身管理层级，而不是硬编码 level
2. **统一学习顺序关系管理**：所有节点（无论类型）的学习顺序关系统一管理
3. **消除硬编码**：API 不再需要 `level === xx` 的判断

## 二、核心设计思路

### 2.1 统一的知识节点层级关系

**核心原则**：所有知识节点都通过 `parent_id` 字段形成树形结构

```
知识节点树形结构：
├─ 基础能力（Foundational Ability）
│  └─ parent_id = NULL
│
├─ 学科门类（Subject Domain）
│  └─ parent_id = NULL（顶级节点）
│
├─ 一级学科分类（Subject Category）
│  └─ parent_id = domain_id（属于某个学科门类）
│
├─ 学科（Subject）
│  └─ parent_id = category_id（属于某个分类）
│
└─ 知识点（Knowledge Point）
   └─ parent_id = subject_id 或 point_id（属于某个学科或知识点）
```

### 2.2 统一的学习顺序依赖关系

**核心原则**：任何两个节点之间都可以有学习顺序依赖关系

```
依赖关系示例：
- 学科A → 学科B（学习学科B需要先学学科A）
- 知识点A → 知识点B（学习知识点B需要先学知识点A）
- 学科A → 知识点B（学习知识点B需要先学学科A）
- 知识点A → 学科B（学习学科B需要先学知识点A）
```

## 三、数据库设计

### 3.1 统一的知识节点表（knowledge_nodes）

```sql
CREATE TABLE knowledge_nodes (
    node_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES knowledge_nodes(node_id) ON DELETE CASCADE, -- 父节点ID，NULL表示顶级节点
    node_type VARCHAR(50) NOT NULL CHECK (node_type IN (
        'foundational_ability',  -- 基础能力
        'subject_domain',        -- 学科门类
        'subject_category',      -- 学科分类
        'subject',               -- 学科
        'knowledge_point'        -- 知识点
    )),
    code VARCHAR(50) NOT NULL, -- 节点代码（在 node_type + parent_id 范围内唯一）
    name VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- 节点类型特定的字段（使用 JSONB 存储）
    metadata JSONB DEFAULT '{}'::JSONB, -- 存储类型特定的字段
    
    -- 通用字段
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    
    -- 唯一约束：同一父节点下，code 唯一
    UNIQUE(parent_id, code) WHERE deleted_at IS NULL
);

CREATE INDEX idx_knowledge_nodes_parent_id ON knowledge_nodes(parent_id);
CREATE INDEX idx_knowledge_nodes_node_type ON knowledge_nodes(node_type);
CREATE INDEX idx_knowledge_nodes_code ON knowledge_nodes(code);
CREATE INDEX idx_knowledge_nodes_deleted_at ON knowledge_nodes(deleted_at) WHERE deleted_at IS NULL;
```

**metadata 字段说明**：
- `foundational_ability`: `{}`
- `subject_domain`: `{}`
- `subject_category`: `{ icon_url, level }`
- `subject`: `{ category_id, short_name, icon_url, cover_image_url, is_published }`
- `knowledge_point`: `{ subject_id, difficulty, estimated_time }`

### 3.2 统一的学习顺序依赖关系表（knowledge_dependencies）

```sql
CREATE TABLE knowledge_dependencies (
    dependency_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_node_id UUID NOT NULL REFERENCES knowledge_nodes(node_id) ON DELETE CASCADE, -- 前置节点（需要先学的）
    target_node_id UUID NOT NULL REFERENCES knowledge_nodes(node_id) ON DELETE CASCADE, -- 目标节点（需要后学的）
    dependency_type VARCHAR(20) NOT NULL DEFAULT 'required' CHECK (dependency_type IN ('required', 'recommended')), -- 依赖类型：必需或推荐
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- 唯一约束：每个节点对只能有一个依赖关系
    UNIQUE(source_node_id, target_node_id),
    
    -- 检查约束：不能依赖自己
    CHECK (source_node_id != target_node_id)
);

CREATE INDEX idx_knowledge_dependencies_source_node_id ON knowledge_dependencies(source_node_id);
CREATE INDEX idx_knowledge_dependencies_target_node_id ON knowledge_dependencies(target_node_id);
CREATE INDEX idx_knowledge_dependencies_dependency_type ON knowledge_dependencies(dependency_type);
```

### 3.3 数据迁移策略

由于现有数据已经存在，我们需要：

1. **创建新表**：`knowledge_nodes` 和 `knowledge_dependencies`
2. **迁移现有数据**：
   - `foundational_abilities` → `knowledge_nodes` (node_type = 'foundational_ability')
   - `subject_domains` → `knowledge_nodes` (node_type = 'subject_domain')
   - `subject_categories` → `knowledge_nodes` (node_type = 'subject_category', parent_id = domain_id)
   - `subjects` → `knowledge_nodes` (node_type = 'subject', parent_id = category_id)
   - `knowledge_points` → `knowledge_nodes` (node_type = 'knowledge_point', parent_id = subject_id 或 point_id)
3. **迁移依赖关系**：
   - `subject_dependencies` → `knowledge_dependencies`
   - `knowledge_point_dependencies` → `knowledge_dependencies`
   - `foundational_ability_dependencies` → `knowledge_dependencies`
   - `domain_foundational_ability_requirements` → `knowledge_dependencies`

## 四、API 设计

### 4.1 查询子节点（不再需要 level 参数）

```
GET /api/knowledge/nodes?parent_id={node_id}&node_type={node_type}
- parent_id: 父节点ID（可选，NULL表示查询顶级节点）
- node_type: 节点类型过滤（可选）
- 返回：子节点列表
```

### 4.2 查询节点详情

```
GET /api/knowledge/nodes/{node_id}
- 返回：节点详情（包含层级路径）
```

### 4.3 查询依赖关系

```
GET /api/knowledge/dependencies?source_node_id={node_id}&target_node_id={node_id}
- source_node_id: 前置节点ID（可选）
- target_node_id: 目标节点ID（可选）
- 返回：依赖关系列表
```

### 4.4 查询学习路径

```
GET /api/knowledge/learning-path?node_id={node_id}
- node_id: 目标节点ID
- 返回：学习路径（拓扑排序后的节点列表）
```

## 五、实现步骤

1. ✅ 设计统一的数据结构
2. ⏳ 创建数据库迁移脚本
3. ⏳ 迁移现有数据
4. ⏳ 重构 API（移除 level 判断）
5. ⏳ 更新前端组件
6. ⏳ 测试和验证

## 六、优势

1. **消除硬编码**：不再需要 `level === xx` 的判断
2. **统一管理**：层级关系和学习顺序关系统一管理
3. **灵活扩展**：可以轻松添加新的节点类型
4. **查询简单**：通过 `parent_id` 统一查询子节点
5. **依赖关系清晰**：所有依赖关系在一个表中，易于查询和管理

