# 记忆训练游戏独立迁移总结

## 已完成的工作

### 1. 创建独立的记忆训练游戏应用
- ✅ 创建了 `apps/memory-games` 独立应用
- ✅ 迁移了以下游戏组件：
  - `NumberSequenceGame` - 数字序列记忆
  - `ColorMemoryGame` - 颜色记忆
  - `ShapePositionGame` - 图形位置记忆
- ✅ 移除了对 MobX 和 Ant Design 的依赖，使用原生 React 和 CSS
- ✅ 实现了统一的游戏入口，通过 URL 参数指定游戏类型

### 2. 游戏配置方式

游戏通过 URL 参数接收配置：

```
http://localhost:3003/?gameType=number_sequence&secretId=xxx&courseId=xxx&config=%7B%22sequenceLength%22%3A5%2C%22displayTime%22%3A2.5%7D
```

参数说明：
- `gameType`: 游戏类型（`number_sequence`、`color_memory`、`shape_position`）
- `secretId`: 课程 secretId（用于验证）
- `courseId`: 课程 ID
- `config`: 难度配置（JSON 字符串，URL 编码）

### 3. 课程加载方式

**是的，课程是基于 iframe 加载的！**

前端查询到课程后，使用 `CourseGame` 组件通过 iframe 加载游戏：

```tsx
<CourseGame course={course} />
```

`CourseGame` 组件会：
1. 构建游戏 URL（包含 secretId 和 courseId）
2. 通过 iframe 加载游戏
3. 监听游戏的消息（请求 token、提交结果等）
4. 向游戏发送 token

### 4. Nginx 配置

已更新 `nginx.conf`，添加了记忆训练游戏的代理：

```nginx
# 记忆训练游戏应用
location /memory-games/ {
    proxy_pass http://memory-games/;
    # ... 其他配置
}
```

### 5. C 端课程 API

- ✅ 创建了 C 端课程查询 API
- ✅ 只返回已发布的课程
- ✅ 支持分页和搜索

## 使用流程

### 1. 在管理端创建课程

1. 访问 `/admin/courses`
2. 创建课程，填写：
   - 课程名称、描述
   - 课程类型：能力训练/技能知识
   - **游戏URL**：根据游戏类型填写
     - 3D 游戏：`http://localhost:3002/?secretId={secretId}&courseId={courseId}`
     - 记忆训练游戏：`http://localhost:3003/?gameType=number_sequence&secretId={secretId}&courseId={courseId}&config={config}`
   - 关联能力项

### 2. 在 C 端使用课程

1. C 端查询课程列表（`courseApi.getCourses()`）
2. 选择课程后，使用 `CourseGame` 组件加载：
   ```tsx
   import { CourseGame } from '@/views/app/training/CourseGame';
   
   <CourseGame course={selectedCourse} />
   ```
3. `CourseGame` 组件会自动通过 iframe 加载游戏

### 3. 游戏 URL 构建示例

对于记忆训练游戏，需要在管理端创建课程时，构建完整的 URL：

```typescript
// 示例：数字序列记忆游戏
const gameType = 'number_sequence';
const config = {
  sequenceLength: 5,
  displayTime: 2.5
};
const configStr = encodeURIComponent(JSON.stringify(config));
const gameUrl = `http://localhost:3003/?gameType=${gameType}&secretId={secretId}&courseId={courseId}&config=${configStr}`;
```

## 游戏应用端口

- **3D 游戏**：`apps/3d-game` - 端口 3002
- **记忆训练游戏**：`apps/memory-games` - 端口 3003
- **前端**：`apps/growth-client` - 端口 3001
- **后端**：`apps/server` - 端口 3000

## 注意事项

1. **游戏 URL 构建**：在管理端创建课程时，需要手动构建包含所有参数的 URL
2. **难度配置**：记忆训练游戏的难度配置需要 JSON 编码后作为 URL 参数传递
3. **iframe 通信**：游戏通过 postMessage 与父窗口通信，需要确保消息类型匹配
4. **Token 传递**：游戏会向父窗口请求 token，父窗口需要响应

## 后续优化建议

1. 在管理端课程创建页面，添加游戏类型选择器，自动构建游戏 URL
2. 支持从记忆训练关卡配置自动生成游戏 URL
3. 添加游戏预览功能
4. 优化游戏 URL 构建逻辑，支持更友好的配置方式





