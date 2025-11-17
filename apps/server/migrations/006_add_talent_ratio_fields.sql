-- 为 ability_items 表添加 talent_ratio 和 acquired_training_ratio 字段
-- 创建时间: 2024

SET search_path TO pikun_db, public;

-- 检查并添加字段
DO $$
BEGIN
    -- 检查 talent_ratio 字段是否存在
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'pikun_db' 
        AND table_name = 'ability_items' 
        AND column_name = 'talent_ratio'
    ) THEN
        -- 添加字段
        ALTER TABLE pikun_db.ability_items
        ADD COLUMN talent_ratio DECIMAL(5,2) DEFAULT 50.00 CHECK (talent_ratio >= 0 AND talent_ratio <= 100),
        ADD COLUMN acquired_training_ratio DECIMAL(5,2) DEFAULT 50.00 CHECK (acquired_training_ratio >= 0 AND acquired_training_ratio <= 100);
        
        -- 添加约束：确保两者之和等于 100
        ALTER TABLE pikun_db.ability_items
        ADD CONSTRAINT check_talent_ratio_sum CHECK (talent_ratio + acquired_training_ratio = 100);
        
        -- 为现有数据设置默认值
        UPDATE pikun_db.ability_items
        SET talent_ratio = 50.00, acquired_training_ratio = 50.00
        WHERE talent_ratio IS NULL OR acquired_training_ratio IS NULL;
        
        RAISE NOTICE '已添加 talent_ratio 和 acquired_training_ratio 字段';
    ELSE
        RAISE NOTICE 'talent_ratio 和 acquired_training_ratio 字段已存在，跳过';
    END IF;
END $$;

