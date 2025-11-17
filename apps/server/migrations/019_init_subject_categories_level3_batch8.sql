-- 初始化学科分类 - 三级学科分类（第 8 批：第 701-800 个）
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，创建三级学科分类

SET search_path TO pikun_db, public;

DO $$
DECLARE
  parent_category_id UUID;
  category_id_var UUID;
  parent_code_var VARCHAR(50);
BEGIN

  -- 植物生态学 (父分类: 18051)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18051';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805160', '植物生态学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 植物地理学 (父分类: 18051)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18051';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805165', '植物地理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 植物群落学 (父分类: 18051)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18051';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805170', '植物群落学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 植物分类学 (父分类: 18051)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18051';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805175', '植物分类学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 实验植物学 (父分类: 18051)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18051';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805180', '实验植物学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族植物学 (父分类: 18051)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18051';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805181', '民族植物学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 植物寄生虫学 (父分类: 18051)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18051';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805185', '植物寄生虫学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 植物学其他学科 (父分类: 18051)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18051';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805199', '植物学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫生物化学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805410', '昆虫生物化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫形态学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805415', '昆虫形态学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫组织学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805420', '昆虫组织学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫生理学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805425', '昆虫生理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫生态学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805430', '昆虫生态学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫病理学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805435', '昆虫病理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫毒理学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805440', '昆虫毒理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫行为学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805445', '昆虫行为学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫分类学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805450', '昆虫分类学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 实验昆虫学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805455', '实验昆虫学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫病毒学 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805460', '昆虫病毒学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 昆虫学其他学科 (父分类: 18054)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18054';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805499', '昆虫学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物生物物理学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805711', '动物生物物理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物生物化学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805714', '动物生物化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物形态学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805717', '动物形态学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物解剖学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805721', '动物解剖学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物组织学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805724', '动物组织学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物细胞学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805727', '动物细胞学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物生理学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805731', '动物生理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物生殖生物学 包括动物繁殖学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805734', '动物生殖生物学 包括动物繁殖学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物生长发育学 包括动物胚胎学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805737', '动物生长发育学 包括动物胚胎学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物遗传学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805741', '动物遗传学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物生态学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805744', '动物生态学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物病理学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805747', '动物病理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物行为学 含动物驯化学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805751', '动物行为学 含动物驯化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物地理学 含昆虫生物地理学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805754', '动物地理学 含昆虫生物地理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物分类学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805757', '动物分类学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 实验动物学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805761', '实验动物学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物寄生虫学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805764', '动物寄生虫学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物病毒学 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805767', '动物病毒学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物学其他学科 (父分类: 18057)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18057';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805799', '动物学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微生物生物化学 (父分类: 18061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806110', '微生物生物化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微生物生理学 (父分类: 18061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806115', '微生物生理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微生物遗传学 (父分类: 18061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806120', '微生物遗传学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微生物生态学 (父分类: 18061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806125', '微生物生态学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微生物免疫学 (父分类: 18061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806130', '微生物免疫学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微生物分类学 (父分类: 18061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806135', '微生物分类学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 真菌学 (父分类: 18061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806140', '真菌学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 细菌学 (父分类: 18061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806145', '细菌学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 应用与环境微生物学 具体应用入有关学科。 原名为 “应用微生物学” (父分类: 18061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806150', '应用与环境微生物学 具体应用入有关学科。 原名为 “应用微生物学”', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微生物学其他学科 (父分类: 18061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806199', '微生物学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 普通病毒学 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806405', '普通病毒学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 病毒生物化学 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806410', '病毒生物化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 分子病毒学 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806420', '分子病毒学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 病毒生态学 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806430', '病毒生态学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 病毒分类学 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806440', '病毒分类学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 噬菌体学 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806450', '噬菌体学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 医学病毒学 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806460', '医学病毒学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 病毒学其他学科 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806499', '病毒学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人类起源与演化学 (父分类: 18067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806710', '人类起源与演化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人类形态学 (父分类: 18067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806715', '人类形态学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人类遗传学 (父分类: 18067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806720', '人类遗传学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 分子人类学 (父分类: 18067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806725', '分子人类学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人类生态学 亦称“人文生态学” (父分类: 18067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806730', '人类生态学 亦称“人文生态学”', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理人类学 (父分类: 18067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806735', '心理人类学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 古人类学 (父分类: 18067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806740', '古人类学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人种学 (父分类: 18067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806745', '人种学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人体测量学 (父分类: 18067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806750', '人体测量学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人类学其他学科 (父分类: 18067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806799', '人类学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理学国际传播 (父分类: 19010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901010', '心理学国际传播', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理学理论 包括西方心理学流派 (父分类: 19010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901020', '心理学理论 包括西方心理学流派', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 知觉 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901510', '知觉', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 阅读心理学 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901520', '阅读心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理语言学 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901530', '心理语言学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 认知神经科学 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901540', '认知神经科学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 色彩心理学 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901550', '色彩心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 认知心理学其他学科 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901599', '认知心理学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 家庭心理学 (父分类: 19020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902010', '家庭心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 婚姻心理学 (父分类: 19020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902020', '婚姻心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人际心理学 (父分类: 19020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902030', '人际心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 道德心理学 (父分类: 19020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902040', '道德心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会心理学其他学科 (父分类: 19020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902099', '社会心理学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理学研究方法 (父分类: 19025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902510', '心理学研究方法', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 实验心理学其他学科 (父分类: 19025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902599', '实验心理学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 婴儿心理学 (父分类: 19035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1903510', '婴儿心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 儿童心理学 (父分类: 19035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1903520', '儿童心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 妇女心理学 (父分类: 19035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1903530', '妇女心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 老年心理学 包括长寿心理学 (父分类: 19035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1903540', '老年心理学 包括长寿心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 发展心理学其他学科 (父分类: 19035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1903599', '发展心理学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 医患心理学 (父分类: 19040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904010', '医患心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 健康心理学 (父分类: 19040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904020', '健康心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 医学心理学其他学科 (父分类: 19040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904099', '医学心理学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 异常心理学 (父分类: 19041)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19041';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904110', '异常心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人格心理学其他学科 (父分类: 19041)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19041';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904199', '人格心理学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 咨询心理技术 (父分类: 19042)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19042';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904210', '咨询心理技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 员工援助技术 (父分类: 19042)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19042';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904220', '员工援助技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 临床与咨询心理学其他学科 (父分类: 19042)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19042';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904299', '临床与咨询心理学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理测量理论 (父分类: 19045)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19045';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904510', '心理测量理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理测量技术 (父分类: 19045)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19045';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904520', '心理测量技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理统计原理 (父分类: 19046)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19046';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904610', '心理统计原理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理统计方法 (父分类: 19046)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19046';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1904620', '心理统计方法', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 感觉心理学 (父分类: 19050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1905010', '感觉心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  RAISE NOTICE '三级学科分类（第 8 批）创建完成';
END $$;
