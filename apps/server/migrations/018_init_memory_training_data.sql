-- 初始化记忆训练游戏和关卡数据
-- 创建时间: 2024

SET search_path TO pikun_db, public;

-- 获取记忆能力项 ID
DO $$
DECLARE
    memory_item_id UUID;
    number_sequence_game_id UUID;
    color_memory_game_id UUID;
    shape_position_game_id UUID;
    space_3d_game_id UUID;
BEGIN
    -- 获取记忆能力项 ID
    SELECT item_id INTO memory_item_id
    FROM pikun_db.ability_items
    WHERE code = 'memory' AND deleted_at IS NULL
    LIMIT 1;

    IF memory_item_id IS NULL THEN
        RAISE NOTICE '记忆能力项不存在，请先创建能力项';
        RETURN;
    END IF;

    -- 插入数字序列记忆游戏
    INSERT INTO pikun_db.memory_training_games (
        game_id, code, name, description, icon, game_type, ability_item_id,
        min_ability_level, max_ability_level, sort_order, is_published, metadata
    ) VALUES (
        uuid_generate_v4(), 'number_sequence', '数字序列记忆', 
        '记住屏幕上依次显示的数字序列，然后按顺序输入', '🔢', 'sequence',
        memory_item_id, 1, 10, 1, true,
        '{"rules": "依次显示数字，记住后按顺序输入", "tips": "可以尝试分组记忆"}'::JSONB
    ) ON CONFLICT (code) DO NOTHING
    RETURNING game_id INTO number_sequence_game_id;

    -- 插入颜色记忆游戏
    INSERT INTO pikun_db.memory_training_games (
        game_id, code, name, description, icon, game_type, ability_item_id,
        min_ability_level, max_ability_level, sort_order, is_published, metadata
    ) VALUES (
        uuid_generate_v4(), 'color_memory', '颜色记忆', 
        '记住屏幕上依次显示的颜色序列，然后按顺序点击', '🎨', 'sequence',
        memory_item_id, 1, 10, 2, true,
        '{"rules": "依次显示颜色，记住后按顺序点击", "tips": "可以尝试关联记忆"}'::JSONB
    ) ON CONFLICT (code) DO NOTHING
    RETURNING game_id INTO color_memory_game_id;

    -- 插入图形位置记忆游戏
    INSERT INTO pikun_db.memory_training_games (
        game_id, code, name, description, icon, game_type, ability_item_id,
        min_ability_level, max_ability_level, sort_order, is_published, metadata
    ) VALUES (
        uuid_generate_v4(), 'shape_position', '图形位置记忆', 
        '记住网格中图形的位置，然后点击对应的位置', '🔲', 'spatial',
        memory_item_id, 1, 10, 3, true,
        '{"rules": "记住图形位置，然后点击对应位置", "tips": "可以尝试空间记忆法"}'::JSONB
    ) ON CONFLICT (code) DO NOTHING
    RETURNING game_id INTO shape_position_game_id;

    -- 插入3D空间记忆游戏
    INSERT INTO pikun_db.memory_training_games (
        game_id, code, name, description, icon, game_type, ability_item_id,
        min_ability_level, max_ability_level, sort_order, is_published, metadata
    ) VALUES (
        uuid_generate_v4(), 'space_3d', '3D空间记忆', 
        '记住3D空间中物体的位置，然后选择对应的位置', '🎯', 'spatial_3d',
        memory_item_id, 5, 10, 4, true,
        '{"rules": "记住3D空间中物体的位置", "tips": "需要较强的空间想象能力"}'::JSONB
    ) ON CONFLICT (code) DO NOTHING
    RETURNING game_id INTO space_3d_game_id;

    -- 获取游戏 ID（如果上面插入失败，则查询）
    IF number_sequence_game_id IS NULL THEN
        SELECT game_id INTO number_sequence_game_id FROM pikun_db.memory_training_games WHERE code = 'number_sequence';
    END IF;
    IF color_memory_game_id IS NULL THEN
        SELECT game_id INTO color_memory_game_id FROM pikun_db.memory_training_games WHERE code = 'color_memory';
    END IF;
    IF shape_position_game_id IS NULL THEN
        SELECT game_id INTO shape_position_game_id FROM pikun_db.memory_training_games WHERE code = 'shape_position';
    END IF;
    IF space_3d_game_id IS NULL THEN
        SELECT game_id INTO space_3d_game_id FROM pikun_db.memory_training_games WHERE code = 'space_3d';
    END IF;

    -- 插入数字序列记忆游戏的关卡
    IF number_sequence_game_id IS NOT NULL THEN
        INSERT INTO pikun_db.memory_training_levels (
            game_id, level_number, name, description, difficulty_config,
            required_ability_level, base_exp_reward, sort_order, is_published
        ) VALUES
        (number_sequence_game_id, 1, '初级', '3位数字，显示3秒', '{"sequenceLength": 3, "displayTime": 3}'::JSONB, 1, 10, 1, true),
        (number_sequence_game_id, 2, '初级+', '4位数字，显示3秒', '{"sequenceLength": 4, "displayTime": 3}'::JSONB, 1, 15, 2, true),
        (number_sequence_game_id, 3, '中级', '5位数字，显示2.5秒', '{"sequenceLength": 5, "displayTime": 2.5}'::JSONB, 2, 20, 3, true),
        (number_sequence_game_id, 4, '中级+', '6位数字，显示2.5秒', '{"sequenceLength": 6, "displayTime": 2.5}'::JSONB, 2, 25, 4, true),
        (number_sequence_game_id, 5, '高级', '7位数字，显示2秒', '{"sequenceLength": 7, "displayTime": 2}'::JSONB, 3, 30, 5, true),
        (number_sequence_game_id, 6, '高级+', '8位数字，显示2秒', '{"sequenceLength": 8, "displayTime": 2}'::JSONB, 3, 35, 6, true),
        (number_sequence_game_id, 7, '专家', '9位数字，显示1.5秒', '{"sequenceLength": 9, "displayTime": 1.5}'::JSONB, 4, 40, 7, true),
        (number_sequence_game_id, 8, '专家+', '10位数字，显示1.5秒', '{"sequenceLength": 10, "displayTime": 1.5}'::JSONB, 4, 45, 8, true),
        (number_sequence_game_id, 9, '大师', '12位数字，显示1秒', '{"sequenceLength": 12, "displayTime": 1}'::JSONB, 5, 50, 9, true),
        (number_sequence_game_id, 10, '大师+', '15位数字，显示1秒', '{"sequenceLength": 15, "displayTime": 1}'::JSONB, 5, 60, 10, true)
        ON CONFLICT (game_id, level_number) DO NOTHING;
    END IF;

    -- 插入颜色记忆游戏的关卡
    IF color_memory_game_id IS NOT NULL THEN
        INSERT INTO pikun_db.memory_training_levels (
            game_id, level_number, name, description, difficulty_config,
            required_ability_level, base_exp_reward, sort_order, is_published
        ) VALUES
        (color_memory_game_id, 1, '初级', '4种颜色，4个位置', '{"colorCount": 4, "sequenceLength": 4, "displayTime": 2}'::JSONB, 1, 10, 1, true),
        (color_memory_game_id, 2, '初级+', '5种颜色，5个位置', '{"colorCount": 5, "sequenceLength": 5, "displayTime": 2}'::JSONB, 1, 15, 2, true),
        (color_memory_game_id, 3, '中级', '6种颜色，6个位置', '{"colorCount": 6, "sequenceLength": 6, "displayTime": 1.5}'::JSONB, 2, 20, 3, true),
        (color_memory_game_id, 4, '中级+', '6种颜色，7个位置', '{"colorCount": 6, "sequenceLength": 7, "displayTime": 1.5}'::JSONB, 2, 25, 4, true),
        (color_memory_game_id, 5, '高级', '6种颜色，8个位置', '{"colorCount": 6, "sequenceLength": 8, "displayTime": 1.2}'::JSONB, 3, 30, 5, true),
        (color_memory_game_id, 6, '高级+', '6种颜色，9个位置', '{"colorCount": 6, "sequenceLength": 9, "displayTime": 1.2}'::JSONB, 3, 35, 6, true),
        (color_memory_game_id, 7, '专家', '6种颜色，10个位置', '{"colorCount": 6, "sequenceLength": 10, "displayTime": 1}'::JSONB, 4, 40, 7, true),
        (color_memory_game_id, 8, '专家+', '6种颜色，12个位置', '{"colorCount": 6, "sequenceLength": 12, "displayTime": 1}'::JSONB, 4, 45, 8, true),
        (color_memory_game_id, 9, '大师', '6种颜色，15个位置', '{"colorCount": 6, "sequenceLength": 15, "displayTime": 0.8}'::JSONB, 5, 50, 9, true),
        (color_memory_game_id, 10, '大师+', '6种颜色，20个位置', '{"colorCount": 6, "sequenceLength": 20, "displayTime": 0.8}'::JSONB, 5, 60, 10, true)
        ON CONFLICT (game_id, level_number) DO NOTHING;
    END IF;

    -- 插入图形位置记忆游戏的关卡
    IF shape_position_game_id IS NOT NULL THEN
        INSERT INTO pikun_db.memory_training_levels (
            game_id, level_number, name, description, difficulty_config,
            required_ability_level, base_exp_reward, sort_order, is_published
        ) VALUES
        (shape_position_game_id, 1, '初级', '3x3网格，3个图形', '{"gridSize": 3, "shapeCount": 3, "displayTime": 3}'::JSONB, 1, 10, 1, true),
        (shape_position_game_id, 2, '初级+', '3x3网格，4个图形', '{"gridSize": 3, "shapeCount": 4, "displayTime": 2.5}'::JSONB, 1, 15, 2, true),
        (shape_position_game_id, 3, '中级', '4x4网格，5个图形', '{"gridSize": 4, "shapeCount": 5, "displayTime": 3}'::JSONB, 2, 20, 3, true),
        (shape_position_game_id, 4, '中级+', '4x4网格，6个图形', '{"gridSize": 4, "shapeCount": 6, "displayTime": 2.5}'::JSONB, 2, 25, 4, true),
        (shape_position_game_id, 5, '高级', '5x5网格，7个图形', '{"gridSize": 5, "shapeCount": 7, "displayTime": 3}'::JSONB, 3, 30, 5, true),
        (shape_position_game_id, 6, '高级+', '5x5网格，8个图形', '{"gridSize": 5, "shapeCount": 8, "displayTime": 2.5}'::JSONB, 3, 35, 6, true),
        (shape_position_game_id, 7, '专家', '6x6网格，10个图形', '{"gridSize": 6, "shapeCount": 10, "displayTime": 2.5}'::JSONB, 4, 40, 7, true),
        (shape_position_game_id, 8, '专家+', '6x6网格，12个图形', '{"gridSize": 6, "shapeCount": 12, "displayTime": 2}'::JSONB, 4, 45, 8, true),
        (shape_position_game_id, 9, '大师', '7x7网格，15个图形', '{"gridSize": 7, "shapeCount": 15, "displayTime": 2}'::JSONB, 5, 50, 9, true),
        (shape_position_game_id, 10, '大师+', '8x8网格，20个图形', '{"gridSize": 8, "shapeCount": 20, "displayTime": 1.5}'::JSONB, 5, 60, 10, true)
        ON CONFLICT (game_id, level_number) DO NOTHING;
    END IF;

    -- 插入3D空间记忆游戏的关卡
    IF space_3d_game_id IS NOT NULL THEN
        INSERT INTO pikun_db.memory_training_levels (
            game_id, level_number, name, description, difficulty_config,
            required_ability_level, base_exp_reward, sort_order, is_published
        ) VALUES
        (space_3d_game_id, 1, '初级', '5个位置，显示4秒', '{"positionCount": 5, "displayTime": 4}'::JSONB, 5, 30, 1, true),
        (space_3d_game_id, 2, '初级+', '6个位置，显示3.5秒', '{"positionCount": 6, "displayTime": 3.5}'::JSONB, 5, 35, 2, true),
        (space_3d_game_id, 3, '中级', '7个位置，显示3.5秒', '{"positionCount": 7, "displayTime": 3.5}'::JSONB, 6, 40, 3, true),
        (space_3d_game_id, 4, '中级+', '8个位置，显示3秒', '{"positionCount": 8, "displayTime": 3}'::JSONB, 6, 45, 4, true),
        (space_3d_game_id, 5, '高级', '9个位置，显示3秒', '{"positionCount": 9, "displayTime": 3}'::JSONB, 7, 50, 5, true),
        (space_3d_game_id, 6, '高级+', '10个位置，显示2.5秒', '{"positionCount": 10, "displayTime": 2.5}'::JSONB, 7, 55, 6, true),
        (space_3d_game_id, 7, '专家', '12个位置，显示2.5秒', '{"positionCount": 12, "displayTime": 2.5}'::JSONB, 8, 60, 7, true),
        (space_3d_game_id, 8, '专家+', '15个位置，显示2秒', '{"positionCount": 15, "displayTime": 2}'::JSONB, 8, 65, 8, true),
        (space_3d_game_id, 9, '大师', '18个位置，显示2秒', '{"positionCount": 18, "displayTime": 2}'::JSONB, 9, 70, 9, true),
        (space_3d_game_id, 10, '大师+', '20个位置，显示1.5秒', '{"positionCount": 20, "displayTime": 1.5}'::JSONB, 10, 80, 10, true)
        ON CONFLICT (game_id, level_number) DO NOTHING;
    END IF;

    RAISE NOTICE '记忆训练游戏和关卡数据初始化完成';
END $$;





