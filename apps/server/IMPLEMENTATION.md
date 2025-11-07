# 服务端实现说明

## 项目结构

```
apps/server/
├── src/
│   ├── api/                    # API 路由层（Controller）
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   ├── login/
│   │   │   ├── refresh/
│   │   │   └── verify/
│   │   ├── documents/
│   │   │   ├── [workspace_id]/
│   │   │   │   ├── documents/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [object_id]/
│   │   │   │   │       ├── route.ts
│   │   │   │   │       └── snapshots/
│   │   │   │   │           ├── route.ts
│   │   │   │   │           └── latest/
│   │   │   │   │               └── route.ts
│   │   │   │   └── search/
│   │   │   │       └── [workspace_id]/
│   │   │   │           └── route.ts
│   │   │   └── document.controller.ts
│   │   └── auth.controller.ts
│   ├── services/                # 业务逻辑层（Service）
│   │   ├── auth.service.ts
│   │   └── document.service.ts
│   ├── dao/                     # 数据访问层（DAO）
│   │   ├── user.dao.ts
│   │   └── document.dao.ts
│   ├── entities/                # 实体类
│   │   └── index.ts
│   ├── decorators/              # 装饰器
│   │   ├── injectable.decorator.ts
│   │   ├── route.decorator.ts
│   │   └── validation.decorator.ts
│   ├── core/                    # 核心功能
│   │   ├── container.ts         # 依赖注入容器
│   │   ├── database.ts          # 数据库连接（防止 SQL 注入）
│   │   └── redis.ts             # Redis 连接
│   └── utils/                   # 工具函数
├── migrations/                  # 数据库迁移文件
│   └── 001_initial_schema.sql
└── package.json
```

## 安全措施

### 1. SQL 注入防护

所有数据库查询都使用参数化查询（Prepared Statements），绝不使用字符串拼接：

```typescript
// ✅ 正确：使用参数化查询
await this.db.query(
  'SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL',
  [email]
);

// ❌ 错误：字符串拼接（禁止）
await this.db.query(
  `SELECT * FROM users WHERE email = '${email}'` // 危险！
);
```

### 2. 输入验证

使用 Zod schema 验证所有用户输入：

```typescript
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});
```

### 3. 密码加密

使用 bcrypt 加密存储密码：

```typescript
const hashedPassword = await bcrypt.hash(password, 10);
```

### 4. JWT 认证

使用 JWT token 进行身份验证，token 存储在 HTTP Header 中。

## API 接口列表

### 认证相关

- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/refresh` - 刷新 token
- `GET /api/auth/verify` - 验证 token

### 文档管理

- `GET /api/workspace/[workspace_id]/documents` - 获取文档列表
- `POST /api/workspace/[workspace_id]/documents` - 创建文档
- `GET /api/workspace/[workspace_id]/documents/[object_id]` - 获取文档
- `PUT /api/workspace/[workspace_id]/documents/[object_id]` - 更新文档
- `DELETE /api/workspace/[workspace_id]/documents/[object_id]` - 删除文档
- `GET /api/workspace/[workspace_id]/documents/[object_id]/snapshots` - 获取快照列表
- `GET /api/workspace/[workspace_id]/documents/[object_id]/snapshots/latest` - 获取最新快照
- `GET /api/search/[workspace_id]` - 搜索文档

## 依赖注入

使用 `tsyringe` 实现依赖注入，通过装饰器标记可注入的类：

```typescript
@injectable()
export class AuthService {
  constructor(
    @inject('UserDAO') private userDAO: UserDAO
  ) {}
}
```

## 缓存策略

使用 Redis 缓存热点数据：

- 文档详情：5分钟缓存
- 文档列表：1分钟缓存
- 刷新令牌：30天缓存

## 数据库迁移

运行数据库迁移：

```bash
psql -U postgres -d pikun_db -f migrations/001_initial_schema.sql
```

## 环境变量配置

复制 `.env.example` 为 `.env` 并配置：

```env
DATABASE_URL=postgresql://user:password@localhost:5432/pikun_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key-change-in-production
```

## 启动服务

```bash
# 安装依赖
pnpm install

# 运行数据库迁移
pnpm db:migrate

# 启动开发服务器
pnpm dev
```

## 注意事项

1. **SQL 注入防护**：所有 DAO 层方法都使用参数化查询
2. **输入验证**：所有用户输入都经过 Zod schema 验证
3. **密码安全**：密码使用 bcrypt 加密存储
4. **Token 安全**：JWT token 有过期时间，支持刷新机制
5. **缓存失效**：更新数据时自动清除相关缓存
6. **错误处理**：统一的错误响应格式




