# 前端实现说明

## 已完成的功能

### 1. API 客户端封装 ✅
- `src/utils/apiClient.ts` - 统一的 HTTP 客户端，支持 token 管理
- `src/api/auth.api.ts` - 认证相关 API
- `src/api/document.api.ts` - 文档相关 API（包含 Yjs 文档编码保存）

### 2. Store 层（MobX）✅
- `src/stores/auth.store.ts` - 认证状态管理
- `src/stores/document.store.ts` - 文档状态管理（包含防抖保存）

### 3. 页面组件 ✅
- `src/views/auth/Login.tsx` - 登录注册页面
- `src/views/documents/DocumentList.tsx` - 文档列表页面
- `src/views/documents/DocumentEditor.tsx` - 文档编辑器页面（支持自动保存）
- `src/views/documents/DocumentHistory.tsx` - 文档历史记录页面
- `src/views/app/Router.tsx` - 路由配置

### 4. 文档更新和保存机制 ✅

参考 AppFlowy 的实现方式：

1. **使用 Yjs 进行协作**：
   - 编辑器使用 Yjs Doc 存储文档内容
   - 通过 TiptapCollabProvider 进行实时同步

2. **文档保存机制**：
   - **自动保存**：监听编辑器 `update` 事件，使用防抖机制（2秒）自动保存
   - **手动保存**：提供保存按钮，立即保存
   - **保存方式**：将 Yjs 文档编码为 Base64 后发送到服务器
     ```typescript
     const update = Y.encodeStateAsUpdate(ydoc);
     const base64Content = btoa(String.fromCharCode(...update));
     ```

3. **文档更新流程**：
   - 用户编辑 → Yjs 更新 → 防抖保存 → 编码为 Base64 → 发送到服务器
   - 服务器接收后解码并保存到数据库

## 关键实现细节

### 文档保存（参考 AppFlowy）

```typescript
// 在 DocumentEditor.tsx 中
useEffect(() => {
  if (!editor || !objectId || !ydocRef.current) return;

  const handleUpdate = () => {
    // 防抖保存：2秒后保存
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(async () => {
      try {
        await documentStore.saveDocument(
          DEFAULT_WORKSPACE_ID,
          objectId,
          ydocRef.current!,
          false
        );
        message.success('已自动保存', 1);
      } catch (error: any) {
        message.error(error.message || '保存失败');
      }
    }, 2000);
  };

  editor.on('update', handleUpdate);
  return () => {
    editor.off('update', handleUpdate);
  };
}, [editor, objectId]);
```

### Yjs 文档编码

```typescript
// 在 document.api.ts 中
async saveDocument(
  workspaceId: string,
  objectId: string,
  ydoc: Y.Doc
): Promise<{ object_id: string; updated_at: string }> {
  // 将 Yjs 文档编码为 Uint8Array，然后转为 Base64
  const update = Y.encodeStateAsUpdate(ydoc);
  const base64Content = btoa(String.fromCharCode(...update));

  return this.updateDocument(workspaceId, objectId, {
    content: base64Content,
  });
}
```

## 路由配置

- `/login` - 登录注册页面
- `/documents` - 文档列表
- `/documents/:objectId` - 文档编辑器
- `/documents/:objectId/history` - 文档历史记录

## 待完善的功能

1. **文档加载**：从服务器加载文档内容并解码到 Yjs
2. **实时协作**：完善 WebSocket 连接和实时同步
3. **历史恢复**：实现恢复到指定版本的功能
4. **工作空间管理**：实现工作空间的创建和管理
5. **权限控制**：实现文档级别的权限控制

## 安装依赖

```bash
cd apps/editor-demo
pnpm install
```

## 环境变量配置

创建 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## 启动开发服务器

```bash
pnpm dev
```




