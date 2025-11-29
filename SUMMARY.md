# 课程管理系统完整实现总结

## ✅ 已完成的工作

### 1. 数据库扩展
- ✅ 扩展了 `courses` 表，添加了课程管理所需字段
- ✅ 创建了数据库迁移文件

### 2. 游戏应用独立化
- ✅ **3D 游戏**：`apps/3d-game`（端口 3002）
- ✅ **记忆训练游戏**：`apps/memory-games`（端口 3003）
  - 数字序列记忆游戏
  - 颜色记忆游戏
  - 图形位置记忆游戏
- ✅ 所有游戏都支持通过 URL 参数配置
- ✅ 所有游戏都支持通过 iframe 嵌入

### 3. 后端实现
- ✅ 课程管理 API（管理端）
- ✅ 课程查询 API（C端，只返回已发布的）
- ✅ 游戏结果提交 API（通过 secretId 验证）

### 4. 前端实现
- ✅ 管理端课程管理页面（`/admin/courses`）
- ✅ C 端课程游戏组件（`CourseGame`）- **通过 iframe 加载游戏**
- ✅ 游戏与父窗口的通信机制（postMessage）

### 5. Nginx 配置
- ✅ 配置了前端、3D游戏、记忆游戏、后端的代理
- ✅ 支持 iframe 嵌入

## 📋 课程加载方式

**是的，课程是基于 iframe 加载的！**

### 流程说明

1. **C 端查询课程**：
   ```typescript
   const courses = await courseApi.getCourses();
   ```

2. **选择课程后，使用 CourseGame 组件**：
   ```tsx
   <CourseGame course={selectedCourse} />
   ```

3. **CourseGame 组件通过 iframe 加载游戏**：
   ```tsx
   <iframe
     src={gameUrl}  // 包含 secretId 和 courseId
     width="100%"
     height="600px"
   />
   ```

4. **游戏与父窗口通信**：
   - 游戏请求 token：`window.parent.postMessage({ type: 'REQUEST_TOKEN' })`
   - 父窗口返回 token：`iframe.contentWindow.postMessage({ type: 'TOKEN_RESPONSE', token })`
   - 游戏提交结果后通知父窗口：`window.parent.postMessage({ type: 'GAME_RESULT', data })`

## 🎮 游戏应用

### 3D 游戏（apps/3d-game）
- 端口：3002
- URL 格式：`http://localhost:3002/?secretId=xxx&courseId=xxx`

### 记忆训练游戏（apps/memory-games）
- 端口：3003
- URL 格式：`http://localhost:3003/?gameType=number_sequence&secretId=xxx&courseId=xxx&config={config}`

支持的 gameType：
- `number_sequence` - 数字序列记忆
- `color_memory` - 颜色记忆
- `shape_position` - 图形位置记忆

## 📝 在管理端创建课程

创建课程时，需要填写游戏 URL。示例：

### 3D 游戏课程
```
http://localhost:3002/?secretId={secretId}&courseId={courseId}
```

### 记忆训练游戏课程
```
http://localhost:3003/?gameType=number_sequence&secretId={secretId}&courseId={courseId}&config=%7B%22sequenceLength%22%3A5%2C%22displayTime%22%3A2.5%7D
```

注意：`{secretId}` 和 `{courseId}` 会在创建课程后自动生成，可以先用占位符，创建后再更新。

## 🚀 启动服务

```bash
# 后端（端口 3000）
cd apps/server && npm run dev

# 前端（端口 3001）
cd apps/growth-client && npm run dev

# 3D 游戏（端口 3002）
cd apps/3d-game && npm install && npm run dev

# 记忆训练游戏（端口 3003）
cd apps/memory-games && npm install && npm run dev

# Nginx（端口 8080）
nginx -c /path/to/nginx.conf
```

## 📌 关键点

1. **所有游戏都已独立**：3D 游戏和记忆训练游戏都在 `apps` 目录下
2. **课程通过 iframe 加载**：`CourseGame` 组件使用 iframe 嵌入游戏
3. **游戏通过 postMessage 通信**：游戏可以请求 token，提交结果后通知父窗口
4. **secretId 验证**：游戏提交结果时，后端会验证 secretId 和 courseId

## 🔄 后续优化

1. 在管理端课程创建页面，添加游戏类型选择器，自动构建游戏 URL
2. 支持从记忆训练关卡配置自动生成游戏 URL
3. 添加游戏预览功能
4. 实现 C 端课程列表和详情页面










