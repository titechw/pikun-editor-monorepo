# 环境变量配置说明

## 快速开始

1. **复制示例文件**：
   ```bash
   cd apps/server
   cp .env.example .env
   ```

2. **编辑 .env 文件**，根据你的实际配置修改：
   ```env
   DATABASE_URL=postgresql://pikun@localhost:5432/postgres
   JWT_SECRET=your-secret-key-change-in-production-min-32-chars
   ```

3. **重启开发服务器**：
   ```bash
   npm run dev
   ```

## 环境变量说明

### 数据库配置

- `DATABASE_URL`: PostgreSQL 连接字符串
  - 格式: `postgresql://用户名@主机:端口/数据库名`
  - 示例: `postgresql://pikun@localhost:5432/postgres`
  
- `DATABASE_POOL_MIN`: 数据库连接池最小连接数（默认: 2）
- `DATABASE_POOL_MAX`: 数据库连接池最大连接数（默认: 10）

### Redis 配置

- `REDIS_URL`: Redis 连接 URL（默认: `redis://localhost:6379`）
- `REDIS_PASSWORD`: Redis 密码（可选）
- `REDIS_DB`: Redis 数据库编号（默认: 0）

### JWT 配置

- `JWT_SECRET`: JWT 签名密钥（**生产环境必须修改**，至少32个字符）
- `JWT_EXPIRES_IN`: Access Token 过期时间（默认: 7d）
- `JWT_REFRESH_EXPIRES_IN`: Refresh Token 过期时间（默认: 30d）

### 应用配置

- `NODE_ENV`: 运行环境（development/production）
- `PORT`: 服务器端口（默认: 3000）

## 注意事项

1. **不要提交 .env 文件到 Git**：`.env` 文件已添加到 `.gitignore`
2. **生产环境必须修改 JWT_SECRET**：使用强随机密钥
3. **数据库连接**：确保 PostgreSQL 服务正在运行
4. **Redis 连接**：如果不需要缓存功能，Redis 连接失败不会影响基本功能

## 验证配置

启动服务器后，检查控制台输出：
- 如果看到 "DATABASE_URL environment variable is not set" 错误，说明 `.env` 文件未正确配置
- 如果看到数据库连接错误，检查 `DATABASE_URL` 是否正确

