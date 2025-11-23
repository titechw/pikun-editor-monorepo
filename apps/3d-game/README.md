# 3D 记忆训练游戏

独立的 3D 游戏应用，可以通过 iframe 嵌入到课程系统中。

## 技术栈

- React 18
- TypeScript
- Vite
- Three.js (@react-three/fiber)
- @react-three/drei

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

## 使用

游戏通过 URL 参数接收配置：

- `secretId`: 课程 secretId（用于验证）
- `courseId`: 课程 ID

示例：
```
http://localhost:3002/?secretId=xxx&courseId=xxx
```

## 与父窗口通信

游戏通过 `postMessage` 与父窗口通信：

1. **请求 Token**：游戏需要提交结果时，会向父窗口请求用户 token
   ```typescript
   window.parent.postMessage({ type: 'REQUEST_TOKEN' }, '*');
   ```

2. **接收 Token**：父窗口返回 token
   ```typescript
   window.addEventListener('message', (event) => {
     if (event.data.type === 'TOKEN_RESPONSE') {
       const token = event.data.token;
     }
   });
   ```

3. **提交结果通知**：游戏提交结果后，通知父窗口
   ```typescript
   window.parent.postMessage({
     type: 'GAME_RESULT',
     data: { expEarned, levelUp, newLevel }
   }, '*');
   ```

## 环境变量

创建 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```





