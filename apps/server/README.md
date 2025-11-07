# Server README

## 项目结构

```
apps/server/
├── src/
│   ├── api/              # API 路由（Controller 层）
│   │   ├── auth/
│   │   ├── documents/
│   │   └── middleware/
│   ├── services/         # 业务逻辑层（Service 层）
│   │   ├── auth/
│   │   ├── document/
│   │   └── cache/
│   ├── dao/              # 数据访问层（DAO 层）
│   │   ├── user.dao.ts
│   │   ├── document.dao.ts
│   │   └── history.dao.ts
│   ├── entities/         # 实体类
│   │   ├── user.entity.ts
│   │   ├── document.entity.ts
│   │   └── history.entity.ts
│   ├── dto/              # 数据传输对象
│   │   ├── auth.dto.ts
│   │   └── document.dto.ts
│   ├── decorators/       # 装饰器
│   │   ├── injectable.decorator.ts
│   │   ├── controller.decorator.ts
│   │   └── route.decorator.ts
│   ├── core/             # 核心功能
│   │   ├── container.ts  # 依赖注入容器
│   │   ├── database.ts   # 数据库连接
│   │   └── redis.ts      # Redis 连接
│   ├── utils/            # 工具函数
│   │   ├── jwt.util.ts
│   │   ├── password.util.ts
│   │   └── validation.util.ts
│   └── types/            # 类型定义
│       └── index.ts
├── migrations/           # 数据库迁移文件
├── scripts/              # 脚本文件
└── package.json
```

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **数据库**: PostgreSQL
- **缓存**: Redis
- **依赖注入**: tsyringe
- **验证**: zod + class-validator
- **认证**: JWT

## 开发指南

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并配置相关参数。

### 3. 运行数据库迁移

```bash
pnpm db:migrate
```

### 4. 启动开发服务器

```bash
pnpm dev
```

## 架构说明

### 分层架构

1. **Controller 层** (`src/api/`): 处理 HTTP 请求和响应
2. **Service 层** (`src/services/`): 业务逻辑处理
3. **DAO 层** (`src/dao/`): 数据库访问，防止 SQL 注入

### 依赖注入

使用 `tsyringe` 实现依赖注入，通过装饰器标记可注入的类。

### SQL 注入防护

- 使用参数化查询（Prepared Statements）
- 使用 ORM 或查询构建器
- 输入验证和转义

## API 文档

详见 `docs/业务流程梳理.md`




