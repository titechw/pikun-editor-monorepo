# 个人成长规划平台 - 产品设计方案

## 一、产品定位与愿景

### 1.1 产品定位

**个人成长规划平台**是一个结合 OKR（目标与关键结果）方法论和任务管理系统的综合性成长规划工具，旨在帮助用户（包括成人和儿童）系统性地规划、跟踪和实现个人成长目标。

### 1.2 核心价值主张

- **系统化成长**：通过 OKR 框架将模糊的成长愿望转化为可执行的目标体系
- **家庭协作**：支持家长与孩子共同规划成长路径，促进家庭沟通与协作
- **智能规划**：基于用户目标自动生成学习路径、内容推荐和实践方案
- **激励驱动**：通过奖励机制持续激励用户完成目标，形成正向循环
- **数据洞察**：通过进度跟踪和数据分析，帮助用户了解成长轨迹

### 1.3 目标用户

1. **个人用户**：希望系统规划自身成长的成年人
2. **家长用户**：希望帮助孩子规划成长路径的父母
3. **儿童用户**：具备一定自主规划能力的孩子（通常 8 岁以上）

## 二、核心功能模块

### 2.1 用户与家庭管理模块

#### 2.1.1 用户角色体系

```
用户角色：
├── 管理员（Admin）
│   ├── 可以创建和管理家庭
│   ├── 可以为家庭成员（包括自己）创建 OKR 和任务
│   ├── 可以查看所有成员的进度（根据权限）
│   └── 可以管理奖励系统
│
├── 成员（Member）
│   ├── 可以为自己创建 OKR 和任务
│   ├── 可以设置内容的可见性（私有/对管理员可见）
│   ├── 可以查看自己的进度和奖励
│   └── 可以参与家庭活动
│
└── 孩子（Child）
    ├── 可以为自己创建 OKR 和任务（需管理员审核）
    ├── 可以查看自己的进度和奖励
    ├── 可以参与家庭活动
    └── 内容默认对管理员可见（可设置部分私有）
```

#### 2.1.2 家庭管理

- **家庭创建**：用户注册时自动创建默认家庭（仅包含自己）
- **家庭成员管理**：
  - 邀请成员加入家庭（通过邮箱/手机号）
  - 设置成员角色（管理员/成员/孩子）
  - 管理成员权限
- **家庭设置**：
  - 家庭名称、头像
  - 家庭目标与价值观
  - 奖励规则配置

### 2.2 OKR 目标管理模块

#### 2.2.1 OKR 结构

```
Objective（目标）
├── 描述：用户想要达成的高层次目标
├── 时间周期：季度/半年/年度
├── 状态：进行中/已完成/已暂停/已取消
└── Key Results（关键结果）
    ├── 描述：可量化的关键结果
    ├── 目标值：数值目标
    ├── 当前值：当前进度
    ├── 完成度：百分比
    └── 关联任务：关联的具体任务列表
```

#### 2.2.2 OKR 创建流程

1. **目标输入**：

   - 用户输入想要达成的目标（如"学会 Python 编程"、"提高英语水平"）
   - 系统通过 AI 分析，帮助用户细化目标

2. **关键结果生成**：

   - 系统基于目标自动生成建议的关键结果
   - 用户可以选择、修改或自定义关键结果
   - 每个关键结果需要设置可量化的目标值

3. **学习路径规划**：

   - 系统基于 OKR 自动生成学习路径
   - 学习路径包含：学习内容、考试/评估、训练场/实践项目

4. **任务自动创建**：
   - 系统将学习路径转化为具体任务
   - 任务自动关联到对应的关键结果

#### 2.2.3 OKR 跟踪

- **进度可视化**：通过图表展示 OKR 完成度
- **关键结果跟踪**：实时更新关键结果的当前值
- **里程碑提醒**：在关键节点提醒用户
- **回顾与调整**：支持定期回顾和调整 OKR

### 2.3 任务管理模块

#### 2.3.1 任务类型

1. **学习任务**：

   - 阅读文章/书籍
   - 观看视频课程
   - 完成在线课程

2. **实践任务**：

   - 完成编程练习
   - 完成项目作业
   - 参与训练场活动

3. **考试/评估任务**：

   - 完成知识测试
   - 完成技能评估
   - 完成项目评审

4. **自定义任务**：
   - 用户自定义的任务类型

#### 2.3.2 任务属性

```
Task（任务）
├── 标题：任务名称
├── 描述：详细说明
├── 类型：学习/实践/考试/自定义
├── 优先级：高/中/低
├── 状态：待开始/进行中/已完成/已取消
├── 截止日期：可选
├── 关联 OKR：关联的目标和关键结果
├── 关联内容：关联的学习内容/考试/训练场
├── 完成条件：完成标准（如：分数 >= 80）
├── 奖励积分：完成后的奖励
└── 子任务：可拆分的子任务列表
```

#### 2.3.3 任务管理功能

- **任务创建**：

  - 手动创建
  - 从学习路径自动创建
  - 从模板创建

- **任务执行**：

  - 任务详情查看
  - 内容学习/实践
  - 进度更新

- **任务完成**：
  - 手动标记完成
  - 自动检测完成（如：考试分数达标）
  - 完成验证（管理员审核或系统自动验证）

### 2.4 学习路径规划模块

#### 2.4.1 学习路径生成

基于用户目标，系统自动生成学习路径：

```
学习路径示例（目标：学会 Python 编程）
├── 阶段 1：Python 基础（2 周）
│   ├── 学习内容：Python 语法基础课程
│   ├── 实践任务：完成 10 个基础练习题
│   ├── 考试：Python 基础测试（目标分数：80）
│   └── 训练场：Python 基础训练场
│
├── 阶段 2：数据结构与算法（3 周）
│   ├── 学习内容：数据结构与算法课程
│   ├── 实践任务：实现常见数据结构
│   ├── 考试：算法测试（目标分数：75）
│   └── 训练场：算法训练场
│
└── 阶段 3：项目实践（4 周）
    ├── 学习内容：项目开发最佳实践
    ├── 实践任务：完成一个完整项目
    ├── 考试：项目评审（目标分数：85）
    └── 训练场：项目实战训练场
```

#### 2.4.2 学习路径管理

- **路径可视化**：以时间线或流程图展示学习路径
- **路径调整**：用户可以根据实际情况调整路径
- **路径推荐**：基于用户进度和表现推荐优化路径

### 2.5 学习内容管理模块

#### 2.5.1 内容类型

1. **文章/文档**：

   - 技术文章
   - 教程文档
   - 知识总结

2. **视频课程**：

   - 在线视频
   - 录播课程
   - 直播课程

3. **在线课程**：

   - 互动式课程
   - 分章节课程
   - 带练习的课程

4. **书籍**：
   - 电子书
   - 阅读进度跟踪

#### 2.5.2 内容推荐

- **基于目标推荐**：根据用户的 OKR 推荐相关学习内容
- **基于进度推荐**：根据用户当前学习阶段推荐内容
- **基于兴趣推荐**：根据用户历史学习行为推荐内容
- **个性化推荐**：结合用户画像进行个性化推荐

#### 2.5.3 内容学习

- **内容查看**：支持多种内容格式的查看
- **学习进度跟踪**：自动跟踪学习进度
- **笔记功能**：支持在学习过程中做笔记
- **收藏功能**：支持收藏感兴趣的内容

### 2.6 考试/评估系统模块

#### 2.6.1 考试类型

1. **知识测试**：

   - 选择题
   - 判断题
   - 填空题
   - 简答题

2. **技能评估**：

   - 编程题
   - 项目评审
   - 作品评估

3. **综合评估**：
   - 多维度评估
   - 360 度评估（家庭成员评估）

#### 2.6.2 考试流程

1. **考试创建**：

   - 系统自动生成（基于学习路径）
   - 管理员创建
   - 从题库选择

2. **考试执行**：

   - 在线答题
   - 时间限制
   - 自动评分（客观题）
   - 人工评分（主观题）

3. **结果分析**：
   - 分数统计
   - 错题分析
   - 能力评估
   - 改进建议

#### 2.6.3 题库管理

- **题库分类**：按领域、难度、类型分类
- **题目管理**：支持题目的增删改查
- **自动组卷**：基于规则自动生成试卷

### 2.7 训练场/实践平台模块

#### 2.7.1 训练场类型

1. **编程训练场**：

   - 在线代码编辑器
   - 代码运行环境
   - 测试用例验证

2. **项目训练场**：

   - 项目模板
   - 项目脚手架
   - 项目评审

3. **模拟训练场**：
   - 场景模拟
   - 角色扮演
   - 实战演练

#### 2.7.2 训练场功能

- **环境提供**：提供实践所需的环境和工具
- **进度跟踪**：跟踪实践进度和成果
- **成果展示**：展示实践成果
- **社区分享**：支持分享实践成果到社区

### 2.8 奖励系统模块

#### 2.8.1 奖励类型

1. **积分奖励**：

   - 完成任务获得积分
   - 完成 OKR 获得积分
   - 连续学习获得积分

2. **徽章奖励**：

   - 成就徽章
   - 里程碑徽章
   - 特殊成就徽章

3. **等级奖励**：

   - 用户等级系统
   - 等级特权

4. **实物奖励**（可选）：
   - 兑换实物奖品
   - 家庭奖励池

#### 2.8.2 奖励规则

- **任务完成奖励**：不同任务类型有不同积分
- **OKR 完成奖励**：完成关键结果和目标的额外奖励
- **连续学习奖励**：连续学习天数奖励
- **家庭协作奖励**：家庭成员协作完成目标的奖励

#### 2.8.3 奖励展示

- **积分商城**：使用积分兑换奖励
- **成就墙**：展示所有获得的徽章和成就
- **排行榜**：家庭内或平台内的排行榜

### 2.9 进度跟踪与数据分析模块

#### 2.9.1 进度跟踪

- **OKR 进度**：实时跟踪 OKR 完成度
- **任务进度**：跟踪任务完成情况
- **学习进度**：跟踪学习内容完成情况
- **时间统计**：统计学习时间、任务耗时等

#### 2.9.2 数据分析

- **成长曲线**：展示用户成长趋势
- **能力雷达图**：展示各项能力水平
- **时间分析**：分析时间分配和效率
- **目标达成率**：统计目标达成情况

#### 2.9.3 数据报告

- **周报**：每周自动生成进度报告
- **月报**：每月生成详细分析报告
- **年报**：年度成长总结报告
- **自定义报告**：用户自定义报告内容

## 三、数据模型设计

### 3.1 核心实体

#### 3.1.1 用户（User）

```typescript
interface User {
  id: string; // 用户 ID
  email: string; // 邮箱
  phone?: string; // 手机号
  name: string; // 姓名
  avatar?: string; // 头像
  role: 'admin' | 'member' | 'child'; // 角色
  family_id: string; // 所属家庭 ID
  created_at: Date; // 创建时间
  updated_at: Date; // 更新时间
}
```

#### 3.1.2 家庭（Family）

```typescript
interface Family {
  id: string; // 家庭 ID
  name: string; // 家庭名称
  avatar?: string; // 家庭头像
  admin_id: string; // 管理员用户 ID
  settings: {
    reward_rules?: RewardRule[]; // 奖励规则
    privacy_settings?: PrivacySettings; // 隐私设置
  };
  created_at: Date;
  updated_at: Date;
}
```

#### 3.1.3 家庭成员关系（FamilyMember）

```typescript
interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string;
  role: 'admin' | 'member' | 'child';
  joined_at: Date;
  permissions: {
    can_view_okrs: boolean; // 可以查看 OKR
    can_create_okrs: boolean; // 可以创建 OKR
    can_view_tasks: boolean; // 可以查看任务
    can_manage_rewards: boolean; // 可以管理奖励
  };
}
```

#### 3.1.4 目标（Objective）

```typescript
interface Objective {
  id: string;
  user_id: string; // 所属用户
  family_id: string; // 所属家庭
  title: string; // 目标标题
  description?: string; // 目标描述
  period: 'quarter' | 'half_year' | 'year'; // 时间周期
  start_date: Date; // 开始日期
  end_date: Date; // 结束日期
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  visibility: 'private' | 'family' | 'public'; // 可见性
  created_at: Date;
  updated_at: Date;
}
```

#### 3.1.5 关键结果（KeyResult）

```typescript
interface KeyResult {
  id: string;
  objective_id: string; // 所属目标
  title: string; // 关键结果标题
  description?: string; // 描述
  target_value: number; // 目标值
  current_value: number; // 当前值
  unit: string; // 单位（如：分、个、小时）
  completion_rate: number; // 完成度（0-100）
  status: 'active' | 'completed' | 'paused';
  created_at: Date;
  updated_at: Date;
}
```

#### 3.1.6 任务（Task）

```typescript
interface Task {
  id: string;
  user_id: string; // 所属用户
  objective_id?: string; // 关联目标（可选）
  key_result_id?: string; // 关联关键结果（可选）
  title: string; // 任务标题
  description?: string; // 任务描述
  type: 'learning' | 'practice' | 'exam' | 'custom';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date?: Date; // 截止日期
  completed_at?: Date; // 完成时间
  completion_criteria?: {
    // 完成条件
    type: 'manual' | 'auto';
    condition?: any; // 条件配置
  };
  reward_points: number; // 奖励积分
  content_id?: string; // 关联学习内容
  exam_id?: string; // 关联考试
  practice_id?: string; // 关联训练场
  parent_task_id?: string; // 父任务（子任务）
  created_at: Date;
  updated_at: Date;
}
```

#### 3.1.7 学习路径（LearningPath）

```typescript
interface LearningPath {
  id: string;
  user_id: string;
  objective_id: string; // 关联目标
  title: string; // 路径标题
  description?: string; // 描述
  stages: LearningStage[]; // 学习阶段
  status: 'draft' | 'active' | 'completed';
  created_at: Date;
  updated_at: Date;
}

interface LearningStage {
  id: string;
  learning_path_id: string;
  title: string; // 阶段标题
  description?: string; // 阶段描述
  order: number; // 顺序
  duration_days: number; // 预计天数
  content_ids: string[]; // 学习内容 IDs
  exam_id?: string; // 阶段考试
  practice_id?: string; // 阶段训练场
  tasks: Task[]; // 阶段任务
}
```

#### 3.1.8 学习内容（Content）

```typescript
interface Content {
  id: string;
  title: string; // 标题
  description?: string; // 描述
  type: 'article' | 'video' | 'course' | 'book';
  url?: string; // 内容链接
  duration_minutes?: number; // 时长（分钟）
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[]; // 标签
  metadata: {
    author?: string;
    source?: string;
    [key: string]: any;
  };
  created_at: Date;
  updated_at: Date;
}
```

#### 3.1.9 考试（Exam）

```typescript
interface Exam {
  id: string;
  title: string; // 考试标题
  description?: string; // 描述
  type: 'knowledge' | 'skill' | 'comprehensive';
  questions: Question[]; // 题目列表
  total_score: number; // 总分
  passing_score: number; // 及格分数
  duration_minutes?: number; // 考试时长
  created_at: Date;
  updated_at: Date;
}

interface Question {
  id: string;
  type:
    | 'single_choice'
    | 'multiple_choice'
    | 'true_false'
    | 'fill_blank'
    | 'short_answer'
    | 'programming';
  question: string; // 题目
  options?: string[]; // 选项（选择题）
  correct_answer: any; // 正确答案
  score: number; // 分值
  explanation?: string; // 解析
}
```

#### 3.1.10 训练场（Practice）

```typescript
interface Practice {
  id: string;
  title: string; // 训练场标题
  description?: string; // 描述
  type: 'coding' | 'project' | 'simulation';
  environment_config: {
    // 环境配置
    language?: string; // 编程语言
    framework?: string; // 框架
    tools?: string[]; // 工具列表
  };
  template?: string; // 模板代码/项目
  test_cases?: TestCase[]; // 测试用例
  created_at: Date;
  updated_at: Date;
}

interface TestCase {
  id: string;
  input: any; // 输入
  expected_output: any; // 期望输出
  description?: string; // 描述
}
```

#### 3.1.11 奖励（Reward）

```typescript
interface Reward {
  id: string;
  user_id: string; // 获得奖励的用户
  family_id: string; // 所属家庭
  type: 'points' | 'badge' | 'level' | 'physical';
  name: string; // 奖励名称
  description?: string; // 描述
  points?: number; // 积分数量
  badge_id?: string; // 徽章 ID
  level?: number; // 等级
  source: {
    // 奖励来源
    type: 'task' | 'okr' | 'streak' | 'family' | 'custom';
    task_id?: string;
    objective_id?: string;
    key_result_id?: string;
  };
  created_at: Date;
}
```

#### 3.1.12 用户进度（UserProgress）

```typescript
interface UserProgress {
  id: string;
  user_id: string;
  date: Date; // 日期
  learning_time_minutes: number; // 学习时长（分钟）
  tasks_completed: number; // 完成任务数
  points_earned: number; // 获得积分
  streak_days: number; // 连续学习天数
  created_at: Date;
}
```

### 3.2 关系设计

```
User (1) ──< (N) FamilyMember (N) >── (1) Family
User (1) ──< (N) Objective
Objective (1) ──< (N) KeyResult
Objective (1) ──< (1) LearningPath
LearningPath (1) ──< (N) LearningStage
LearningStage (N) >── (1) Content
LearningStage (N) >── (1) Exam
LearningStage (N) >── (1) Practice
Task (N) >── (1) Objective (可选)
Task (N) >── (1) KeyResult (可选)
Task (N) >── (1) Content (可选)
Task (N) >── (1) Exam (可选)
Task (N) >── (1) Practice (可选)
User (1) ──< (N) Reward
User (1) ──< (N) UserProgress
```

## 四、功能流程设计

### 4.1 用户注册与初始化流程

```
1. 用户注册
   ├── 输入邮箱/手机号、密码
   ├── 验证邮箱/手机号
   └── 创建用户账户

2. 自动创建默认家庭
   ├── 创建家庭（名称：用户姓名 + "的家庭"）
   ├── 设置用户为管理员
   └── 设置默认奖励规则

3. 引导流程
   ├── 欢迎页面
   ├── 功能介绍
   └── 创建第一个 OKR（可选）
```

### 4.2 OKR 创建流程

```
1. 目标输入
   ├── 用户输入目标描述（如："学会 Python 编程"）
   └── 系统 AI 分析目标

2. 目标细化
   ├── 系统生成目标建议
   ├── 用户选择或自定义
   └── 设置时间周期

3. 关键结果生成
   ├── 系统基于目标生成关键结果建议
   ├── 用户选择、修改或自定义
   └── 为每个关键结果设置目标值

4. 学习路径生成
   ├── 系统分析目标，生成学习路径
   ├── 用户查看和调整学习路径
   └── 确认学习路径

5. 任务自动创建
   ├── 系统将学习路径转化为任务
   ├── 任务关联到关键结果
   └── 用户查看和调整任务

6. OKR 创建完成
   └── 进入 OKR 详情页面
```

### 4.3 任务执行流程

```
1. 查看任务列表
   ├── 按状态筛选（待开始/进行中/已完成）
   ├── 按优先级排序
   └── 查看任务详情

2. 开始任务
   ├── 点击"开始任务"
   ├── 更新任务状态为"进行中"
   └── 记录开始时间

3. 执行任务
   ├── 学习任务：查看学习内容
   ├── 实践任务：进入训练场
   ├── 考试任务：进入考试
   └── 更新任务进度

4. 完成任务
   ├── 手动标记完成
   ├── 或系统自动检测完成（如：考试分数达标）
   └── 验证完成条件

5. 获得奖励
   ├── 系统计算奖励积分
   ├── 更新用户积分
   └── 检查是否获得徽章
```

### 4.4 学习内容学习流程

```
1. 内容推荐
   ├── 基于 OKR 推荐
   ├── 基于学习路径推荐
   └── 基于兴趣推荐

2. 开始学习
   ├── 查看内容详情
   ├── 开始学习（打开文章/视频/课程）
   └── 记录学习开始时间

3. 学习过程
   ├── 查看内容
   ├── 做笔记（可选）
   ├── 收藏内容（可选）
   └── 更新学习进度

4. 完成学习
   ├── 标记为已完成
   ├── 更新学习时长
   └── 关联任务自动更新进度
```

### 4.5 考试流程

```
1. 考试准备
   ├── 查看考试信息
   ├── 查看考试范围
   └── 开始考试

2. 答题过程
   ├── 显示题目
   ├── 用户答题
   ├── 保存答案
   └── 计时（如有时间限制）

3. 提交考试
   ├── 确认提交
   ├── 系统自动评分（客观题）
   └── 等待人工评分（主观题）

4. 查看结果
   ├── 显示分数
   ├── 显示错题
   ├── 显示解析
   └── 显示能力评估

5. 更新任务
   ├── 如果分数达标，自动完成任务
   └── 获得奖励
```

### 4.6 训练场实践流程

```
1. 进入训练场
   ├── 查看训练场信息
   ├── 查看环境配置
   └── 启动训练环境

2. 实践过程
   ├── 使用提供的工具和环境
   ├── 完成实践任务
   ├── 运行测试用例（如有）
   └── 保存实践成果

3. 提交成果
   ├── 提交代码/项目
   ├── 系统自动验证（如有测试用例）
   └── 等待评审（如需要）

4. 查看结果
   ├── 显示验证结果
   ├── 显示评审意见
   └── 更新任务状态
```

### 4.7 奖励获得流程

```
1. 触发奖励事件
   ├── 完成任务
   ├── 完成关键结果
   ├── 完成目标
   ├── 连续学习
   └── 家庭协作

2. 计算奖励
   ├── 根据奖励规则计算积分
   ├── 检查是否获得徽章
   ├── 检查是否升级
   └── 检查是否获得实物奖励

3. 发放奖励
   ├── 更新用户积分
   ├── 发放徽章
   ├── 更新等级
   └── 通知用户

4. 奖励展示
   ├── 显示奖励通知
   ├── 更新成就墙
   └── 更新排行榜
```

## 五、技术架构设计

### 5.1 前端架构

#### 5.1.1 技术栈

- **框架**：React 18 + TypeScript
- **构建工具**：Vite
- **状态管理**：MobX
- **路由**：React Router DOM
- **UI 组件库**：Ant Design
- **样式方案**：TailwindCSS + Less
- **HTTP 客户端**：Axios

#### 5.1.2 目录结构

```
apps/growth-client/
├── src/
│   ├── api/                    # API 接口
│   │   ├── auth.api.ts
│   │   ├── family.api.ts
│   │   ├── okr.api.ts
│   │   ├── task.api.ts
│   │   ├── content.api.ts
│   │   ├── exam.api.ts
│   │   ├── practice.api.ts
│   │   └── reward.api.ts
│   │
│   ├── stores/                # MobX Store
│   │   ├── auth.store.ts
│   │   ├── family.store.ts
│   │   ├── okr.store.ts
│   │   ├── task.store.ts
│   │   ├── content.store.ts
│   │   ├── reward.store.ts
│   │   └── theme.store.ts
│   │
│   ├── views/                 # 页面组件
│   │   ├── auth/              # 认证页面
│   │   │   ├── Login/
│   │   │   └── Register/
│   │   ├── dashboard/         # 仪表盘
│   │   │   └── Dashboard/
│   │   ├── family/            # 家庭管理
│   │   │   ├── FamilyList/
│   │   │   └── FamilyDetail/
│   │   ├── okr/               # OKR 管理
│   │   │   ├── OKRList/
│   │   │   ├── OKRDetail/
│   │   │   └── OKRCreate/
│   │   ├── task/              # 任务管理
│   │   │   ├── TaskList/
│   │   │   ├── TaskDetail/
│   │   │   └── TaskCreate/
│   │   ├── content/           # 学习内容
│   │   │   ├── ContentList/
│   │   │   └── ContentDetail/
│   │   ├── exam/              # 考试
│   │   │   ├── ExamList/
│   │   │   ├── ExamDetail/
│   │   │   └── ExamResult/
│   │   ├── practice/          # 训练场
│   │   │   ├── PracticeList/
│   │   │   └── PracticeDetail/
│   │   ├── reward/            # 奖励
│   │   │   ├── RewardCenter/
│   │   │   ├── BadgeWall/
│   │   │   └── Leaderboard/
│   │   └── app/               # 应用入口
│   │       ├── index.tsx
│   │       └── Router.tsx
│   │
│   ├── components/            # 通用组件
│   │   ├── OKRCard/
│   │   ├── TaskCard/
│   │   ├── ProgressChart/
│   │   ├── LearningPath/
│   │   └── RewardBadge/
│   │
│   ├── utils/                # 工具函数
│   │   ├── apiClient.ts
│   │   ├── formatDate.ts
│   │   └── validation.ts
│   │
│   └── styles/               # 样式文件
│       ├── index.css
│       └── theme.less
│
├── package.json
└── tsconfig.json
```

### 5.2 后端架构

#### 5.2.1 技术栈

- **框架**：Next.js 14 (App Router)
- **语言**：TypeScript
- **数据库**：PostgreSQL
- **缓存**：Redis
- **依赖注入**：tsyringe
- **验证**：zod + class-validator
- **认证**：JWT

#### 5.2.2 目录结构

```
apps/server/
├── src/
│   ├── api/                   # API 路由（Controller 层）
│   │   ├── auth/
│   │   ├── family/
│   │   ├── okr/
│   │   ├── task/
│   │   ├── content/
│   │   ├── exam/
│   │   ├── practice/
│   │   └── reward/
│   │
│   ├── services/              # 业务逻辑层（Service 层）
│   │   ├── auth.service.ts
│   │   ├── family.service.ts
│   │   ├── okr.service.ts
│   │   ├── task.service.ts
│   │   ├── content.service.ts
│   │   ├── exam.service.ts
│   │   ├── practice.service.ts
│   │   ├── reward.service.ts
│   │   └── ai.service.ts      # AI 服务（用于生成学习路径等）
│   │
│   ├── dao/                    # 数据访问层（DAO 层）
│   │   ├── user.dao.ts
│   │   ├── family.dao.ts
│   │   ├── okr.dao.ts
│   │   ├── task.dao.ts
│   │   ├── content.dao.ts
│   │   ├── exam.dao.ts
│   │   ├── practice.dao.ts
│   │   └── reward.dao.ts
│   │
│   ├── entities/              # 实体类
│   │   ├── user.entity.ts
│   │   ├── family.entity.ts
│   │   ├── okr.entity.ts
│   │   ├── task.entity.ts
│   │   └── ...
│   │
│   ├── dto/                    # 数据传输对象
│   │   ├── auth.dto.ts
│   │   ├── okr.dto.ts
│   │   └── ...
│   │
│   ├── core/                   # 核心功能
│   │   ├── container.ts       # 依赖注入容器
│   │   ├── database.ts        # 数据库连接
│   │   └── redis.ts           # Redis 连接
│   │
│   └── utils/                  # 工具函数
│       ├── jwt.util.ts
│       ├── password.util.ts
│       └── ai.util.ts          # AI 工具函数
│
└── migrations/                 # 数据库迁移文件
```

### 5.3 AI 集成设计

#### 5.3.1 AI 功能

1. **目标分析**：

   - 分析用户输入的目标
   - 提取关键信息
   - 生成目标建议

2. **学习路径生成**：

   - 基于目标生成学习路径
   - 推荐学习内容
   - 规划学习阶段

3. **内容推荐**：

   - 基于用户画像推荐内容
   - 基于学习进度推荐内容
   - 个性化推荐

4. **智能问答**：
   - 回答用户问题
   - 提供学习建议
   - 解答疑惑

#### 5.3.2 AI 服务接口

```typescript
interface AIService {
  // 分析目标
  analyzeObjective(goal: string): Promise<ObjectiveAnalysis>;

  // 生成学习路径
  generateLearningPath(objective: Objective): Promise<LearningPath>;

  // 推荐内容
  recommendContent(userId: string, context: RecommendationContext): Promise<Content[]>;

  // 智能问答
  answerQuestion(question: string, context: QuestionContext): Promise<Answer>;
}
```

### 5.4 数据库设计

#### 5.4.1 核心表结构

```sql
-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  name VARCHAR(100) NOT NULL,
  avatar TEXT,
  role VARCHAR(20) NOT NULL DEFAULT 'member',
  family_id UUID REFERENCES families(id),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 家庭表
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  avatar TEXT,
  admin_id UUID REFERENCES users(id),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 家庭成员表
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,
  permissions JSONB DEFAULT '{}',
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(family_id, user_id)
);

-- 目标表
CREATE TABLE objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  period VARCHAR(20) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  visibility VARCHAR(20) NOT NULL DEFAULT 'private',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 关键结果表
CREATE TABLE key_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  objective_id UUID REFERENCES objectives(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_value NUMERIC NOT NULL,
  current_value NUMERIC DEFAULT 0,
  unit VARCHAR(50) NOT NULL,
  completion_rate NUMERIC DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 任务表
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  objective_id UUID REFERENCES objectives(id) ON DELETE SET NULL,
  key_result_id UUID REFERENCES key_results(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL,
  priority VARCHAR(20) NOT NULL DEFAULT 'medium',
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  due_date TIMESTAMP,
  completed_at TIMESTAMP,
  completion_criteria JSONB,
  reward_points INTEGER DEFAULT 0,
  content_id UUID,
  exam_id UUID,
  practice_id UUID,
  parent_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 学习路径表
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  objective_id UUID REFERENCES objectives(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  stages JSONB NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 学习内容表
CREATE TABLE contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL,
  url TEXT,
  duration_minutes INTEGER,
  difficulty VARCHAR(20) NOT NULL,
  tags TEXT[],
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 考试表
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL,
  questions JSONB NOT NULL,
  total_score NUMERIC NOT NULL,
  passing_score NUMERIC NOT NULL,
  duration_minutes INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 训练场表
CREATE TABLE practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL,
  environment_config JSONB DEFAULT '{}',
  template TEXT,
  test_cases JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 奖励表
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  points INTEGER,
  badge_id UUID,
  level INTEGER,
  source JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 用户进度表
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  learning_time_minutes INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- 创建索引
CREATE INDEX idx_users_family_id ON users(family_id);
CREATE INDEX idx_objectives_user_id ON objectives(user_id);
CREATE INDEX idx_objectives_family_id ON objectives(family_id);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_objective_id ON tasks(objective_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_rewards_user_id ON rewards(user_id);
CREATE INDEX idx_user_progress_user_id_date ON user_progress(user_id, date);
```

## 六、用户体验设计

### 6.1 界面设计原则

1. **简洁清晰**：界面简洁，信息层次清晰
2. **易于操作**：操作流程简单，减少用户学习成本
3. **视觉引导**：通过视觉元素引导用户完成关键操作
4. **反馈及时**：操作后及时反馈，让用户了解系统状态
5. **个性化**：支持个性化设置，满足不同用户需求

### 6.2 关键页面设计

#### 6.2.1 仪表盘（Dashboard）

- **顶部**：用户信息、家庭切换、通知
- **中部**：
  - OKR 概览卡片（进行中的 OKR、完成度）
  - 任务列表（今日任务、待办任务）
  - 学习进度（本周学习时长、连续学习天数）
  - 奖励展示（积分、徽章、等级）
- **底部**：最近活动、成长曲线

#### 6.2.2 OKR 详情页

- **顶部**：OKR 基本信息、进度条
- **中部**：
  - 关键结果列表（每个关键结果的进度）
  - 关联任务列表
  - 学习路径可视化
- **底部**：时间线、里程碑

#### 6.2.3 任务列表页

- **筛选器**：按状态、优先级、类型筛选
- **任务卡片**：
  - 任务标题、描述
  - 状态、优先级标签
  - 关联 OKR
  - 截止日期
  - 奖励积分
  - 操作按钮（开始/完成）

#### 6.2.4 学习内容页

- **内容展示区**：文章/视频/课程内容
- **侧边栏**：
  - 目录/章节列表
  - 笔记面板
  - 相关推荐
- **底部**：进度条、完成按钮

#### 6.2.5 奖励中心

- **积分展示**：总积分、本周获得积分
- **徽章墙**：所有徽章展示
- **等级系统**：当前等级、下一等级进度
- **排行榜**：家庭内/平台内排名
- **积分商城**：可用积分兑换的奖励

### 6.3 交互设计

#### 6.3.1 创建 OKR 流程

1. **引导式创建**：

   - 分步骤引导用户创建 OKR
   - 每步提供示例和提示
   - 支持跳过非必填项

2. **智能建议**：

   - 基于用户输入提供建议
   - 展示相似 OKR 案例
   - 推荐学习路径

3. **预览确认**：
   - 创建前预览完整 OKR
   - 支持修改
   - 确认后创建

#### 6.3.2 任务执行交互

1. **快速操作**：

   - 任务卡片支持快速操作（开始/完成）
   - 支持拖拽排序
   - 支持批量操作

2. **进度反馈**：

   - 实时更新任务进度
   - 显示完成百分比
   - 完成时显示奖励动画

3. **提醒机制**：
   - 截止日期提醒
   - 长时间未更新提醒
   - 完成里程碑提醒

## 七、实施计划

### 7.1 开发阶段

#### 阶段一：基础功能（MVP）

**目标**：实现核心功能，支持基本的 OKR 和任务管理

**功能清单**：

- [x] 用户注册登录
- [ ] 家庭管理（基础）
- [ ] OKR 创建和管理
- [ ] 任务创建和管理
- [ ] 基础奖励系统（积分）
- [ ] 进度跟踪（基础）

**预计时间**：4-6 周

#### 阶段二：学习功能

**目标**：实现学习路径、内容管理和考试功能

**功能清单**：

- [ ] 学习路径生成（AI 辅助）
- [ ] 学习内容管理
- [ ] 内容推荐
- [ ] 考试系统
- [ ] 学习进度跟踪

**预计时间**：4-6 周

#### 阶段三：实践与奖励

**目标**：实现训练场和完整奖励系统

**功能清单**：

- [ ] 训练场功能
- [ ] 完整奖励系统（徽章、等级）
- [ ] 排行榜
- [ ] 数据分析报告

**预计时间**：3-4 周

#### 阶段四：优化与扩展

**目标**：优化用户体验，扩展高级功能

**功能清单**：

- [ ] AI 智能推荐优化
- [ ] 高级数据分析
- [ ] 社区功能（可选）
- [ ] 移动端适配

**预计时间**：持续迭代

### 7.2 技术实施优先级

1. **高优先级**：

   - 用户认证与授权
   - 家庭管理
   - OKR 和任务管理
   - 基础数据模型

2. **中优先级**：

   - 学习路径生成
   - 内容管理
   - 考试系统
   - 奖励系统

3. **低优先级**：
   - 训练场
   - 高级数据分析
   - 社区功能

## 八、风险与挑战

### 8.1 技术风险

1. **AI 集成复杂度**：

   - **风险**：AI 服务集成可能复杂，响应时间可能较长
   - **应对**：使用缓存、异步处理、降级方案

2. **数据一致性**：

   - **风险**：多用户、多角色场景下数据一致性挑战
   - **应对**：使用事务、乐观锁、事件驱动架构

3. **性能问题**：
   - **风险**：大量数据查询可能影响性能
   - **应对**：数据库索引优化、缓存策略、分页加载

### 8.2 产品风险

1. **用户粘性**：

   - **风险**：用户可能无法坚持使用
   - **应对**：优化奖励机制、增加社交元素、定期提醒

2. **内容质量**：

   - **风险**：学习内容质量可能参差不齐
   - **应对**：内容审核机制、用户评价、推荐优质内容

3. **目标设定**：
   - **风险**：用户可能设定不切实际的目标
   - **应对**：提供目标建议、引导用户设定合理目标

### 8.3 运营风险

1. **内容成本**：

   - **风险**：高质量内容获取成本高
   - **应对**：UGC 内容、合作伙伴内容、AI 生成内容

2. **用户获取**：
   - **风险**：用户获取成本高
   - **应对**：口碑传播、家庭推荐机制、免费试用

## 九、成功指标

### 9.1 用户指标

- **注册用户数**：目标 1000+ 用户（3 个月）
- **活跃用户数**：日活 30%+，周活 60%+
- **用户留存率**：次日留存 50%+，7 日留存 30%+

### 9.2 功能指标

- **OKR 创建率**：注册用户中 70%+ 创建至少一个 OKR
- **任务完成率**：任务完成率 60%+
- **学习时长**：平均每日学习时长 30 分钟+

### 9.3 业务指标

- **家庭使用率**：50%+ 用户加入或创建家庭
- **奖励参与度**：80%+ 用户获得过奖励
- **内容消费**：平均每个用户消费 10+ 个学习内容

## 十、总结

本产品设计方案旨在创建一个结合 OKR 方法论和任务管理系统的个人成长规划平台。通过系统化的目标管理、智能化的学习路径规划、丰富的学习内容和实践平台，以及有效的奖励机制，帮助用户（包括成人和儿童）实现个人成长目标。

**核心优势**：

1. **系统化**：通过 OKR 框架将成长目标系统化
2. **智能化**：AI 辅助生成学习路径和内容推荐
3. **家庭化**：支持家庭协作，促进家庭沟通
4. **激励化**：通过奖励机制持续激励用户
5. **数据化**：通过数据分析帮助用户了解成长轨迹

**下一步行动**：

1. 评审产品设计方案
2. 确定技术架构细节
3. 开始 MVP 开发
4. 收集用户反馈
5. 持续迭代优化

---

**文档版本**：v1.0  
**创建日期**：2024-11-07  
**最后更新**：2024-11-07
