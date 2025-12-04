# 知识图谱层级设计文档

## 一、设计理念

知识图谱应该体现学习的层次性和逻辑关系，从最基础的能力到具体的知识点，形成一个完整的学习路径。

## 二、层级结构设计

### 2.1 完整层级结构

```
Level -1: 基础能力（Foundational Abilities）
  ├─ 识字能力
  ├─ 基础数学
  ├─ 逻辑推理
  ├─ 阅读理解
  └─ ...

Level 0: 学科门类（Subject Domains）
  ├─ 自然科学
  ├─ 社会科学
  ├─ 人文科学
  ├─ 工程技术
  └─ ...

Level 1: 一级学科分类（Subject Categories）
  ├─ 数学（属于自然科学）
  ├─ 物理（属于自然科学）
  ├─ 化学（属于自然科学）
  ├─ 经济学（属于社会科学）
  └─ ...

Level 2: 学科（Subjects）
  ├─ 高等数学（属于数学分类）
  ├─ 线性代数（属于数学分类）
  └─ ...

Level 3: 知识点（Knowledge Points）
  ├─ 导数（属于高等数学）
  ├─ 积分（属于高等数学）
  └─ ...
```

### 2.2 层级说明

1. **Level -1: 基础能力**
   - 所有学科学习的公共前提
   - 包括：识字、基础数学、逻辑推理、阅读理解等
   - 这些能力是学习任何学科的基础

2. **Level 0: 学科门类**
   - 将一级学科分类进行更高层级的归类
   - 例如：自然科学、社会科学、人文科学等
   - 用于逻辑分组，避免62个分类平铺显示

3. **Level 1: 一级学科分类**
   - 当前的62个一级学科分类
   - 属于某个学科门类

4. **Level 2: 学科**
   - 具体的学科，属于某个一级分类

5. **Level 3: 知识点**
   - 学科下的具体知识点

## 三、数据库设计

### 3.1 基础能力表（foundational_abilities）

存储所有学科学习前需要的基础能力。

```sql
CREATE TABLE foundational_abilities (
    ability_id UUID PRIMARY KEY,
    code VARCHAR(50) UNIQUE,
    name VARCHAR(200),
    description TEXT,
    sort_order INTEGER
);
```

### 3.2 学科门类表（subject_domains）

将一级学科分类进行更高层级的归类。

```sql
CREATE TABLE subject_domains (
    domain_id UUID PRIMARY KEY,
    code VARCHAR(50) UNIQUE,
    name VARCHAR(200),
    description TEXT,
    sort_order INTEGER
);
```

### 3.3 学科门类与分类映射表（domain_category_mappings）

关联学科门类和一级学科分类。

```sql
CREATE TABLE domain_category_mappings (
    mapping_id UUID PRIMARY KEY,
    domain_id UUID REFERENCES subject_domains(domain_id),
    category_id UUID REFERENCES subject_categories(category_id),
    sort_order INTEGER,
    UNIQUE(domain_id, category_id)
);
```

### 3.4 基础能力依赖关系表（foundational_ability_dependencies）

基础能力之间可能有依赖关系（如：阅读理解需要识字能力）。

```sql
CREATE TABLE foundational_ability_dependencies (
    dependency_id UUID PRIMARY KEY,
    ability_id UUID REFERENCES foundational_abilities(ability_id),
    prerequisite_ability_id UUID REFERENCES foundational_abilities(ability_id),
    dependency_type VARCHAR(20) -- 'required' | 'recommended'
);
```

### 3.5 学科门类对基础能力的要求表（domain_foundational_ability_requirements）

定义每个学科门类需要哪些基础能力。

```sql
CREATE TABLE domain_foundational_ability_requirements (
    requirement_id UUID PRIMARY KEY,
    domain_id UUID REFERENCES subject_domains(domain_id),
    ability_id UUID REFERENCES foundational_abilities(ability_id),
    requirement_type VARCHAR(20) -- 'required' | 'recommended'
);
```

## 四、API 设计

### 4.1 分层知识地图 API

```
GET /api/subject/hierarchical-knowledge-map?level=-1
  → 返回基础能力列表

GET /api/subject/hierarchical-knowledge-map?level=0
  → 返回学科门类列表

GET /api/subject/hierarchical-knowledge-map?level=1&parent_id=domain_id
  → 返回指定学科门类下的一级学科分类

GET /api/subject/hierarchical-knowledge-map?level=2&parent_id=category_id
  → 返回指定分类下的学科

GET /api/subject/hierarchical-knowledge-map?level=3&parent_id=subject_id
  → 返回指定学科下的知识点
```

### 4.2 依赖关系 API

```
GET /api/subject/foundational-abilities
  → 获取所有基础能力

GET /api/subject/domains
  → 获取所有学科门类

GET /api/subject/domains/{domain_id}/categories
  → 获取指定学科门类下的一级学科分类

GET /api/subject/domains/{domain_id}/foundational-abilities
  → 获取指定学科门类需要的基础能力
```

## 五、展示设计

### 5.1 布局方式

1. **Level -1（基础能力）**：
   - 作为起点，显示在图的左侧或顶部
   - 可以按重要性或依赖关系排列

2. **Level 0（学科门类）**：
   - 按逻辑分组显示
   - 每个学科门类作为一个分组
   - 基础能力连接到各个学科门类

3. **Level 1（一级学科分类）**：
   - 在对应的学科门类下显示
   - 使用分组布局，避免平铺成一条线

4. **Level 2（学科）**：
   - 在对应的一级分类下显示

5. **Level 3（知识点）**：
   - 在对应的学科下显示

### 5.2 视觉设计

- **基础能力节点**：使用特殊的样式（如：圆形、特殊颜色）
- **学科门类节点**：使用较大的节点，作为分组标题
- **一级分类节点**：在学科门类下分组显示
- **学科节点**：在分类下显示
- **知识点节点**：最小的节点

### 5.3 交互设计

- 点击基础能力 → 显示需要该能力的所有学科门类
- 点击学科门类 → 显示该门类下的一级学科分类
- 点击一级分类 → 显示该分类下的学科
- 点击学科 → 显示该学科下的知识点

## 六、实施步骤

1. ✅ 创建基础能力表和学科门类表
2. ✅ 创建关联表和依赖关系表
3. ⏳ 初始化基础能力和学科门类数据
4. ⏳ 将一级学科分类映射到学科门类
5. ⏳ 更新 API 以支持新的层级结构
6. ⏳ 更新前端组件以支持分组布局
7. ⏳ 实现基础能力到学科门类的连接显示

