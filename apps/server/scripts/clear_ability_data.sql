-- 清空能力模型相关数据（按依赖顺序删除）
-- 注意：这个脚本会删除所有能力相关的数据，请谨慎使用

-- 删除用户经验记录
DELETE FROM pikun_db.user_ability_experience_logs;

-- 删除用户能力等级
DELETE FROM pikun_db.user_ability_levels;

-- 删除能力项等级配置
DELETE FROM pikun_db.ability_item_level_configs;

-- 删除能力项
DELETE FROM pikun_db.ability_items;

-- 删除能力维度
DELETE FROM pikun_db.ability_dimensions;

-- 删除能力类别
DELETE FROM pikun_db.ability_categories;

-- 重置序列（如果有的话）
-- 注意：PostgreSQL 的 UUID 不需要重置序列

