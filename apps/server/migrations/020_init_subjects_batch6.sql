-- 初始化学科数据 - 第 6 批：第 1001-1200 个学科
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，将三级学科分类作为学科录入

SET search_path TO pikun_db, public;

DO $$
DECLARE
  category_id_var UUID;
  subject_id_var UUID;
BEGIN

  -- 实验诊断学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3201160';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3201160', '实验诊断学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 临床诊断学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3201199';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3201199', '临床诊断学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 康复医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3201410';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3201410', '康复医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 运动医学 包括力学运动医学等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3201420';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3201420', '运动医学 包括力学运动医学等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 老年医学 包括老年基础医学和老年临床医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3201430';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3201430', '老年医学 包括老年基础医学和老年临床医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 保健医学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3201499';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3201499', '保健医学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 麻醉生理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202110', '麻醉生理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 麻醉药理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202120', '麻醉药理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 麻醉应用解剖学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202130', '麻醉应用解剖学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 麻醉学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202199';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202199', '麻醉学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心血管病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202410';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202410', '心血管病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 呼吸病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202415';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202415', '呼吸病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 结核病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202420';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202420', '结核病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 消化病学 原名为“胃肠病学”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202425';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202425', '消化病学 原名为“胃肠病学”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 血液病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202430';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202430', '血液病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 肾脏病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202435';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202435', '肾脏病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 内分泌病学与代谢病学 原名为“内分泌学”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202440';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202440', '内分泌病学与代谢病学 原名为“内分泌学”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 风湿病学与自体免疫病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202445';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202445', '风湿病学与自体免疫病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 变态反应学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202450';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202450', '变态反应学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 感染性疾病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202455';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202455', '感染性疾病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传染病学 代码原为33024
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202460';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202460', '传染病学 代码原为33024', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 内科学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202499';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202499', '内科学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 普通外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202710';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202710', '普通外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 显微外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202715';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202715', '显微外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 神经外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202720';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202720', '神经外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 颅脑外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202725';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202725', '颅脑外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 胸外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202730';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202730', '胸外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心血管外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202735';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202735', '心血管外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 泌尿外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202740';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202740', '泌尿外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 骨外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202745';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202745', '骨外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 烧伤外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202750';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202750', '烧伤外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 整形外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202755';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202755', '整形外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 器官移植外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202760';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202760', '器官移植外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 实验外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202765';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202765', '实验外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 小儿外科学 包括小儿普通外科学、小儿骨外科学、小儿胸
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202770';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202770', '小儿外科学 包括小儿普通外科学、小儿骨外科学、小儿胸', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 外科学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202799';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202799', '外科学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 妇科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3203110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3203110', '妇科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 产科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3203120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3203120', '产科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 围产医学 亦称围生医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3203130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3203130', '围产医学 亦称围生医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 助产学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3203140';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3203140', '助产学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 胎儿学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3203150';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3203150', '胎儿学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 妇科产科手术学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3203160';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3203160', '妇科产科手术学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 妇产科学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3203199';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3203199', '妇产科学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 小儿内科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3203410';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3203410', '小儿内科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 儿科学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3203499';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3203499', '儿科学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 口腔解剖生理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3204410';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3204410', '口腔解剖生理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 口腔组织学与口腔病理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3204415';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3204415', '口腔组织学与口腔病理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 口腔材料学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3204420';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3204420', '口腔材料学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 口腔影象诊断学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3204425';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3204425', '口腔影象诊断学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 口腔内科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3204430';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3204430', '口腔内科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 口腔颌面外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3204435';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3204435', '口腔颌面外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 口腔矫形学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3204440';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3204440', '口腔矫形学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 口腔正畸学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3204445';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3204445', '口腔正畸学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 口腔病预防学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3204450';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3204450', '口腔病预防学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 口腔医学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3204499';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3204499', '口腔医学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 肿瘤免疫学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3206710';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3206710', '肿瘤免疫学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 肿瘤病因学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3206720';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3206720', '肿瘤病因学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 肿瘤病理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3206730';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3206730', '肿瘤病理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 肿瘤诊断学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3206740';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3206740', '肿瘤诊断学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 肿瘤治疗学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3206750';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3206750', '肿瘤治疗学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 肿瘤预防学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3206760';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3206760', '肿瘤预防学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 实验肿瘤学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3206770';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3206770', '实验肿瘤学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 肿瘤学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3206799';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3206799', '肿瘤学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 基础护理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3207110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3207110', '基础护理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 专科护理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3207120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3207120', '专科护理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 特殊护理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3207130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3207130', '特殊护理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 护理心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3207140';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3207140', '护理心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 护理伦理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3207150';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3207150', '护理伦理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 护理管理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3207160';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3207160', '护理管理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 护理学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3207199';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3207199', '护理学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卫生监督学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3308110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3308110', '卫生监督学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卫生政策学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3308120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3308120', '卫生政策学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卫生信息管理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3308130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3308130', '卫生信息管理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卫生管理学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3308199';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3308199', '卫生管理学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 野战外科学和创伤外科学 原名为“野战外科学”
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401010', '野战外科学和创伤外科学 原名为“野战外科学”', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军队流行病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401015', '军队流行病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事环境医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401020', '军事环境医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军队卫生学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401025', '军队卫生学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军队卫生装备学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401030', '军队卫生装备学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事人机工效学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401035', '军事人机工效学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核武器医学防护学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401040', '核武器医学防护学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 化学武器医学防护学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401045', '化学武器医学防护学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物武器医学防护学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401050', '生物武器医学防护学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 激光与微波医学防护学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401055', '激光与微波医学防护学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事医学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401099', '军事医学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 航空航天医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3402010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3402010', '航空航天医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 潜水医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3402020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3402020', '潜水医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 航海医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3402030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3402030', '航海医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 法医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3402040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3402040', '法医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 高压氧医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3402050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3402050', '高压氧医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 特种医学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3402099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3402099', '特种医学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医基础理论 包括经络学等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601011';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601011', '中医基础理论 包括经络学等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医诊断学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601014';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601014', '中医诊断学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医内科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601017';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601017', '中医内科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601021';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601021', '中医外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医骨伤科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601024';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601024', '中医骨伤科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医妇科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601027';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601027', '中医妇科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医儿科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601031';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601031', '中医儿科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医眼科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601034';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601034', '中医眼科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医耳鼻咽喉科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601037';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601037', '中医耳鼻咽喉科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医口腔科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601041';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601041', '中医口腔科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医老年病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601044';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601044', '中医老年病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 针灸学 包括针刺镇痛与麻醉等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601047';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601047', '针灸学 包括针刺镇痛与麻醉等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 按摩推拿学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601051';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601051', '按摩推拿学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医养生康复学 包括气功研究等
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601054';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601054', '中医养生康复学 包括气功研究等', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医护理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601057';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601057', '中医护理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医食疗学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601061';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601061', '中医食疗学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 方剂学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601064';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601064', '方剂学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医文献学 包括难经、内经、伤寒论、金匮要略、腧穴学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601067';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601067', '中医文献学 包括难经、内经、伤寒论、金匮要略、腧穴学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中医学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3601099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3601099', '中医学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 藏医药学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3602010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3602010', '藏医药学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 蒙医药学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3602020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3602020', '蒙医药学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 维吾尔医药学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3602030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3602030', '维吾尔医药学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族草药学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3602040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3602040', '民族草药学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族医学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3602099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3602099', '民族医学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合基础医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603010', '中西医结合基础医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合医学导论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603020', '中西医结合医学导论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合预防医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603030', '中西医结合预防医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合临床医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603040', '中西医结合临床医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合护理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603050', '中西医结合护理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合康复医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603060', '中西医结合康复医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合养生保健医学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603070', '中西医结合养生保健医学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合医学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603099', '中西医结合医学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中药化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3604010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3604010', '中药化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中药药理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3604015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3604015', '中药药理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 本草学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3604020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3604020', '本草学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 药用植物学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3604025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3604025', '药用植物学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中药鉴定学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3604030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3604030', '中药鉴定学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中药炮制学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3604035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3604035', '中药炮制学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中药药剂学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3604040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3604040', '中药药剂学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中药资源学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3604045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3604045', '中药资源学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中药管理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3604050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3604050', '中药管理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中药学其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3604099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3604099', '中药学其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 标准原理与方法 包括标准原理、标准体系、标准一致性测试、
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4105010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4105010', '标准原理与方法 包括标准原理、标准体系、标准一致性测试、', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 标准基础学 包括标准化发展史、 标准经济学、 术语标准化、
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4105020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4105020', '标准基础学 包括标准化发展史、 标准经济学、 术语标准化、', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 标准工程与应用 包括标准化机制与体制研究、标准管理学、质
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4105050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4105050', '标准工程与应用 包括标准化机制与体制研究、标准管理学、质', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 标准科学技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4105099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4105099', '标准科学技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 密封技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4107010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4107010', '密封技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 粉末技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4107020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4107020', '粉末技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 真空技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4107030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4107030', '真空技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 薄膜技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4107040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4107040', '薄膜技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 爆破技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4107050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4107050', '爆破技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 包装技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4107060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4107060', '包装技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 照相技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4107070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4107070', '照相技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 物料搬运技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4107080';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4107080', '物料搬运技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 工程通用技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4107099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4107099', '工程通用技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 自动控制应用理论 包括线性、非线性、随机控制，最优控制、自
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131010', '自动控制应用理论 包括线性、非线性、随机控制，最优控制、自', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 指挥与控制系统工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131015', '指挥与控制系统工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 控制系统仿真技术 代码原为5108020
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131020', '控制系统仿真技术 代码原为5108020', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 导航制导与控制 包括惯性导航与惯性制导
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131025', '导航制导与控制 包括惯性导航与惯性制导', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机电一体化技术 代码原为5108030
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131030', '机电一体化技术 代码原为5108030', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 自动化仪器仪表与装置 代码原为5108040
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131040', '自动化仪器仪表与装置 代码原为5108040', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机器人控制 代码原为5108050
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131050', '机器人控制 代码原为5108050', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 自动化技术应用 具体应用入有关学科。代码原为5108060
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131060', '自动化技术应用 具体应用入有关学科。代码原为5108060', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 控制科学与技术其它学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131099', '控制科学与技术其它学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真科学技术基础学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131510', '仿真科学技术基础学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真建模理论与技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131520';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131520', '仿真建模理论与技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真系统理论与技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131530';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131530', '仿真系统理论与技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真应用 具体应用入有关学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131540';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131540', '仿真应用 具体应用入有关学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真科学技术其它学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131599';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131599', '仿真科学技术其它学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 密码学 代码原为8304050
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132010', '密码学 代码原为8304050', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全协议
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132015', '安全协议', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 系统安全
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132020', '系统安全', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 网络安全
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132025', '网络安全', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 软件安全
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132030', '软件安全', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 信息隐藏
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132035', '信息隐藏', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全测评
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132040', '安全测评', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 信息安全工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132045', '信息安全工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 信息安全其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132099', '信息安全其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 地理信息系统 代码原为4203040
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4133010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4133010', '地理信息系统 代码原为4203040', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 全球定位系统
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4133020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4133020', '全球定位系统', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋信息技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4133030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4133030', '海洋信息技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 信息技术系统性应用其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4133099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4133099', '信息技术系统性应用其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 同步辐射及实验技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4161010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4161010', '同步辐射及实验技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 物理学相关工程与技术其他学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4161099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4161099', '物理学相关工程与技术其他学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋工程结构与施工 代码原为5705010
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163010', '海洋工程结构与施工 代码原为5705010', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海底矿产开发 代码原为5705020
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163015', '海底矿产开发 代码原为5705020', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海水资源利用 代码原为5705030
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163020', '海水资源利用 代码原为5705030', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋环境工程 代码原为5705040
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163025', '海洋环境工程 代码原为5705040', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海岸工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163030', '海岸工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 近海工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163035', '近海工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 深海工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163040', '深海工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋资源开发利用技术 包括海洋矿产资源、海水资源、海洋生物、海
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163045', '海洋资源开发利用技术 包括海洋矿产资源、海水资源、海洋生物、海', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋观测预报技术 包括海洋水下技术、海洋观测技术、海洋遥感
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163050', '海洋观测预报技术 包括海洋水下技术、海洋观测技术、海洋遥感', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋环境保护技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163055', '海洋环境保护技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋工程与技术其他学科 代码原为5705099
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4163099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4163099', '海洋工程与技术其他学科 代码原为5705099', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 基因工程 亦称遗传工程。代码原为1807110
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4164010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4164010', '基因工程 亦称遗传工程。代码原为1807110', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 细胞工程 代码原为1807120
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4164015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4164015', '细胞工程 代码原为1807120', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 蛋白质工程 代码原为1807130
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4164020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4164020', '蛋白质工程 代码原为1807130', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 代谢工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4164025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4164025', '代谢工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 酶工程 代码原为1807140
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4164030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4164030', '酶工程 代码原为1807140', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 发酵工程 亦称微生物工程。代码原为1807150
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4164040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4164040', '发酵工程 亦称微生物工程。代码原为1807150', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物传感技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4164045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4164045', '生物传感技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 纳米生物分析技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4164050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4164050', '纳米生物分析技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物工程其他学科 代码原为1807199
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4164099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4164099', '生物工程其他学科 代码原为1807199', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农业机械学 包括农业机械制造等。代码原为2107010
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4165010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4165010', '农业机械学 包括农业机械制造等。代码原为2107010', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农业机械化 代码原为2107015
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4165015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4165015', '农业机械化 代码原为2107015', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农业电气化与自动化 代码原为2107020
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4165020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4165020', '农业电气化与自动化 代码原为2107020', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农田水利 包括灌溉工程、 排水工程等。 代码原为2107025
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4165025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4165025', '农田水利 包括灌溉工程、 排水工程等。 代码原为2107025', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 水土保持学 包括土壤侵蚀学、水土保持监测、水土保持生
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4165030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4165030', '水土保持学 包括土壤侵蚀学、水土保持监测、水土保持生', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  RAISE NOTICE '学科数据（第 6 批）创建完成';
END $$;
