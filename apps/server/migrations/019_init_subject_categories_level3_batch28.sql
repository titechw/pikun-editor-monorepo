-- 初始化学科分类 - 三级学科分类（第 28 批：第 2701-2800 个）
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，创建三级学科分类

SET search_path TO pikun_db, public;

DO $$
DECLARE
  parent_category_id UUID;
  category_id_var UUID;
  parent_code_var VARCHAR(50);
BEGIN

  -- 情报检索学 包括情报检索语言等 (父分类: 87030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8703050', '情报检索学 包括情报检索语言等', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报系统理论 包括情报系统分析与设计、 情报网络建设理论 (父分类: 87030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8703055', '情报系统理论 包括情报系统分析与设计、 情报网络建设理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报技术 (父分类: 87030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8703060', '情报技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 科学技术情报学 (父分类: 87030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8703065', '科学技术情报学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会科学情报学 (父分类: 87030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8703070', '社会科学情报学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 情报学其他学科 (父分类: 87030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8703099', '情报学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 档案学史 包括档案事业史 (父分类: 87040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8704010', '档案学史 包括档案事业史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 档案管理学 (父分类: 87040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8704020', '档案管理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 档案保护技术学 (父分类: 87040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8704030', '档案保护技术学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 档案编纂学 (父分类: 87040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8704040', '档案编纂学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 档案学其他学科 (父分类: 87040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '87040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8704099', '档案学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 国民经济核算 原名称及代码为“9101520统计核算理论” (父分类: 91030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9103015', '国民经济核算 原名称及代码为“9101520统计核算理论”', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 经济统计分析 (父分类: 91030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9103025', '经济统计分析', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 经济统计学其他学科 (父分类: 91030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9103099', '经济统计学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 教育统计学 (父分类: 91040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9104010', '教育统计学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文化与体育统计学 (父分类: 91040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9104020', '文化与体育统计学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 司法统计学 (父分类: 91040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9104040', '司法统计学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会保障统计学 原名为“社会福利与社会保障统计学” (父分类: 91040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9104050', '社会保障统计学 原名为“社会福利与社会保障统计学”', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生活质量统计学 (父分类: 91040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9104060', '生活质量统计学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会统计学其他学科 (父分类: 91040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9104099', '社会统计学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 资源统计学 原名为“自然资源统计学” (父分类: 91050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9105010', '资源统计学 原名为“自然资源统计学”', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境统计学 (父分类: 91050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9105020', '环境统计学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生态统计学 原名为“生态平衡统计学” (父分类: 91050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9105030', '生态统计学 原名为“生态平衡统计学”', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境与生态统计学其他学科 (父分类: 91050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9105099', '环境与生态统计学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物统计学 (父分类: 91060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9106010', '生物统计学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物与医学统计学其他学科 (父分类: 91060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '91060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '9106099', '生物与医学统计学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 优化计算方法  1502075 金属有机光化学 (父分类: 11061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '11061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1106155', '优化计算方法  1502075 金属有机光化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 数值逼近与计算几何  1506510 软化学 (父分类: 11061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '11061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1106165', '数值逼近与计算几何  1506510 软化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 并行计算算法  1506520 碳化学 (父分类: 11061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '11061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1106175', '并行计算算法  1506520 碳化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 小波分析与傅立叶分析的数值方法  1506530 纳米化学 (父分类: 11061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '11061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1106185', '小波分析与傅立叶分析的数值方法  1506530 纳米化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 反问题计算方法  1602510 空间化学 (父分类: 11061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '11061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1106190', '反问题计算方法  1602510 空间化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 符号计算与计算机推理  1602520 天体元素学 (父分类: 11061)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '11061';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1106195', '符号计算与计算机推理  1602520 天体元素学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 空间统计  1602530 月球与行星化学 (父分类: 11067)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '11067';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1106765', '空间统计  1602530 月球与行星化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 统计计算  1606070 比较行星学 (父分类: 11071)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '11071';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1107135', '统计计算  1606070 比较行星学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 复杂系统与复杂性科学  1606080 月球科学 (父分类: 12020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '12020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1202070', '复杂系统与复杂性科学  1606080 月球科学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微观力学  1607510 时间尺度 (父分类: 13015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '13015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1301556', '微观力学  1607510 时间尺度', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微流体力学  1607520 时间测量与方法 (父分类: 13025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '13025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1302574', '微流体力学  1607520 时间测量与方法', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 流体动力声学  1607530 守时理论 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402025', '流体动力声学  1607530 守时理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 超声学、量子声学和声学效应  1607540 授时理论与方法 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402035', '超声学、量子声学和声学效应  1607540 授时理论与方法', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 次声学  1703060 能源地球化学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402045', '次声学  1703060 能源地球化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 结构声学和振动  1704511 生物地理学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402053', '结构声学和振动  1704511 生物地理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 噪声、噪声效应及其控制  1704513 化学地理学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402056', '噪声、噪声效应及其控制  1704513 化学地理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 建筑声学与电声学  1704514 地貌学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402059', '建筑声学与电声学  1704514 地貌学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 声学信号处理  1704523 区域地理学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402063', '声学信号处理  1704523 区域地理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生理、心理声学和生物声学  1704526 城市地理学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402066', '生理、心理声学和生物声学  1704526 城市地理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 语言声学和语音信号处理  1704531 世界地理学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402069', '语言声学和语音信号处理  1704531 世界地理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 音乐声学  1704539 旅游地理学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402073', '音乐声学  1704539 旅游地理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 声学换能器、声学测量及方法  1705550 地下水文学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402076', '声学换能器、声学测量及方法  1705550 地下水文学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 声学测量方法  1705555 区域水文学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402079', '声学测量方法  1705555 区域水文学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 声学材料  1705560 生态水文学 (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402083', '声学材料  1705560 生态水文学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 信息科学中的声学问题  1706061 遥感海洋学（亦名卫星海洋学） (父分类: 14020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1402086', '信息科学中的声学问题  1706061 遥感海洋学（亦名卫星海洋学）', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 光子学与集成光学  1706065 海洋生态学 (父分类: 14030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1403057', '光子学与集成光学  1706065 海洋生态学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境光学  1706070 环境海洋学 (父分类: 14030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1403062', '环境光学  1706070 环境海洋学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋光学  1706075 海洋资源学 (父分类: 14030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1403064', '海洋光学  1706075 海洋资源学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 光学遥感  1706080 极地科学 (父分类: 14030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1403066', '光学遥感  1706080 极地科学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 超快激光及应用  1801470 生物影像学 (父分类: 14030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1403068', '超快激光及应用  1801470 生物影像学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 介观物理学  1802170 膜生物学 (父分类: 14050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1405085', '介观物理学  1802170 膜生物学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 量子调控  1802180 干细胞生物学 (父分类: 14050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1405090', '量子调控  1802180 干细胞生物学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 玻色—爱因斯坦凝聚和冷原子物理  1802210 分子免疫学 (父分类: 14060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1406055', '玻色—爱因斯坦凝聚和冷原子物理  1802210 分子免疫学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 粒子宇宙学  1802215 免疫治疗学 (父分类: 14070)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '14070';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1407050', '粒子宇宙学  1802215 免疫治疗学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 疫苗学  1904010 医患心理学 (父分类: 18022)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18022';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1802220', '疫苗学  1904010 医患心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 比较发育生物学  1904020 健康心理学 (父分类: 18027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1802710', '比较发育生物学  1904020 健康心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 演化发育生物学  1904110 异常心理学 (父分类: 18027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1802720', '演化发育生物学  1904110 异常心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 繁殖生物学  1904210 咨询心理技术 (父分类: 18027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1802730', '繁殖生物学  1904210 咨询心理技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 表观遗传学  1904220 员工援助技术 (父分类: 18031)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18031';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1803175', '表观遗传学  1904220 员工援助技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 基因组学  1904510 心理测量理论 (父分类: 18037)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18037';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1803710', '基因组学  1904510 心理测量理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核糖核酸组学  1904520 心理测量技术 (父分类: 18037)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18037';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1803720', '核糖核酸组学  1904520 心理测量技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 蛋白质组学  1904610 心理统计原理 (父分类: 18037)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18037';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1803730', '蛋白质组学  1904610 心理统计原理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 代谢组学  1904620 心理统计方法 (父分类: 18037)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18037';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1803740', '代谢组学  1904620 心理统计方法', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物信息学  1905010 感觉心理学 (父分类: 18037)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18037';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1803750', '生物信息学  1905010 感觉心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 水生生物学  1905020 比较心理学 (父分类: 18039)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18039';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1803910', '水生生物学  1905020 比较心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 保护生物学  1905030 心理神经免疫学 (父分类: 18039)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18039';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1803920', '保护生物学  1905030 心理神经免疫学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算生物学  1905040 心理药理学 (父分类: 18039)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18039';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1803930', '计算生物学  1905040 心理药理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 营养生物学  1905510 交通心理学 (父分类: 18039)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18039';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1803940', '营养生物学  1905510 交通心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 进化生态学  1905515 消费心理学 (父分类: 18044)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18044';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1804421', '进化生态学  1905515 消费心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 分子生态学  1905520 营销心理学 (父分类: 18044)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18044';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1804422', '分子生态学  1905520 营销心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 行为生态学  1905525 经济心理学 (父分类: 18044)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18044';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1804423', '行为生态学  1905525 经济心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 恢复生态学  1906010 干部心理学 (父分类: 18044)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18044';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1804455', '恢复生态学  1906010 干部心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 景观生态学  1906020 绩效评估技术 (父分类: 18044)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18044';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1804460', '景观生态学  1906020 绩效评估技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 水生生态学与湖泊生态学  1906510 心理人类学 (父分类: 18044)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18044';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1804465', '水生生态学与湖泊生态学  1906510 心理人类学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族植物学  1907020 学校心理学 (父分类: 18051)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18051';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1805181', '民族植物学  1907020 学校心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 普通病毒学  1907510 罪犯心理学 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806405', '普通病毒学  1907510 罪犯心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 噬菌体学  1907520 证人心理学 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806450', '噬菌体学  1907520 证人心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 医学病毒学  2101010 农业科技史 (父分类: 18064)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '18064';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1806460', '医学病毒学  2101010 农业科技史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理学国际传播  2101020 农村社会史 (父分类: 19010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901010', '心理学国际传播  2101020 农村社会史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理学理论  2101030 农业文化史 (父分类: 19010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901020', '心理学理论  2101030 农业文化史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 知觉  2104510 农产品贮藏与加工 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901510', '知觉  2104510 农产品贮藏与加工', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 阅读心理学  2104520 粮油产品贮藏与加工 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901520', '阅读心理学  2104520 粮油产品贮藏与加工', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理语言学  2104540 土特产品贮藏与加工 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901530', '心理语言学  2104540 土特产品贮藏与加工', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 认知神经科学  2104550 农副产品综合利用 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901540', '认知神经科学  2104550 农副产品综合利用', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 色彩心理学  2105060 土壤修复 (父分类: 19015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1901550', '色彩心理学  2105060 土壤修复', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 家庭心理学  2106036 植物真菌学 (父分类: 19020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902010', '家庭心理学  2106036 植物真菌学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 婚姻心理学  2106037 植物细菌学 (父分类: 19020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902020', '婚姻心理学  2106037 植物细菌学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人际心理学  2106038 植物线虫学 (父分类: 19020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902030', '人际心理学  2106038 植物线虫学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 道德心理学  2106066 有害生物生态调控 (父分类: 19020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902040', '道德心理学  2106066 有害生物生态调控', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理学研究方法  2106067 农业转基因生物安全学 (父分类: 19025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1902510', '心理学研究方法  2106067 农业转基因生物安全学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 婴儿心理学  2202010 种苗学 (父分类: 19035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1903510', '婴儿心理学  2202010 种苗学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 儿童心理学  2202020 造林学 (父分类: 19035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1903520', '儿童心理学  2202020 造林学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 妇女心理学  2302005 农业动物资源学 (父分类: 19035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1903530', '妇女心理学  2302005 农业动物资源学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 老年心理学  2303005 预防兽医学 (父分类: 19035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '19035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '1903540', '老年心理学  2303005 预防兽医学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  RAISE NOTICE '三级学科分类（第 28 批）创建完成';
END $$;
