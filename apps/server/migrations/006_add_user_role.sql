-- 添加用户类型字段
-- 用户类型：'admin' - 管理员，'user' - 普通用户
-- 注意：type 用于区分管理员和普通用户，后续 role 字段可用于管理端内部角色（如：超级管理员、普通管理员等）

-- 添加 type 字段，默认为 'user'
ALTER TABLE pikun_db.users
ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'user' CHECK (type IN ('admin', 'user'));

-- 为 type 字段添加索引，便于查询
CREATE INDEX IF NOT EXISTS idx_users_type ON pikun_db.users(type) WHERE deleted_at IS NULL;

-- 创建初始管理员账户（可选，需要手动设置密码）
-- 注意：这里只是示例，实际使用时需要先创建用户，然后手动更新type
-- UPDATE pikun_db.users SET type = 'admin' WHERE email = 'admin@example.com';

