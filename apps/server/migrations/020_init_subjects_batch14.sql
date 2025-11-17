-- 初始化学科数据 - 第 14 批：第 2601-2800 个学科
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，将三级学科分类作为学科录入

SET search_path TO pikun_db, public;

DO $$
DECLARE
  category_id_var UUID;
  subject_id_var UUID;
BEGIN

  -- 人口理论 原名为“人口学原理”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407110', '人口理论 原名为“人口学原理”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407115';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407115', '人口经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口社会学 包括老年人口学、妇女人口学、发展人口学等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407120', '人口社会学 包括老年人口学、妇女人口学、发展人口学等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口学说史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407125';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407125', '人口学说史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 历史人口 原名为“人口史”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407130', '历史人口 原名为“人口史”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口地理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407135';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407135', '人口地理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口生态学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407140';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407140', '人口生态学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 区域人口学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407145';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407145', '区域人口学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口系统工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407150';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407150', '人口系统工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口预测学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407155';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407155', '人口预测学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口规划学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407160';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407160', '人口规划学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口政策 原名为“人口政策学”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407165';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407165', '人口政策 原名为“人口政策学”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计划生育学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407170';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407170', '计划生育学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407199';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407199', '人口学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 劳动管理学 代码原为7904520
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407420';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407420', '劳动管理学 代码原为7904520', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 劳动统计学 代码原为 7904530
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407425';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407425', '劳动统计学 代码原为 7904530', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 劳动社会学 代码原为7904540
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407430';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407430', '劳动社会学 代码原为7904540', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 劳动心理学 代码原为7904550
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407435';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407435', '劳动心理学 代码原为7904550', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会保险学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407440';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407440', '社会保险学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 职业安全卫生科学技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407445';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407445', '职业安全卫生科学技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 劳动科学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407499';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407499', '劳动科学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族问题与民族政策
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8501010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8501010', '民族问题与民族政策', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族关系
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8501020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8501020', '民族关系', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族经济
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8501030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8501030', '民族经济', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族教育
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8501040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8501040', '民族教育', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族法制
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8501050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8501050', '民族法制', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8501060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8501060', '民族心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 少数民族政治制度
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8501070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8501070', '少数民族政治制度', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族问题理论其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8501099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8501099', '民族问题理论其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8502010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8502010', '民族史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族关系史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8502020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8502020', '民族关系史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族史学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8502099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8502099', '民族史学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文化地理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8507010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8507010', '文化地理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文化心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8507020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8507020', '文化心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文化遗产学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8507030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8507030', '文化遗产学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文化学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8507099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8507099', '文化学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8601010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8601010', '新闻学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 马克思主义新闻理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8601015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8601015', '马克思主义新闻理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 西方新闻理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8601020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8601020', '西方新闻理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻法
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8601025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8601025', '新闻法', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 舆论学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8601030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8601030', '舆论学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻伦理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8601035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8601035', '新闻伦理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻社会学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8601040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8601040', '新闻社会学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8601045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8601045', '新闻心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 比较新闻学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8601050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8601050', '比较新闻学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻理论其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8601099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8601099', '新闻理论其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中国新闻事业史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8602010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8602010', '中国新闻事业史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 世界新闻事业史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8602020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8602020', '世界新闻事业史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻思想史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8602030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8602030', '新闻思想史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传播技术史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8602040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8602040', '传播技术史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻史其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8602099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8602099', '新闻史其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻采访
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8603010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8603010', '新闻采访', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻写作
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8603020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8603020', '新闻写作', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻编辑
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8603030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8603030', '新闻编辑', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻评论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8603040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8603040', '新闻评论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻摄影
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8603050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8603050', '新闻摄影', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻业务其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8603099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8603099', '新闻业务其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传媒经济
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8604010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8604010', '传媒经济', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传媒管理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8604020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8604020', '传媒管理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新闻事业经营管理其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8604099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8604099', '新闻事业经营管理其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 广播电视史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8605010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8605010', '广播电视史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 广播电视理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8605020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8605020', '广播电视理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 广播电视业务 包括广播电视采访、写作、编辑等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8605030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8605030', '广播电视业务 包括广播电视采访、写作、编辑等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 广播电视播音
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8605040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8605040', '广播电视播音', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 广播与电视其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8605099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8605099', '广播与电视其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传播史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606010', '传播史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传播理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606020', '传播理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传播技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606030', '传播技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 组织传播学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606040', '组织传播学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传播与社会发展
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606050', '传播与社会发展', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人际传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606051';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606051', '人际传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 国际传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606053';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606053', '国际传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 跨文化传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606055', '跨文化传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 网络传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606057';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606057', '网络传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 新媒介传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606059';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606059', '新媒介传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传播学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8606099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8606099', '传播学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 图书馆学史 包括图书馆事业史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8701010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8701010', '图书馆学史 包括图书馆事业史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 比较图书馆学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8701015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8701015', '比较图书馆学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 图书馆社会学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8701020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8701020', '图书馆社会学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 图书馆管理学 包括图书馆统计学、图书馆经济学等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8701025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8701025', '图书馆管理学 包括图书馆统计学、图书馆经济学等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 图书馆建筑学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8701030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8701030', '图书馆建筑学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 图书采访学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8701035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8701035', '图书采访学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 图书分类学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8701040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8701040', '图书分类学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 图书馆服务学 包括读者心理学、读者咨询学等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8701055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8701055', '图书馆服务学 包括读者心理学、读者咨询学等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 图书馆学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8701099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8701099', '图书馆学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文献类型学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8702010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8702010', '文献类型学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文献计量学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8702020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8702020', '文献计量学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文献检索学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8702030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8702030', '文献检索学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 图书史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8702040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8702040', '图书史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 版本学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8702050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8702050', '版本学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 校勘学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8702060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8702060', '校勘学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文献学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8702099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8702099', '文献学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报学史 包括情报事业史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703010', '情报学史 包括情报事业史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报社会学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703015', '情报社会学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 比较情报学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703020', '比较情报学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报计量学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703025', '情报计量学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703030', '情报心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报管理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703035', '情报管理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报服务学 包括情报用户研究等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703040', '情报服务学 包括情报用户研究等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703045', '情报经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报检索学 包括情报检索语言等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703050', '情报检索学 包括情报检索语言等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报系统理论 包括情报系统分析与设计、 情报网络建设理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703055', '情报系统理论 包括情报系统分析与设计、 情报网络建设理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703060', '情报技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 科学技术情报学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703065';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703065', '科学技术情报学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会科学情报学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703070', '社会科学情报学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8703099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8703099', '情报学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 档案学史 包括档案事业史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8704010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8704010', '档案学史 包括档案事业史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 档案管理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8704020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8704020', '档案管理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 档案保护技术学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8704030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8704030', '档案保护技术学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 档案编纂学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8704040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8704040', '档案编纂学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 档案学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8704099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8704099', '档案学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 国民经济核算 原名称及代码为“9101520统计核算理论”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9103015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9103015', '国民经济核算 原名称及代码为“9101520统计核算理论”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 经济统计分析
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9103025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9103025', '经济统计分析', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 经济统计学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9103099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9103099', '经济统计学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 教育统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9104010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9104010', '教育统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文化与体育统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9104020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9104020', '文化与体育统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 司法统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9104040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9104040', '司法统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会保障统计学 原名为“社会福利与社会保障统计学”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9104050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9104050', '社会保障统计学 原名为“社会福利与社会保障统计学”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生活质量统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9104060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9104060', '生活质量统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会统计学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9104099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9104099', '社会统计学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 资源统计学 原名为“自然资源统计学”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9105010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9105010', '资源统计学 原名为“自然资源统计学”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9105020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9105020', '环境统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生态统计学 原名为“生态平衡统计学”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9105030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9105030', '生态统计学 原名为“生态平衡统计学”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境与生态统计学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9105099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9105099', '环境与生态统计学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9106010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9106010', '生物统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物与医学统计学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9106099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9106099', '生物与医学统计学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 优化计算方法  1502075 金属有机光化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106155';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106155', '优化计算方法  1502075 金属有机光化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 数值逼近与计算几何  1506510 软化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106165';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106165', '数值逼近与计算几何  1506510 软化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 并行计算算法  1506520 碳化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106175';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106175', '并行计算算法  1506520 碳化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 小波分析与傅立叶分析的数值方法  1506530 纳米化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106185';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106185', '小波分析与傅立叶分析的数值方法  1506530 纳米化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 反问题计算方法  1602510 空间化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106190';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106190', '反问题计算方法  1602510 空间化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 符号计算与计算机推理  1602520 天体元素学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106195';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106195', '符号计算与计算机推理  1602520 天体元素学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 空间统计  1602530 月球与行星化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106765';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106765', '空间统计  1602530 月球与行星化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 统计计算  1606070 比较行星学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1107135';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1107135', '统计计算  1606070 比较行星学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 复杂系统与复杂性科学  1606080 月球科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1202070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1202070', '复杂系统与复杂性科学  1606080 月球科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微观力学  1607510 时间尺度
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1301556';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1301556', '微观力学  1607510 时间尺度', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微流体力学  1607520 时间测量与方法
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1302574';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1302574', '微流体力学  1607520 时间测量与方法', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 流体动力声学  1607530 守时理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402025', '流体动力声学  1607530 守时理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 超声学、量子声学和声学效应  1607540 授时理论与方法
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402035', '超声学、量子声学和声学效应  1607540 授时理论与方法', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 次声学  1703060 能源地球化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402045', '次声学  1703060 能源地球化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 结构声学和振动  1704511 生物地理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402053';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402053', '结构声学和振动  1704511 生物地理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 噪声、噪声效应及其控制  1704513 化学地理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402056';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402056', '噪声、噪声效应及其控制  1704513 化学地理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 建筑声学与电声学  1704514 地貌学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402059';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402059', '建筑声学与电声学  1704514 地貌学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 声学信号处理  1704523 区域地理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402063';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402063', '声学信号处理  1704523 区域地理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生理、心理声学和生物声学  1704526 城市地理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402066';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402066', '生理、心理声学和生物声学  1704526 城市地理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 语言声学和语音信号处理  1704531 世界地理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402069';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402069', '语言声学和语音信号处理  1704531 世界地理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 音乐声学  1704539 旅游地理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402073';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402073', '音乐声学  1704539 旅游地理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 声学换能器、声学测量及方法  1705550 地下水文学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402076';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402076', '声学换能器、声学测量及方法  1705550 地下水文学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 声学测量方法  1705555 区域水文学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402079';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402079', '声学测量方法  1705555 区域水文学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 声学材料  1705560 生态水文学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402083';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402083', '声学材料  1705560 生态水文学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 信息科学中的声学问题  1706061 遥感海洋学（亦名卫星海洋学）
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402086';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402086', '信息科学中的声学问题  1706061 遥感海洋学（亦名卫星海洋学）', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 光子学与集成光学  1706065 海洋生态学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1403057';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1403057', '光子学与集成光学  1706065 海洋生态学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境光学  1706070 环境海洋学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1403062';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1403062', '环境光学  1706070 环境海洋学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋光学  1706075 海洋资源学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1403064';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1403064', '海洋光学  1706075 海洋资源学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 光学遥感  1706080 极地科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1403066';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1403066', '光学遥感  1706080 极地科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 超快激光及应用  1801470 生物影像学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1403068';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1403068', '超快激光及应用  1801470 生物影像学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 介观物理学  1802170 膜生物学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1405085';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1405085', '介观物理学  1802170 膜生物学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 量子调控  1802180 干细胞生物学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1405090';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1405090', '量子调控  1802180 干细胞生物学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 玻色—爱因斯坦凝聚和冷原子物理  1802210 分子免疫学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1406055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1406055', '玻色—爱因斯坦凝聚和冷原子物理  1802210 分子免疫学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 粒子宇宙学  1802215 免疫治疗学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1407050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1407050', '粒子宇宙学  1802215 免疫治疗学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 疫苗学  1904010 医患心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1802220';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1802220', '疫苗学  1904010 医患心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 比较发育生物学  1904020 健康心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1802710';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1802710', '比较发育生物学  1904020 健康心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 演化发育生物学  1904110 异常心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1802720';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1802720', '演化发育生物学  1904110 异常心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 繁殖生物学  1904210 咨询心理技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1802730';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1802730', '繁殖生物学  1904210 咨询心理技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 表观遗传学  1904220 员工援助技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1803175';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1803175', '表观遗传学  1904220 员工援助技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 基因组学  1904510 心理测量理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1803710';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1803710', '基因组学  1904510 心理测量理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核糖核酸组学  1904520 心理测量技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1803720';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1803720', '核糖核酸组学  1904520 心理测量技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 蛋白质组学  1904610 心理统计原理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1803730';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1803730', '蛋白质组学  1904610 心理统计原理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 代谢组学  1904620 心理统计方法
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1803740';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1803740', '代谢组学  1904620 心理统计方法', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物信息学  1905010 感觉心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1803750';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1803750', '生物信息学  1905010 感觉心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 水生生物学  1905020 比较心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1803910';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1803910', '水生生物学  1905020 比较心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 保护生物学  1905030 心理神经免疫学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1803920';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1803920', '保护生物学  1905030 心理神经免疫学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算生物学  1905040 心理药理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1803930';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1803930', '计算生物学  1905040 心理药理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 营养生物学  1905510 交通心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1803940';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1803940', '营养生物学  1905510 交通心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 进化生态学  1905515 消费心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1804421';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1804421', '进化生态学  1905515 消费心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 分子生态学  1905520 营销心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1804422';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1804422', '分子生态学  1905520 营销心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 行为生态学  1905525 经济心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1804423';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1804423', '行为生态学  1905525 经济心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 恢复生态学  1906010 干部心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1804455';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1804455', '恢复生态学  1906010 干部心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 景观生态学  1906020 绩效评估技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1804460';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1804460', '景观生态学  1906020 绩效评估技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 水生生态学与湖泊生态学  1906510 心理人类学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1804465';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1804465', '水生生态学与湖泊生态学  1906510 心理人类学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族植物学  1907020 学校心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1805181';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1805181', '民族植物学  1907020 学校心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 普通病毒学  1907510 罪犯心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1806405';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1806405', '普通病毒学  1907510 罪犯心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 噬菌体学  1907520 证人心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1806450';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1806450', '噬菌体学  1907520 证人心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 医学病毒学  2101010 农业科技史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1806460';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1806460', '医学病毒学  2101010 农业科技史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理学国际传播  2101020 农村社会史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1901010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1901010', '心理学国际传播  2101020 农村社会史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理学理论  2101030 农业文化史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1901020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1901020', '心理学理论  2101030 农业文化史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 知觉  2104510 农产品贮藏与加工
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1901510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1901510', '知觉  2104510 农产品贮藏与加工', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 阅读心理学  2104520 粮油产品贮藏与加工
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1901520';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1901520', '阅读心理学  2104520 粮油产品贮藏与加工', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理语言学  2104540 土特产品贮藏与加工
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1901530';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1901530', '心理语言学  2104540 土特产品贮藏与加工', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 认知神经科学  2104550 农副产品综合利用
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1901540';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1901540', '认知神经科学  2104550 农副产品综合利用', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 色彩心理学  2105060 土壤修复
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1901550';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1901550', '色彩心理学  2105060 土壤修复', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 家庭心理学  2106036 植物真菌学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1902010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1902010', '家庭心理学  2106036 植物真菌学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 婚姻心理学  2106037 植物细菌学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1902020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1902020', '婚姻心理学  2106037 植物细菌学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人际心理学  2106038 植物线虫学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1902030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1902030', '人际心理学  2106038 植物线虫学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 道德心理学  2106066 有害生物生态调控
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1902040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1902040', '道德心理学  2106066 有害生物生态调控', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理学研究方法  2106067 农业转基因生物安全学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1902510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1902510', '心理学研究方法  2106067 农业转基因生物安全学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 婴儿心理学  2202010 种苗学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1903510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1903510', '婴儿心理学  2202010 种苗学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 儿童心理学  2202020 造林学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1903520';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1903520', '儿童心理学  2202020 造林学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 妇女心理学  2302005 农业动物资源学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1903530';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1903530', '妇女心理学  2302005 农业动物资源学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 老年心理学  2303005 预防兽医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1903540';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1903540', '老年心理学  2303005 预防兽医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  RAISE NOTICE '学科数据（第 14 批）创建完成';
END $$;
