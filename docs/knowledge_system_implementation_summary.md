# 知识系统重构实施总结

## 一、已完成的工作

### 1. 设计方案文档
- ✅ `docs/knowledge_system_redesign.md` - 完整的设计方案文档

### 2. 数据库迁移脚本
- ✅ `apps/server/migrations/028_create_unified_knowledge_system.sql` - 创建统一的知识节点表和依赖关系表
- ✅ `apps/server/migrations/029_migrate_data_to_unified_knowledge_system.sql` - 数据迁移脚本

### 3. 后端服务
- ✅ `apps/server/src/services/knowledge-node.service.ts` - 统一的知识节点服务
- ✅ `apps/server/src/api/knowledge/knowledge.controller.ts` - 统一的知识节点控制器

### 4. 依赖注入注册
- ✅ 在 `apps/server/src/core/init.ts` 中注册了 `KnowledgeNodeService`

## 二、核心设计

### 2.1 统一的知识节点表（knowledge_nodes）

**特点**：
- 所有类型的知识节点（基础能力、学科门类、分类、学科、知识点）都在一个表中
- 通过 `parent_id` 字段形成树形结构，不再需要硬编码的 `level`
- 通过 `node_type` 字段区分节点类型
- 类型特定的字段存储在 `metadata` JSONB 字段中

**节点类型**：
- `foundational_ability` - 基础能力
- `subject_domain` - 学科门类
- `subject_category` - 学科分类
- `subject` - 学科
- `knowledge_point` - 知识点

### 2.2 统一的学习顺序依赖关系表（knowledge_dependencies）

**特点**：
- 任何两个节点之间都可以有学习顺序依赖关系
- 不区分节点类型，学科可以依赖学科，知识点可以依赖知识点，知识点也可以依赖学科
- 支持 `required`（必需）和 `recommended`（推荐）两种依赖类型
- 自动防止循环依赖

## 三、API 设计

### 3.1 查询子节点（不再需要 level 参数）

```
GET /api/knowledge/nodes?parent_id={node_id}&node_type={node_type}
- parent_id: 父节点ID（可选，null表示查询顶级节点）
- node_type: 节点类型过滤（可选）
- 返回：子节点列表
```

### 3.2 查询节点详情

```
GET /api/knowledge/nodes/{node_id}
- 返回：节点详情（包含层级路径）
```

### 3.3 查询节点的子节点（用于层级展示）

```
GET /api/knowledge/nodes/{node_id}/children?node_type={node_type}
- 返回：父节点 + 子节点列表 + 层级关系边 + 学习顺序依赖边
```

### 3.4 查询依赖关系

```
GET /api/knowledge/dependencies?source_node_id={source_id}&target_node_id={target_id}
- source_node_id: 前置节点ID（可选）
- target_node_id: 目标节点ID（可选）
- 返回：依赖关系列表
```

### 3.5 查询学习路径

```
GET /api/knowledge/learning-path?node_id={node_id}
- node_id: 目标节点ID
- 返回：学习路径（拓扑排序后的节点列表）
```

## 四、待完成的工作

### 1. 创建 API 路由文件
需要在 Next.js App Router 中创建路由文件：
- `apps/server/src/app/api/knowledge/nodes/route.ts`
- `apps/server/src/app/api/knowledge/nodes/[node_id]/route.ts`
- `apps/server/src/app/api/knowledge/nodes/[node_id]/children/route.ts`
- `apps/server/src/app/api/knowledge/dependencies/route.ts`
- `apps/server/src/app/api/knowledge/learning-path/route.ts`

### 2. 执行数据库迁移
```bash
# 执行迁移脚本
psql -d your_database -f apps/server/migrations/028_create_unified_knowledge_system.sql
psql -d your_database -f apps/server/migrations/029_migrate_data_to_unified_knowledge_system.sql
```

### 3. 更新前端组件
- 更新 `apps/growth-client/src/views/app/knowledge/index.tsx` 使用新的 API
- 更新 `apps/growth-client/src/components/KnowledgeGraph/HierarchicalKnowledgeGraph.tsx` 适配新的数据结构
- 移除所有 `level` 相关的硬编码逻辑

### 4. 测试和验证
- 测试数据迁移是否正确
- 测试新的 API 是否正常工作
- 测试前端组件是否能正确显示层级关系和学习顺序关系

## 五、优势

1. **消除硬编码**：不再需要 `level === xx` 的判断
2. **统一管理**：层级关系和学习顺序关系统一管理
3. **灵活扩展**：可以轻松添加新的节点类型
4. **查询简单**：通过 `parent_id` 统一查询子节点
5. **依赖关系清晰**：所有依赖关系在一个表中，易于查询和管理

## 六、迁移注意事项

1. **数据迁移**：迁移脚本会保留原有的所有数据，不会丢失
2. **向后兼容**：旧的 API 可以继续使用，但建议逐步迁移到新 API
3. **性能考虑**：统一表结构后，查询性能可能会有所提升（减少了 JOIN 操作）

## 七、下一步

1. 创建 API 路由文件
2. 执行数据库迁移
3. 更新前端组件
4. 测试和验证
5. 逐步废弃旧的 API（可选）

