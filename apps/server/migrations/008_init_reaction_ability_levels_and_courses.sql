-- 初始化反应力等级配置和课程数据
-- 创建时间: 2024

SET search_path TO pikun_db, public;

-- 获取反应力能力项 ID
DO $$
DECLARE
  reaction_item_id UUID;
  reaction_course_id UUID;
  reaction_test_assessment_id UUID;
  reaction_training_content_id UUID;
BEGIN
  -- 获取反应力能力项 ID
  SELECT item_id INTO reaction_item_id 
  FROM pikun_db.ability_items 
  WHERE code = 'reaction';
  
  IF reaction_item_id IS NULL THEN
    RAISE EXCEPTION '反应力能力项不存在，请先创建反应力能力项';
  END IF;

  -- 插入反应力等级配置（基于反应速度）
  -- 先删除已存在的配置（如果存在）
  DELETE FROM pikun_db.ability_item_level_configs WHERE item_id = reaction_item_id;
  
  INSERT INTO pikun_db.ability_item_level_configs (
    config_id, item_id, level, required_exp, requires_assessment, level_name, level_description, is_template, sort_order, metadata
  ) VALUES
    (uuid_generate_v4(), reaction_item_id, 1, 10, false, '初级', '反应时间 > 400ms，反应较慢，需要更多时间处理信息', false, 1, '{"reactionTime": {"min": 400, "unit": "ms"}}'::jsonb),
    (uuid_generate_v4(), reaction_item_id, 2, 50, false, '初级+', '反应时间 350-400ms，反应速度略低于平均水平', false, 2, '{"reactionTime": {"min": 350, "max": 400, "unit": "ms"}}'::jsonb),
    (uuid_generate_v4(), reaction_item_id, 3, 100, false, '中级', '反应时间 300-350ms，达到普通人群平均水平', false, 3, '{"reactionTime": {"min": 300, "max": 350, "unit": "ms"}}'::jsonb),
    (uuid_generate_v4(), reaction_item_id, 4, 200, true, '中级+', '反应时间 250-300ms，反应速度略高于平均水平', false, 4, '{"reactionTime": {"min": 250, "max": 300, "unit": "ms"}}'::jsonb),
    (uuid_generate_v4(), reaction_item_id, 5, 500, false, '高级', '反应时间 200-250ms，反应速度较快，经过一定训练', false, 5, '{"reactionTime": {"min": 200, "max": 250, "unit": "ms"}}'::jsonb),
    (uuid_generate_v4(), reaction_item_id, 6, 1000, true, '高级+', '反应时间 150-200ms，反应速度很快，专业训练水平', false, 6, '{"reactionTime": {"min": 150, "max": 200, "unit": "ms"}}'::jsonb),
    (uuid_generate_v4(), reaction_item_id, 7, 2500, false, '专家', '反应时间 120-150ms，接近职业水平', false, 7, '{"reactionTime": {"min": 120, "max": 150, "unit": "ms"}}'::jsonb),
    (uuid_generate_v4(), reaction_item_id, 8, 5000, true, '专家+', '反应时间 100-120ms，职业水平', false, 8, '{"reactionTime": {"min": 100, "max": 120, "unit": "ms"}}'::jsonb),
    (uuid_generate_v4(), reaction_item_id, 9, 10000, false, '大师', '反应时间 80-100ms，顶尖职业水平', false, 9, '{"reactionTime": {"min": 80, "max": 100, "unit": "ms"}}'::jsonb),
    (uuid_generate_v4(), reaction_item_id, 10, 20000, true, '大师+', '反应时间 < 80ms，接近人类极限', false, 10, '{"reactionTime": {"max": 80, "unit": "ms"}}'::jsonb);

  -- 创建反应力训练课程
  INSERT INTO pikun_db.courses (
    course_id, code, name, description, course_type, difficulty_level, estimated_duration, sort_order, is_published
  ) VALUES (
    uuid_generate_v4(), 
    'reaction_training', 
    '反应力训练课程', 
    '通过多种训练游戏和练习，提升你的反应速度和反应准确性', 
    'training', 
    1, 
    30, 
    1, 
    true
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    updated_at = CURRENT_TIMESTAMP
  RETURNING course_id INTO reaction_course_id;

  -- 如果冲突，获取已存在的课程 ID
  IF reaction_course_id IS NULL THEN
    SELECT course_id INTO reaction_course_id FROM pikun_db.courses WHERE code = 'reaction_training';
  END IF;

  -- 绑定课程与反应力能力
  INSERT INTO pikun_db.course_ability_bindings (
    course_id, item_id, exp_reward, is_primary
  ) VALUES (
    reaction_course_id, reaction_item_id, 100, true
  )
  ON CONFLICT (course_id, item_id) DO NOTHING;

  -- 创建反应力训练游戏内容
  INSERT INTO pikun_db.course_contents (
    content_id, course_id, content_type, title, description, content_data, duration, sort_order, is_required
  ) VALUES (
    uuid_generate_v4(),
    reaction_course_id,
    'game',
    '颜色反应测试',
    '快速点击屏幕上变化的颜色，测试你的反应速度',
    '{
      "gameType": "color_reaction",
      "rules": {
        "rounds": 10,
        "timeLimit": null,
        "targetColor": "random"
      },
      "scoring": {
        "baseExp": 10,
        "bonusExp": 5
      }
    }'::jsonb,
    300,
    1,
    true
  )
  ON CONFLICT DO NOTHING
  RETURNING content_id INTO reaction_training_content_id;

  -- 创建反应力测试考试
  INSERT INTO pikun_db.assessments (
    assessment_id, code, name, description, assessment_type, item_id, level_requirement, passing_criteria, assessment_config, exp_reward, sort_order, is_published
  ) VALUES (
    uuid_generate_v4(),
    'reaction_speed_test',
    '反应速度测试',
    '通过连续10次反应测试，评估你的反应速度等级',
    'game',
    reaction_item_id,
    NULL, -- 不限制等级要求
    '{
      "reactionTime": {
        "measurement": "average",
        "rounds": 10,
        "unit": "ms"
      }
    }'::jsonb,
    '{
      "gameType": "reaction_speed_test",
      "rounds": 10,
      "instructions": "当屏幕颜色变化时，立即点击。系统将记录你的平均反应时间。"
    }'::jsonb,
    200,
    1,
    true
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    updated_at = CURRENT_TIMESTAMP
  RETURNING assessment_id INTO reaction_test_assessment_id;

  RAISE NOTICE '反应力等级配置和课程数据初始化完成';
  RAISE NOTICE '反应力能力项 ID: %', reaction_item_id;
  RAISE NOTICE '反应力训练课程 ID: %', reaction_course_id;
  RAISE NOTICE '反应力测试考试 ID: %', reaction_test_assessment_id;
END $$;

-- 验证插入结果
SELECT 
  i.name as ability_name,
  c.level,
  c.level_name,
  c.metadata->'reactionTime' as reaction_time_range
FROM pikun_db.ability_item_level_configs c
JOIN pikun_db.ability_items i ON c.item_id = i.item_id
WHERE i.code = 'reaction'
ORDER BY c.level;

