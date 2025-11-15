-- 为能力项表添加天赋占比和后天训练占比字段
-- 天赋占比：0-100，表示该能力中天赋所占的百分比
-- 后天训练占比：0-100，表示该能力中后天训练所占的百分比
-- 两者之和应该等于 100

ALTER TABLE pikun_db.ability_items
ADD COLUMN IF NOT EXISTS talent_ratio DECIMAL(5,2) DEFAULT 50.00 CHECK (talent_ratio >= 0 AND talent_ratio <= 100),
ADD COLUMN IF NOT EXISTS acquired_training_ratio DECIMAL(5,2) DEFAULT 50.00 CHECK (acquired_training_ratio >= 0 AND acquired_training_ratio <= 100);

-- 添加约束：确保两者之和等于 100
ALTER TABLE pikun_db.ability_items
ADD CONSTRAINT check_talent_ratio_sum CHECK (talent_ratio + acquired_training_ratio = 100);

-- 为现有数据设置默认值（如果字段为 NULL）
UPDATE pikun_db.ability_items
SET 
  talent_ratio = 50.00,
  acquired_training_ratio = 50.00
WHERE talent_ratio IS NULL OR acquired_training_ratio IS NULL;

