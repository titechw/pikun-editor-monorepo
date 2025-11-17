-- 初始化学科数据 - 第 8 批：第 1401-1600 个学科
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，将三级学科分类作为学科录入

SET search_path TO pikun_db, public;

DO $$
DECLARE
  category_id_var UUID;
  subject_id_var UUID;
BEGIN

  -- 生活固体废弃物能 即城市生活垃圾能源
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4806075';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4806075', '生活固体废弃物能 即城市生活垃圾能源', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4806080';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4806080', '核能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 天然气水合物能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4806085';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4806085', '天然气水合物能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 一次能源其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4806099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4806099', '一次能源其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 煤气能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4807010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4807010', '煤气能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4807020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4807020', '电能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 蒸汽能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4807030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4807030', '蒸汽能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 沼气能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4807040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4807040', '沼气能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 氢能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4807045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4807045', '氢能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 激光能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4807050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4807050', '激光能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 二次能源其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4807099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4807099', '二次能源其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核燃料与工艺技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4903010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4903010', '核燃料与工艺技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核材料与工艺技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4903099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4903099', '核材料与工艺技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 粒子加速器工程技术 原名为“粒子加速器工艺”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4903510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4903510', '粒子加速器工程技术 原名为“粒子加速器工艺”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 粒子加速器应用
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4903520';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4903520', '粒子加速器应用', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 粒子加速器其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4903599';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4903599', '粒子加速器其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 裂变堆物理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904010', '裂变堆物理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 裂变堆热工与水力
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904020', '裂变堆热工与水力', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 裂变堆控制
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904030', '裂变堆控制', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 裂变堆结构
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904040', '裂变堆结构', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 裂变堆屏蔽与防护
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904050', '裂变堆屏蔽与防护', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 裂变堆建造技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904060', '裂变堆建造技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 裂变堆工程技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904099', '裂变堆工程技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 磁约束聚变技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904510', '磁约束聚变技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 惯性约束聚变技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904520';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904520', '惯性约束聚变技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 聚变堆工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904530';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904530', '聚变堆工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 聚变裂变混合堆工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904540';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904540', '聚变裂变混合堆工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核聚变工程技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4904599';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4904599', '核聚变工程技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 舰船核动力
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4905010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4905010', '舰船核动力', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 空间核动力
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4905020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4905020', '空间核动力', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核电站
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4905030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4905030', '核电站', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核动力运行技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4905040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4905040', '核动力运行技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核动力工程技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4905099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4905099', '核动力工程技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 同位素分离技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4905510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4905510', '同位素分离技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 同位素制备技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4905520';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4905520', '同位素制备技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 同位素应用技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4905530';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4905530', '同位素应用技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 同位素技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4905599';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4905599', '同位素技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电子电路
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101010', '电子电路', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 天线电波传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101015', '天线电波传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 无线电技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101020', '无线电技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微波技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101025', '微波技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 敏感电子学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101030', '敏感电子学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微电子学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101035', '微电子学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101040', '仿真技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 超导电子技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101045', '超导电子技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电子元件与器件技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101050', '电子元件与器件技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电子束、离子束技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101055', '电子束、离子束技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 红外与夜视技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101060', '红外与夜视技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电子技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5101099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5101099', '电子技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 半导体测试技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5103010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5103010', '半导体测试技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 半导体材料
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5103020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5103020', '半导体材料', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 半导体器件与技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5103030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5103030', '半导体器件与技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 集成电路技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5103040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5103040', '集成电路技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 半导体加工技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5103050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5103050', '半导体加工技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 半导体技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5103099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5103099', '半导体技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 信号检测
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5104010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5104010', '信号检测', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 参数估计
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5104020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5104020', '参数估计', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 数据处理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5104030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5104030', '数据处理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 语音处理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5104040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5104040', '语音处理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 图象处理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5104050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5104050', '图象处理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 信息处理技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5104099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5104099', '信息处理技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 有线通信技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5105010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5105010', '有线通信技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 无线通信技术 包括微波通信、卫星通信、激光通信技术等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5105015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5105015', '无线通信技术 包括微波通信、卫星通信、激光通信技术等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 光纤通信技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5105020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5105020', '光纤通信技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 通信传输技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5105025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5105025', '通信传输技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 通信网络技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5105030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5105030', '通信网络技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 通信终端技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5105035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5105035', '通信终端技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电信
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5105040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5105040', '电信', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 邮政
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5105045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5105045', '邮政', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 邮电通信管理工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5105050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5105050', '邮电通信管理工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 通信技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5105099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5105099', '通信技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 自动机理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5201010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5201010', '自动机理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 可计算性理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5201020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5201020', '可计算性理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机可靠性理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5201030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5201030', '计算机可靠性理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 算法理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5201040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5201040', '算法理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 数据结构
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5201050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5201050', '数据结构', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 数据安全与计算机安全
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5201060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5201060', '数据安全与计算机安全', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机科学技术基础学科其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5201099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5201099', '计算机科学技术基础学科其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人工智能理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5202010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5202010', '人工智能理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 自然语言处理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5202020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5202020', '自然语言处理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机器翻译
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5202030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5202030', '机器翻译', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 模式识别
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5202040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5202040', '模式识别', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机感知
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5202050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5202050', '计算机感知', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机神经网络
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5202060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5202060', '计算机神经网络', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 知识工程 包括专家系统
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5202070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5202070', '知识工程 包括专家系统', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人工智能其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5202099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5202099', '人工智能其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机系统设计
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5203010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5203010', '计算机系统设计', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 并行处理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5203020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5203020', '并行处理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 分布式处理系统
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5203030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5203030', '分布式处理系统', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机网络
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5203040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5203040', '计算机网络', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机运行测试与性能评价
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5203050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5203050', '计算机运行测试与性能评价', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机系统结构其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5203099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5203099', '计算机系统结构其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 软件理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5204010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5204010', '软件理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 操作系统与操作环境
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5204020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5204020', '操作系统与操作环境', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 程序设计及其语言
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5204030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5204030', '程序设计及其语言', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 编译系统
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5204040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5204040', '编译系统', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 数据库
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5204050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5204050', '数据库', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 软件开发环境与开发技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5204060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5204060', '软件开发环境与开发技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 软件工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5204070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5204070', '软件工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机软件其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5204099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5204099', '计算机软件其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机元器件
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5205010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5205010', '计算机元器件', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机处理器技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5205020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5205020', '计算机处理器技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机存储技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5205030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5205030', '计算机存储技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机外围设备
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5205040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5205040', '计算机外围设备', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机制造与检测
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5205050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5205050', '计算机制造与检测', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机高密度组装技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5205060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5205060', '计算机高密度组装技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机工程其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5205099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5205099', '计算机工程其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中国语言文字信息处理 包括汉字信息处理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5206010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5206010', '中国语言文字信息处理 包括汉字信息处理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机仿真
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5206020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5206020', '计算机仿真', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机图形学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5206030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5206030', '计算机图形学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机图象处理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5206040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5206040', '计算机图象处理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机辅助设计
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5206050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5206050', '计算机辅助设计', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机过程控制
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5206060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5206060', '计算机过程控制', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机信息管理系统
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5206070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5206070', '计算机信息管理系统', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机决策支持系统
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5206080';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5206080', '计算机决策支持系统', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机应用其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5206099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5206099', '计算机应用其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化工热力学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5301110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5301110', '化工热力学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化工流体力学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5301120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5301120', '化工流体力学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化工流变学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5301130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5301130', '化工流变学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 颗粒学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5301140';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5301140', '颗粒学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化学工程基础学科其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5301199';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5301199', '化学工程基础学科其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 蒸馏
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302110', '蒸馏', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 吸收
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302120', '吸收', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 萃取
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302130', '萃取', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 吸附与离子交换
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302140';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302140', '吸附与离子交换', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 膜分离
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302150';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302150', '膜分离', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 蒸发与结晶
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302160';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302160', '蒸发与结晶', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 干燥
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302170';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302170', '干燥', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化学分离工程其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302199';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302199', '化学分离工程其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 催化反应工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302410';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302410', '催化反应工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 催化剂工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302420';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302420', '催化剂工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 固定床反应工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302430';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302430', '固定床反应工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 多相流反应工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302440';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302440', '多相流反应工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生化反应工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302450';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302450', '生化反应工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 聚合化学反应工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302460';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302460', '聚合化学反应工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电化学反应工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302470';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302470', '电化学反应工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化学反应工程其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302499';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302499', '化学反应工程其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化工过程动态学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302710';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302710', '化工过程动态学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化工过程控制与模拟
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302720';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302720', '化工过程控制与模拟', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化工系统优化
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302730';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302730', '化工系统优化', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化工系统工程其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5302799';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5302799', '化工系统工程其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 酸碱盐工程技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5303410';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5303410', '酸碱盐工程技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 硅酸盐工程技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5303420';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5303420', '硅酸盐工程技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 放射化工
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5303430';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5303430', '放射化工', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化肥工程技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5303440';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5303440', '化肥工程技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化学冶金
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5303450';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5303450', '化学冶金', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 无机化学工程其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5303499';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5303499', '无机化学工程其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电解
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5304110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5304110', '电解', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电镀
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5304120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5304120', '电镀', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电池
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5304130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5304130', '电池', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 腐蚀与防腐化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5304140';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5304140', '腐蚀与防腐化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电化学工程其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5304199';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5304199', '电化学工程其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 表面活性剂
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5305410';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5305410', '表面活性剂', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 香料学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5305420';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5305420', '香料学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化妆品学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5305430';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5305430', '化妆品学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 染料
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5305440';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5305440', '染料', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 颜料与涂料学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5305450';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5305450', '颜料与涂料学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 粘合剂 亦称胶粘剂
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5305460';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5305460', '粘合剂 亦称胶粘剂', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 精细化学工程其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5305499';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5305499', '精细化学工程其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 医药工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5306410';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5306410', '医药工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农药工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5306420';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5306420', '农药工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兽药工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5306430';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5306430', '兽药工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 制药工程其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5306499';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5306499', '制药工程其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仪器仪表基础理论 代码原为4604010
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5351010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5351010', '仪器仪表基础理论 代码原为4604010', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仪器仪表材料 代码原为4604015
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5351015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5351015', '仪器仪表材料 代码原为4604015', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传感器技术 代码原为4604020
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5351020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5351020', '传感器技术 代码原为4604020', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 精密仪器制造 代码原为4604025
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5351025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5351025', '精密仪器制造 代码原为4604025', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 测试计量仪器 代码原为4604030
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5351030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5351030', '测试计量仪器 代码原为4604030', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 光学技术与仪器 代码原为4604035
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5351035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5351035', '光学技术与仪器 代码原为4604035', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 天文仪器 代码原为4604040
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5351040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5351040', '天文仪器 代码原为4604040', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 地球科学仪器 代码原为4604045
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5351045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5351045', '地球科学仪器 代码原为4604045', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 大气仪器仪表 代码原为4604050
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5351050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5351050', '大气仪器仪表 代码原为4604050', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仪器仪表技术其他学科 代码原为4604099
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5351099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5351099', '仪器仪表技术其他学科 代码原为4604099', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兵器科学与技术基础学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352010', '兵器科学与技术基础学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兵器系统与运用工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352015', '兵器系统与运用工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兵器结构、动力、传动与平台技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352020', '兵器结构、动力、传动与平台技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 弹道学 含发射、推进与毁伤
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352025', '弹道学 含发射、推进与毁伤', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军用光学与光电子技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352035', '军用光学与光电子技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事信息工程与信息对抗技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352040', '军事信息工程与信息对抗技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 含能材料技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352045', '含能材料技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兵器制造技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352050', '兵器制造技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兵器材料科学与工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352055', '兵器材料科学与工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兵器测试与实验技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352060', '兵器测试与实验技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兵器科学与技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352099', '兵器科学与技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 印刷、复制技术 代码原为4605510
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5353010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5353010', '印刷、复制技术 代码原为4605510', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 产品应用专用性技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5353099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5353099', '产品应用专用性技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 纺织化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5401010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5401010', '纺织化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 纺织美学与色彩学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5401020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5401020', '纺织美学与色彩学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 纺织科学技术基础学科其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5401099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5401099', '纺织科学技术基础学科其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 纺织品结构与设计
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5404010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5404010', '纺织品结构与设计', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 棉纺学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5404015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5404015', '棉纺学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 棉织学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5404020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5404020', '棉织学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 麻纺织
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5404025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5404025', '麻纺织', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 毛纺织
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5404030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5404030', '毛纺织', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 丝纺织
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5404035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5404035', '丝纺织', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化学纤维纺织
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5404040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5404040', '化学纤维纺织', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新型纺纱、无纺布与特种织物
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5404045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5404045', '新型纺纱、无纺布与特种织物', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 针织
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5404050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5404050', '针织', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 纺织技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5404099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5404099', '纺织技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 染炼技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5405010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5405010', '染炼技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  RAISE NOTICE '学科数据（第 8 批）创建完成';
END $$;
