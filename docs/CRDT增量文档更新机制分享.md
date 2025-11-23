# CRDT 增量文档更新机制分享

> 分享时间：15-20 分钟  
> 基于 editor-demo 项目的实际实现

---

## 📋 目录

1. [什么是 CRDT？](#什么是-crdt)
2. [为什么需要 CRDT？](#为什么需要-crdt)
3. [CRDT 核心原理](#crdt-核心原理)
4. [Yjs 简介](#yjs-简介)
5. [editor-demo 中的实现](#editor-demo-中的实现)
6. [增量更新完整流程](#增量更新完整流程)
7. [性能优化策略](#性能优化策略)
8. [总结](#总结)

---

## 什么是 CRDT？

### 定义

**CRDT** = **Conflict-free Replicated Data Type**（无冲突复制数据类型）

> 一种数据结构，可以在多个副本之间同步，**无需协调**即可保证最终一致性。

### 核心特性

✅ **无冲突合并**：多个用户同时编辑，自动合并，不会丢失数据  
✅ **最终一致性**：所有副本最终会收敛到相同状态  
✅ **无需中央协调**：不需要服务器仲裁，可以离线工作  
✅ **可交换性**：操作顺序不影响最终结果

### 类比理解

想象一下：

- **传统方式**：像 Git 合并，需要解决冲突
- **CRDT 方式**：像 Google Docs，多人同时编辑，自动合并

---

## 为什么需要 CRDT？

### 传统方案的痛点

#### 1. 操作转换（OT - Operational Transformation）

```typescript
// 问题：需要知道操作顺序
用户 A: 在位置 5 插入 "Hello"
用户 B: 在位置 3 插入 "World"

// 需要转换操作顺序
// 如果 B 的操作先到达服务器，A 的操作需要转换
```

**问题**：
- ❌ 需要中央服务器协调
- ❌ 网络延迟会导致冲突
- ❌ 离线编辑困难

#### 2. 最后写入获胜（LWW - Last Write Wins）

```typescript
// 问题：会丢失数据
用户 A: 设置 value = "A" (时间戳: 10:00)
用户 B: 设置 value = "B" (时间戳: 10:01)

// 结果：value = "B"，A 的修改丢失
```

**问题**：
- ❌ 会丢失数据
- ❌ 不适合协作编辑

### CRDT 的优势

✅ **自动合并**：无需手动解决冲突  
✅ **离线支持**：可以离线编辑，上线后自动同步  
✅ **实时协作**：多人同时编辑，实时看到对方修改  
✅ **数据安全**：不会丢失任何编辑

---

## CRDT 核心原理

### 两种主要类型

#### 1. 基于状态的 CRDT（State-based CRDT）

```typescript
// 每次同步时，发送完整状态
interface State {
  content: string;
  version: number;
}

// 合并函数：必须是可交换、可结合、幂等的
function merge(stateA: State, stateB: State): State {
  return {
    content: mergeContent(stateA.content, stateB.content),
    version: Math.max(stateA.version, stateB.version)
  };
}
```

**特点**：
- 发送完整状态（可能很大）
- 合并函数必须满足数学性质

#### 2. 基于操作的 CRDT（Operation-based CRDT）

```typescript
// 只发送操作，不发送状态
interface Operation {
  type: 'insert' | 'delete';
  position: number;
  content: string;
  timestamp: number;
  clientId: string;
}

// 操作必须是可交换的
function applyOperation(state: State, op: Operation): State {
  // 应用操作到状态
}
```

**特点**：
- 只发送操作（更小）
- 操作必须可交换

### Yjs 的实现方式

**Yjs 使用混合方式**：
- 内部使用**基于操作的 CRDT**
- 同步时发送**增量更新**（不是完整状态）

---

## Yjs 简介

### 什么是 Yjs？

> Yjs 是一个用于构建协作应用的 CRDT 框架，特别适合实时协作编辑器。

### 核心概念

#### 1. Y.Doc（文档）

```typescript
import * as Y from 'yjs';

// 创建一个 Yjs 文档
const ydoc = new Y.Doc();

// 文档是 CRDT 的容器
```

#### 2. Y.XmlFragment（XML 片段）

```typescript
// 创建 XML 片段（用于存储编辑器内容）
const fragment = ydoc.getXmlFragment('prosemirror');

// 可以存储结构化的文档内容
```

#### 3. Update（增量更新）

```typescript
// 每次编辑，Yjs 自动生成增量更新
ydoc.on('update', (update: Uint8Array, origin: unknown) => {
  // update: 二进制格式的增量更新
  // origin: 更新的来源（用户操作、网络同步等）
  console.log('增量更新大小:', update.length, 'bytes');
});
```

#### 4. State Vector（状态向量）

```typescript
// 状态向量：描述文档的当前状态
const snapshot = Y.snapshot(ydoc);

// 用于计算真正的增量更新
const incrementalUpdate = Y.encodeStateAsUpdate(ydoc, lastSavedStateVector);
```

### Yjs 的优势

✅ **自动生成增量**：每次编辑自动生成增量更新  
✅ **二进制格式**：高效压缩，传输体积小  
✅ **可交换操作**：操作顺序不影响最终结果  
✅ **实时同步**：支持 WebSocket 实时协作

---

## editor-demo 中的实现

### 架构概览

```
┌─────────────────┐
│   Tiptap Editor │  ← 用户界面
└────────┬────────┘
         │
┌────────▼────────┐
│  Yjs (Y.Doc)    │  ← CRDT 核心
└────────┬────────┘
         │
┌────────▼────────┐
│  Provider       │  ← 实时同步
└────────┬────────┘
         │
┌────────▼────────┐
│  后端 API       │  ← 持久化
└─────────────────┘
```

### 1. 初始化 Yjs 文档

```typescript
// apps/editor-demo/src/views/documents/DocumentEditor.tsx

// 创建 Yjs 文档
const newYdoc = new Y.Doc();

// 创建 Provider（用于实时协作）
const newProvider = new TiptapCollabProvider({
  appId: 'pikun-editor',
  name: `document.${objectId}`,
  document: newYdoc,
});
```

### 2. 加载文档内容

```typescript
// 从后端加载文档内容
const doc = await documentStore.loadDocument(workspaceId, objectId);

if (doc.content) {
  // 解码 Base64 内容
  const binaryString = atob(doc.content);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // 应用到 Yjs 文档
  Y.applyUpdate(ydoc, bytes);
  
  // 记录状态向量（用于后续计算增量）
  lastSavedStateVectorRef.current = Y.snapshot(ydoc);
}
```

**关键点**：
- `Y.applyUpdate()` 将完整状态应用到空文档
- `Y.snapshot()` 获取当前状态向量

### 3. 监听增量更新

```typescript
// 监听 Yjs 文档的更新事件
ydoc.on('update', (update: Uint8Array, origin: unknown) => {
  // 忽略来自 provider 的同步更新（避免循环）
  if (origin?.constructor?.name === 'TiptapCollabProvider') {
    return;
  }
  
  // 累积增量更新（防抖期间）
  pendingUpdatesRef.current.push(update);
  
  // 防抖保存：2秒后保存
  if (saveTimerRef.current) {
    clearTimeout(saveTimerRef.current);
  }
  
  saveTimerRef.current = setTimeout(async () => {
    // 计算并保存增量
    await saveIncrementalUpdate();
  }, 2000);
});
```

**关键点**：
- `update` 是 Yjs 自动生成的增量更新（二进制格式）
- 防抖机制：2 秒内多次编辑，只保存一次
- 累积更新：防抖期间的所有增量都保存

### 4. 计算增量更新

```typescript
// 计算真正的增量更新
let incrementalUpdate: Uint8Array | undefined;

if (lastSavedStateVectorRef.current) {
  // 方案1：有状态向量，计算真正的增量（最佳）
  // 注意：Yjs 的 API 限制，这里使用累积更新作为 fallback
  if (pendingUpdatesRef.current.length > 0) {
    incrementalUpdate = mergeYjsUpdates(pendingUpdatesRef.current);
  }
} else if (pendingUpdatesRef.current.length > 0) {
  // 方案2：没有状态向量，使用累积的更新
  incrementalUpdate = mergeYjsUpdates(pendingUpdatesRef.current);
} else {
  // 方案3：既没有状态向量也没有累积更新
  // 使用当前完整状态（应该很少见）
  incrementalUpdate = Y.encodeStateAsUpdate(ydoc);
}
```

### 5. 合并多个增量更新

```typescript
// 合并防抖期间累积的多个增量更新
const mergeYjsUpdates = (updates: Uint8Array[]): Uint8Array => {
  if (updates.length === 0) {
    return new Uint8Array(0);
  }
  if (updates.length === 1) {
    return updates[0]; // 单个更新，直接返回
  }
  
  // 多个更新：创建临时文档，依次应用所有更新
  const tempDoc = new Y.Doc();
  for (const update of updates) {
    Y.applyUpdate(tempDoc, update);
  }
  
  // 获取合并后的增量更新
  // 由于 CRDT 特性，这个更新可以安全地应用到现有文档
  return Y.encodeStateAsUpdate(tempDoc);
};
```

**关键点**：
- CRDT 的可交换性：更新顺序不影响结果
- 可以安全地合并多个增量更新

### 6. 发送到后端

```typescript
// apps/editor-demo/src/api/document.api.ts

async saveDocument(
  workspaceId: string,
  objectId: string,
  ydoc: Y.Doc,
  changeData?: Uint8Array, // 增量更新
): Promise<{ object_id: string; updated_at: string }> {
  
  let base64ChangeData: string | undefined;
  
  if (changeData && changeData.length > 0) {
    // 增量更新：Base64 编码
    base64ChangeData = btoa(String.fromCharCode(...changeData));
    console.log(`发送增量更新，大小: ${changeData.length} bytes`);
  } else {
    // 全量更新（fallback）
    const docState = Y.encodeStateAsUpdate(ydoc);
    base64Content = btoa(String.fromCharCode(...docState));
    console.warn(`没有增量数据，发送全量更新: ${docState.length} bytes`);
  }
  
  return this.updateDocument(workspaceId, objectId, {
    change_data: base64ChangeData, // 增量更新
    content: base64Content,         // 全量更新（可选）
  });
}
```

### 7. 后端处理增量更新

```typescript
// apps/server/src/services/document.service.ts

async updateDocument(
  object_id: string,
  updates: {
    change_data?: Buffer; // 增量更新
    content?: Buffer;      // 全量更新
  }
): Promise<Document> {
  
  if (updates.change_data && !updates.content) {
    // 只有增量更新：应用增量到现有文档状态
    console.log(`应用增量更新，大小: ${updates.change_data.length} bytes`);
    
    // 创建临时 Y.Doc
    const ydoc = new Y.Doc();
    
    // 应用现有文档状态
    if (currentDoc.content && currentDoc.content.length > 0) {
      Y.applyUpdate(ydoc, currentDoc.content);
    }
    
    // 应用增量更新
    Y.applyUpdate(ydoc, updates.change_data);
    
    // 获取新的完整状态
    const finalContent = Buffer.from(Y.encodeStateAsUpdate(ydoc));
    
    // 更新数据库
    await this.documentDAO.update(object_id, {
      content: finalContent,
      content_length: finalContent.length,
    });
    
    // 记录变更日志（增量数据）
    await this.changeDAO.create({
      document_id: object_id,
      change_data: updates.change_data,
    });
  }
}
```

**关键点**：
- 后端接收增量更新
- 应用到现有文档状态
- 存储完整状态到数据库
- 记录增量到变更日志（用于历史记录）

---

## 增量更新完整流程

### 数据流图

```
┌─────────────┐
│  用户编辑   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Tiptap Editor   │ 触发编辑事件
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Yjs (Y.Doc)    │ 自动生成增量更新 (Uint8Array)
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ ydoc.on('update')│ 监听增量更新
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ 累积更新        │ pendingUpdatesRef.push(update)
│ (防抖 2 秒)     │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ 计算增量        │ mergeYjsUpdates(updates)
│ 或使用状态向量  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Base64 编码     │ btoa(String.fromCharCode(...))
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ HTTP POST       │ PUT /api/workspace/{id}/documents/{id}
│ change_data     │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ 后端接收        │ DocumentService.updateDocument()
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ 应用增量        │ Y.applyUpdate(ydoc, change_data)
│ 到现有文档      │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ 获取完整状态    │ Y.encodeStateAsUpdate(ydoc)
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ 更新数据库      │ 存储完整状态
│ 记录变更日志    │ 存储增量数据
└─────────────────┘
```

### 时序图

```
用户A          用户B          前端A          前端B          后端
 │              │              │              │              │
 │─编辑────────>│              │              │              │
 │              │              │              │              │
 │              │<─增量更新────│              │              │
 │              │              │              │              │
 │              │              │─防抖(2秒)────>│              │
 │              │              │              │              │
 │              │              │─计算增量─────>│              │
 │              │              │              │              │
 │              │              │─POST change_data───────────>│
 │              │              │              │              │
 │              │              │              │              │─应用增量
 │              │              │              │              │─更新数据库
 │              │              │              │              │
 │              │              │<─200 OK──────────────────────│
 │              │              │              │              │
 │              │              │─实时同步(WebSocket)─────────>│
 │              │              │              │              │
 │              │              │              │<─增量更新─────│
 │              │              │              │              │
 │              │<─显示用户A的编辑─────────────│              │
```

---

## 性能优化策略

### 1. 防抖机制

```typescript
// 2 秒防抖，减少网络请求
saveTimerRef.current = setTimeout(async () => {
  await saveIncrementalUpdate();
}, 2000);
```

**效果**：
- 用户快速输入时，不会频繁保存
- 减少网络请求次数
- 合并多次编辑为一次保存

### 2. 增量更新 vs 全量更新

| 方式 | 数据大小 | 网络传输 | 适用场景 |
|------|---------|---------|---------|
| **增量更新** | 小（几 KB） | 快 | 正常编辑（✅ 优先使用） |
| **全量更新** | 大（几十 KB - MB） | 慢 | 新建文档、复制文档 |

**实际效果**：
```typescript
// 增量更新：通常只有几 KB
changeData.length: 2048 bytes  // 2 KB

// 全量更新：可能几十 KB 或更大
fullContent.length: 51200 bytes  // 50 KB
```

### 3. 状态向量优化

```typescript
// 记录最后保存的状态向量
lastSavedStateVectorRef.current = Y.snapshot(ydoc);

// 下次保存时，可以计算真正的增量
// （当前实现中作为 fallback，未来可以优化）
```

**未来优化**：
- 后端返回状态向量
- 前端持久化状态向量（localStorage）
- 使用状态向量计算真正的增量

### 4. 变更日志

```typescript
// 后端记录所有增量更新
await this.changeDAO.create({
  document_id: object_id,
  change_data: updates.change_data,
  created_at: new Date(),
});
```

**用途**：
- 历史记录（撤销/重做）
- 版本回滚
- 审计日志

---

## 总结

### CRDT 的核心价值

✅ **自动合并**：无需手动解决冲突  
✅ **离线支持**：可以离线编辑，上线后自动同步  
✅ **实时协作**：多人同时编辑，实时看到对方修改  
✅ **数据安全**：不会丢失任何编辑

### editor-demo 的实现亮点

1. **Yjs 自动生成增量**：无需手动计算增量
2. **防抖优化**：2 秒防抖，减少网络请求
3. **增量优先**：优先使用增量更新，减少传输体积
4. **变更日志**：记录所有增量，支持历史记录

### 适用场景

✅ **实时协作编辑器**（Google Docs、Notion）  
✅ **分布式系统**（多节点同步）  
✅ **离线优先应用**（PWA）  
✅ **版本控制系统**（Git 的替代方案）

### 不适用场景

❌ **强一致性要求**（金融交易）  
❌ **简单数据结构**（计数器、开关）  
❌ **性能敏感场景**（游戏状态同步）

---

## Q&A

### Q1: CRDT 和 OT 的区别？

**A**: 
- **OT (Operational Transformation)**：需要中央服务器协调，操作顺序敏感
- **CRDT**：无需协调，操作可交换，最终一致性

### Q2: 为什么增量更新比全量更新好？

**A**: 
- **增量更新**：只传输变更部分（几 KB），网络传输快
- **全量更新**：传输完整文档（可能几十 KB - MB），网络传输慢

### Q3: 如果网络断开怎么办？

**A**: 
- Yjs 支持离线编辑
- 网络恢复后，自动同步所有增量更新
- CRDT 保证最终一致性，不会丢失数据

### Q4: 性能如何？

**A**: 
- **增量更新**：通常只有几 KB，传输很快
- **合并操作**：O(n) 复杂度，n 是更新数量
- **内存占用**：Yjs 文档通常很小（几 MB）

---

## 参考资料

- [Yjs 官方文档](https://docs.yjs.dev/)
- [CRDT 论文](https://crdt.tech/)
- [editor-demo 增量更新机制说明](./增量更新机制说明.md)
- [Yjs GitHub](https://github.com/yjs/yjs)

---

**谢谢大家！** 🎉

