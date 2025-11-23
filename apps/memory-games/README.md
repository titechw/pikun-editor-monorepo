# 记忆训练游戏应用

独立的记忆训练游戏应用，包含数字序列、颜色记忆、图形位置等多种游戏类型。

## 技术栈

- React 18
- TypeScript
- Vite

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器（端口 3003）
npm run dev

# 构建
npm run build
```

## 使用

游戏通过 URL 参数接收配置：

- `gameType`: 游戏类型（`number_sequence`、`color_memory`、`shape_position`）
- `secretId`: 课程 secretId（用于验证）
- `courseId`: 课程 ID
- `config`: 难度配置（JSON 字符串，URL 编码）

示例：
```
http://localhost:3003/?gameType=number_sequence&secretId=xxx&courseId=xxx&config=%7B%22sequenceLength%22%3A5%2C%22displayTime%22%3A2.5%7D
```

## 难度配置格式

### 数字序列游戏（number_sequence）
```json
{
  "sequenceLength": 5,
  "displayTime": 2.5
}
```

### 颜色记忆游戏（color_memory）
```json
{
  "colorCount": 6,
  "sequenceLength": 7,
  "displayTime": 1.5
}
```

### 图形位置游戏（shape_position）
```json
{
  "gridSize": 4,
  "shapeCount": 6,
  "displayTime": 2.5
}
```

## 与父窗口通信

游戏通过 `postMessage` 与父窗口通信：

1. **请求 Token**：游戏需要提交结果时，会向父窗口请求用户 token
2. **接收 Token**：父窗口返回 token
3. **提交结果通知**：游戏提交结果后，通知父窗口

## 环境变量

创建 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```





