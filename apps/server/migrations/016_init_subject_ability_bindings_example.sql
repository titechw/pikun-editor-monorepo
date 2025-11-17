-- 初始化学科能力关联 - 示例：为示例学科关联能力
-- 创建时间: 2024
-- 说明：为示例学科建立与能力项的关联关系

SET search_path TO pikun_db, public;

DO $$
DECLARE
  python_subject_id UUID;
  logical_thinking_item_id UUID;
  learning_ability_item_id UUID;
  focus_item_id UUID;
  memory_item_id UUID;
  reaction_item_id UUID;
BEGIN
  -- 获取学科ID
  SELECT subject_id INTO python_subject_id 
  FROM pikun_db.subjects 
  WHERE code = 'python_programming';

  IF python_subject_id IS NULL THEN
    RAISE EXCEPTION 'Python 编程学科不存在，请先创建学科';
  END IF;

  -- 获取能力项ID
  SELECT item_id INTO logical_thinking_item_id 
  FROM pikun_db.ability_items 
  WHERE code = 'logical_thinking';
  
  SELECT item_id INTO learning_ability_item_id 
  FROM pikun_db.ability_items 
  WHERE code = 'learning_ability';
  
  SELECT item_id INTO focus_item_id 
  FROM pikun_db.ability_items 
  WHERE code = 'focus';
  
  SELECT item_id INTO memory_item_id 
  FROM pikun_db.ability_items 
  WHERE code = 'memory';
  
  SELECT item_id INTO reaction_item_id 
  FROM pikun_db.ability_items 
  WHERE code = 'reaction';

  -- Python 编程学科能力关联
  INSERT INTO pikun_db.subject_ability_bindings (
    subject_id, item_id, required_level, recommended_level, is_primary, importance_weight, sort_order
  ) VALUES
    -- 逻辑思维：主要能力，必需等级3，推荐等级5
    (python_subject_id, logical_thinking_item_id, 3, 5, true, 9.0, 1),
    -- 学习力：必需等级2，推荐等级4
    (python_subject_id, learning_ability_item_id, 2, 4, false, 8.0, 2),
    -- 专注力：必需等级2，推荐等级3
    (python_subject_id, focus_item_id, 2, 3, false, 6.0, 3),
    -- 记忆力：必需等级1，推荐等级2
    (python_subject_id, memory_item_id, 1, 2, false, 5.0, 4)
  ON CONFLICT (subject_id, item_id) DO UPDATE SET
    required_level = EXCLUDED.required_level,
    recommended_level = EXCLUDED.recommended_level,
    is_primary = EXCLUDED.is_primary,
    importance_weight = EXCLUDED.importance_weight,
    sort_order = EXCLUDED.sort_order;

  RAISE NOTICE 'Python 编程学科能力关联创建完成';
END $$;

-- 验证插入结果
SELECT 
    s.name as subject_name,
    ai.name as ability_name,
    ad.name as dimension_name,
    ac.name as category_name,
    sab.required_level,
    sab.recommended_level,
    sab.is_primary,
    sab.importance_weight
FROM pikun_db.subject_ability_bindings sab
JOIN pikun_db.subjects s ON sab.subject_id = s.subject_id
JOIN pikun_db.ability_items ai ON sab.item_id = ai.item_id
JOIN pikun_db.ability_dimensions ad ON ai.dimension_id = ad.dimension_id
JOIN pikun_db.ability_categories ac ON ad.category_id = ac.category_id
WHERE s.code = 'python_programming'
ORDER BY sab.is_primary DESC, sab.importance_weight DESC, sab.sort_order;

