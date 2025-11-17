-- 初始化学科分类 - 三级学科分类（第 26 批：第 2501-2600 个）
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，创建三级学科分类

SET search_path TO pikun_db, public;

DO $$
DECLARE
  parent_category_id UUID;
  category_id_var UUID;
  parent_code_var VARCHAR(50);
BEGIN

  -- 劳动法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203030', '劳动法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 婚姻法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203035', '婚姻法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民事诉讼法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203040', '民事诉讼法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 行政诉讼法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203045', '行政诉讼法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 刑事诉讼法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203050', '刑事诉讼法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 刑法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203055', '刑法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 刑事侦查学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203060', '刑事侦查学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 司法鉴定学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203065', '司法鉴定学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203070', '军事法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卫生法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203072', '卫生法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203075', '环境法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203080', '安全法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 知识产权法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203085', '知识产权法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 宗教法学 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203088', '宗教法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 部门法学其他学科 (父分类: 82030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8203099', '部门法学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 国际公法学 (父分类: 82040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8204010', '国际公法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 国际私法学 (父分类: 82040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8204020', '国际私法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 国际刑法学 (父分类: 82040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8204030', '国际刑法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 国际经济法学 (父分类: 82040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8204040', '国际经济法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 国际环境法学 (父分类: 82040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8204050', '国际环境法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 国际知识产权法学 (父分类: 82040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8204060', '国际知识产权法学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 国际法学其他学科 (父分类: 82040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '82040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8204099', '国际法学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 马、恩、列、斯军事理论 (父分类: 83010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8301010', '马、恩、列、斯军事理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 毛泽东军事思想 (父分类: 83010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8301020', '毛泽东军事思想', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事理论其他学科 (父分类: 83010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8301099', '军事理论其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中国古代战争史 (父分类: 83015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8301510', '中国古代战争史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中国近代战争史 (父分类: 83015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8301520', '中国近代战争史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中国现代战争史 (父分类: 83015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8301530', '中国现代战争史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 世界战争史 (父分类: 83015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8301540', '世界战争史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事思想史 (父分类: 83015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8301550', '军事思想史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事技术史 (父分类: 83015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8301560', '军事技术史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事史其他学科 (父分类: 83015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8301599', '军事史其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 战略学理论 (父分类: 83025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8302510', '战略学理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 核战略学 (父分类: 83025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8302520', '核战略学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 战略学其他学科 (父分类: 83025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8302599', '战略学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 合同战役学 (父分类: 83030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303010', '合同战役学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海军战役学 (父分类: 83030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303020', '海军战役学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 空军战役学 (父分类: 83030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303030', '空军战役学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 导弹部队战役学 (父分类: 83030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303040', '导弹部队战役学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 陆军战役学 包括炮兵战役学、装甲兵战役学 (父分类: 83030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303050', '陆军战役学 包括炮兵战役学、装甲兵战役学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 战役学其他学科 (父分类: 83030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303099', '战役学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 合同战术学 (父分类: 83035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303510', '合同战术学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 陆军战术学 包括炮兵战术学、装甲兵战术学、工程兵战术 (父分类: 83035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303520', '陆军战术学 包括炮兵战术学、装甲兵战术学、工程兵战术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海军战术学 (父分类: 83035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303530', '海军战术学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 空军战术学 (父分类: 83035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303540', '空军战术学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 导弹部队战术学 (父分类: 83035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303550', '导弹部队战术学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 战术学其他学科 (父分类: 83035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8303599', '战术学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 作战指挥 (父分类: 83040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8304010', '作战指挥', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事系统工程 亦称军事运筹学 (父分类: 83040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8304020', '军事系统工程 亦称军事运筹学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事通信学 (父分类: 83040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8304030', '军事通信学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事情报学 (父分类: 83040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8304040', '军事情报学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军队指挥学其他学科 (父分类: 83040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8304099', '军队指挥学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事组织体制 (父分类: 83045)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83045';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8304510', '军事组织体制', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事装备学 (父分类: 83045)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83045';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8304520', '军事装备学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军队管理学 (父分类: 83045)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83045';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8304530', '军队管理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军制学其他学科 (父分类: 83045)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83045';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8304599', '军制学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军队思想教育工作学 (父分类: 83050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8305010', '军队思想教育工作学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军队组织工作学 (父分类: 83050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8305020', '军队组织工作学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军队政治工作学其他学科 (父分类: 83050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8305099', '军队政治工作学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 后勤组织指挥 (父分类: 83055)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83055';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8305510', '后勤组织指挥', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 后方专业勤务 (父分类: 83055)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83055';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8305520', '后方专业勤务', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事后勤学其他学科 (父分类: 83055)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83055';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8305599', '军事后勤学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中国军事地理 (父分类: 83060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8306010', '中国军事地理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 世界军事地理 (父分类: 83060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8306020', '世界军事地理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事地形学 (父分类: 83060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8306030', '军事地形学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事测绘学 (父分类: 83060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8306040', '军事测绘学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事气象学 (父分类: 83060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8306050', '军事气象学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事水文学 (父分类: 83060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8306060', '军事水文学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事地学其他学科 (父分类: 83060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '83060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8306099', '军事地学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中国社会学史 (父分类: 84011)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84011';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8401110', '中国社会学史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 外国社会学史 (父分类: 84011)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84011';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8401120', '外国社会学史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会学史其他学科 (父分类: 84011)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84011';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8401199', '社会学史其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会学原理 (父分类: 84014)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84014';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8401410', '社会学原理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会思想史 (父分类: 84014)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84014';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8401420', '社会思想史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会学理论其他学科 (父分类: 84014)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84014';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8401499', '社会学理论其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会调查方法 (父分类: 84017)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84017';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8401710', '社会调查方法', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会学方法其他学科 (父分类: 84017)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84017';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8401799', '社会学方法其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 职业社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402711', '职业社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 工业社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402714', '工业社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 医学社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402717', '医学社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 城市社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402727', '城市社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农村社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402731', '农村社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402734', '环境社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 家庭社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402737', '家庭社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 青年社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402741', '青年社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 老年社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402744', '老年社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 犯罪社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402747', '犯罪社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 越轨社会学 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402751', '越轨社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 妇女问题研究 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402754', '妇女问题研究', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 种族问题研究 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402757', '种族问题研究', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会问题研究 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402761', '社会问题研究', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会群体及分层问题研究 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402764', '社会群体及分层问题研究', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社区研究 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402767', '社区研究', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会保障研究 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402771', '社会保障研究', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会工作 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402774', '社会工作', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 应用社会学其他学科 (父分类: 84027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8402799', '应用社会学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 艺术社会学 (父分类: 84037)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84037';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8403710', '艺术社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 知识社会学 (父分类: 84037)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84037';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8403720', '知识社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 道德社会学 (父分类: 84037)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84037';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8403730', '道德社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文化社会学其他学科 (父分类: 84037)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '84037';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '8403799', '文化社会学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  RAISE NOTICE '三级学科分类（第 26 批）创建完成';
END $$;
