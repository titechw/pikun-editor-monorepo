# 记忆训练系统完整设计方案

## 一、系统架构

### 1.1 核心概念

- **记忆训练游戏（Memory Training Game）**：一种训练记忆力的游戏类型（如：数字序列、颜色记忆、图形位置等）
- **游戏关卡（Game Level）**：每个游戏有多个关卡，难度递增
- **关卡难度参数（Level Difficulty）**：每个关卡的具体难度配置（序列长度、显示时间等）
- **用户关卡进度（User Level Progress）**：记录用户在每个关卡的完成情况和最佳成绩

### 1.2 系统流程

```
用户进入记忆训练
    ↓
显示游戏列表（多种游戏类型）
    ↓
选择游戏
    ↓
显示关卡列表（按难度排序）
    ↓
选择关卡（根据用户能力等级推荐）
    ↓
开始游戏
    ↓
完成游戏，提交结果
    ↓
更新经验值、解锁下一关卡
```

## 二、数据库设计

### 2.1 记忆训练游戏表（memory_training_games）

存储游戏类型信息。

```sql
CREATE TABLE IF NOT EXISTS pikun_db.memory_training_games (
    game_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE, -- 'number_sequence', 'color_memory', 'shape_position' 等
    name VARCHAR(100) NOT NULL, -- '数字序列记忆', '颜色记忆' 等
    description TEXT, -- 游戏描述
    icon VARCHAR(100), -- 游戏图标（emoji 或图标名称）
    game_type VARCHAR(50) NOT NULL, -- 游戏类型分类
    ability_item_id UUID REFERENCES pikun_db.ability_items(item_id) ON DELETE SET NULL, -- 关联的能力项（记忆力）
    min_ability_level INTEGER DEFAULT 1, -- 最低能力等级要求
    max_ability_level INTEGER DEFAULT 10, -- 最高能力等级
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::JSONB, -- 游戏配置、规则说明等
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);
```

### 2.2 游戏关卡表（memory_training_levels）

存储每个游戏的关卡配置。

```sql
CREATE TABLE IF NOT EXISTS pikun_db.memory_training_levels (
    level_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES pikun_db.memory_training_games(game_id) ON DELETE CASCADE,
    level_number INTEGER NOT NULL, -- 关卡编号（1, 2, 3...）
    name VARCHAR(100), -- 关卡名称（如：'初级挑战'、'中级挑战'）
    description TEXT, -- 关卡描述
    difficulty_config JSONB NOT NULL, -- 难度配置（序列长度、显示时间等）
    required_ability_level INTEGER DEFAULT 1, -- 推荐的能力等级
    base_exp_reward INTEGER DEFAULT 10, -- 基础经验值奖励
    unlock_condition JSONB DEFAULT '{}'::JSONB, -- 解锁条件（如：需要完成前置关卡）
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    UNIQUE(game_id, level_number)
);
```

**difficulty_config 示例**：
```json
{
  "sequenceLength": 5,
  "displayTime": 2.5,
  "gridSize": 4,
  "shapeCount": 5,
  "positionCount": 7,
  "colorCount": 6
}
```

### 2.3 用户关卡进度表（user_memory_level_progress）

记录用户在每个关卡的进度和最佳成绩。

```sql
CREATE TABLE IF NOT EXISTS pikun_db.user_memory_level_progress (
    progress_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    level_id UUID NOT NULL REFERENCES pikun_db.memory_training_levels(level_id) ON DELETE CASCADE,
    is_unlocked BOOLEAN NOT NULL DEFAULT false, -- 是否已解锁
    is_completed BOOLEAN NOT NULL DEFAULT false, -- 是否已完成
    best_score INTEGER DEFAULT 0, -- 最佳得分
    best_correct_rate DECIMAL(5,2) DEFAULT 0, -- 最佳正确率
    best_time_spent INTEGER, -- 最佳用时（毫秒）
    completion_count INTEGER DEFAULT 0, -- 完成次数
    total_exp_earned BIGINT DEFAULT 0, -- 累计获得经验值
    first_completed_at TIMESTAMP WITH TIME ZONE, -- 首次完成时间
    last_played_at TIMESTAMP WITH TIME ZONE, -- 最后游玩时间
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(uid, level_id)
);
```

## 三、后端 API 设计

### 3.1 游戏管理 API（Admin）

#### 3.1.1 游戏管理

- `GET /api/admin/memory-training/games` - 获取游戏列表
- `POST /api/admin/memory-training/games` - 创建游戏
- `GET /api/admin/memory-training/games/:id` - 获取游戏详情
- `PUT /api/admin/memory-training/games/:id` - 更新游戏
- `DELETE /api/admin/memory-training/games/:id` - 删除游戏

#### 3.1.2 关卡管理

- `GET /api/admin/memory-training/games/:gameId/levels` - 获取游戏关卡列表
- `POST /api/admin/memory-training/games/:gameId/levels` - 创建关卡
- `GET /api/admin/memory-training/levels/:id` - 获取关卡详情
- `PUT /api/admin/memory-training/levels/:id` - 更新关卡
- `DELETE /api/admin/memory-training/levels/:id` - 删除关卡

### 3.2 用户端 API

#### 3.2.1 游戏列表

- `GET /api/memory-training/games` - 获取已发布的游戏列表

#### 3.2.2 关卡列表

- `GET /api/memory-training/games/:gameId/levels` - 获取游戏关卡列表（包含用户进度）

#### 3.2.3 游戏结果提交

- `POST /api/memory-training/submit-result` - 提交游戏结果
  ```json
  {
    "levelId": "uuid",
    "resultData": {
      "correct": true,
      "correctRate": 1.0,
      "score": 100,
      "timeSpent": 5000,
      "userAnswer": {...}
    }
  }
  ```

#### 3.2.4 用户进度

- `GET /api/memory-training/progress` - 获取用户所有关卡进度
- `GET /api/memory-training/games/:gameId/progress` - 获取指定游戏的进度

## 四、前端设计

### 4.1 页面结构

```
/training/memory
  ├── 游戏列表页面（默认）
  │   └── 显示所有记忆训练游戏
  │
  ├── /training/memory/:gameId
  │   └── 关卡选择页面
  │       └── 显示该游戏的所有关卡
  │
  └── /training/memory/:gameId/:levelId
      └── 游戏界面
          └── 根据游戏类型渲染对应的游戏组件
```

### 4.2 游戏列表页面

- 显示所有已发布的记忆训练游戏
- 每个游戏卡片显示：图标、名称、描述、推荐等级、已解锁关卡数
- 点击游戏卡片进入关卡选择页面

### 4.3 关卡选择页面

- 显示该游戏的所有关卡（按关卡编号排序）
- 每个关卡卡片显示：
  - 关卡编号和名称
  - 难度参数预览
  - 解锁状态（已解锁/未解锁）
  - 完成状态（已完成/未完成）
  - 最佳成绩（得分、正确率、用时）
- 点击已解锁的关卡进入游戏

### 4.4 游戏界面

- 根据游戏类型（code）渲染对应的游戏组件
- 游戏完成后显示结果
- 提交结果到后端
- 更新关卡进度和解锁状态

## 五、Admin 管理端设计

### 5.1 游戏管理页面

- 列表展示所有游戏
- 新增/编辑/删除游戏
- 配置游戏基本信息、图标、描述等

### 5.2 关卡管理页面

- 选择游戏后，显示该游戏的所有关卡
- 新增/编辑/删除关卡
- 配置关卡难度参数（JSON 编辑器）
- 设置解锁条件
- 设置经验值奖励

## 六、游戏类型和关卡设计示例

### 6.1 数字序列记忆游戏

**关卡设计**：
- 关卡1：3位数字，显示3秒
- 关卡2：4位数字，显示3秒
- 关卡3：5位数字，显示2.5秒
- 关卡4：6位数字，显示2.5秒
- 关卡5：7位数字，显示2秒
- ...（逐步增加难度）

### 6.2 颜色记忆游戏

**关卡设计**：
- 关卡1：4种颜色，4个位置，显示2秒
- 关卡2：5种颜色，5个位置，显示2秒
- 关卡3：6种颜色，6个位置，显示1.5秒
- ...（逐步增加）

### 6.3 图形位置记忆游戏

**关卡设计**：
- 关卡1：3x3网格，3个图形，显示3秒
- 关卡2：3x3网格，4个图形，显示2.5秒
- 关卡3：4x4网格，5个图形，显示3秒
- 关卡4：4x4网格，6个图形，显示2.5秒
- 关卡5：5x5网格，7个图形，显示3秒
- ...（逐步增加）

## 七、经验值计算

根据关卡基础经验值和游戏表现计算：

```typescript
基础经验值 = 关卡配置的 base_exp_reward
表现加成 = 正确率 * 速度加成 * 连续完成加成
最终经验值 = 基础经验值 * 表现加成

速度加成：
- 快速完成（< 平均时间50%）：1.3
- 正常完成（50%-150%）：1.0
- 慢速完成（> 150%）：0.8

连续完成加成：
- 连续完成3个关卡：1.1
- 连续完成5个关卡：1.2
- 连续完成10个关卡：1.5
```

## 八、解锁机制

### 8.1 关卡解锁条件

1. **能力等级要求**：用户能力等级 >= 关卡 required_ability_level
2. **前置关卡**：完成前置关卡（unlock_condition.previousLevelId）
3. **首次进入**：第一个关卡默认解锁

### 8.2 自动解锁

- 完成一个关卡后，自动解锁下一个关卡（如果满足能力等级要求）





