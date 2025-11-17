-- 初始化学科分类 - 三级学科分类（第 19 批：第 1801-1900 个）
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，创建三级学科分类

SET search_path TO pikun_db, public;

DO $$
DECLARE
  parent_category_id UUID;
  category_id_var UUID;
  parent_code_var VARCHAR(50);
BEGIN

  -- 三废处理与综合利用 (父分类: 61030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '61030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6103030', '三废处理与综合利用', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 噪声与震动控制 (父分类: 61030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '61030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6103035', '噪声与震动控制', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境质量监测与评价 (父分类: 61030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '61030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6103040', '环境质量监测与评价', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境规划 (父分类: 61030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '61030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6103045', '环境规划', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境系统工程 (父分类: 61030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '61030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6103050', '环境系统工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境修复工程 包括水环境修复工程 (父分类: 61030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '61030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6103055', '环境修复工程 包括水环境修复工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境工程学其他学科 (父分类: 61030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '61030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6103099', '环境工程学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全哲学 (父分类: 62010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6201005', '安全哲学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全史 (父分类: 62010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6201007', '安全史', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全科学学 (父分类: 62010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6201009', '安全科学学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 灾害学 包括灾害物理、灾害化学、灾害毒理等 (父分类: 62010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6201030', '灾害学 包括灾害物理、灾害化学、灾害毒理等', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全学 代码原为62020 (父分类: 62010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6201035', '安全学 代码原为62020', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全科学技术基础学科其他学科 (父分类: 62010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6201099', '安全科学技术基础学科其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全社会学 (父分类: 62021)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62021';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202110', '安全社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全经济学 代码原为6202050 (父分类: 62021)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62021';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202120', '安全经济学 代码原为6202050', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全管理学 代码原为6202060 (父分类: 62021)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62021';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202130', '安全管理学 代码原为6202060', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全教育学 代码原为6202070 (父分类: 62021)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62021';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202140', '安全教育学 代码原为6202070', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全伦理学 (父分类: 62021)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62021';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202150', '安全伦理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全文化学 (父分类: 62021)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62021';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202160', '安全文化学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全社会科学其他学科 (父分类: 62021)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62021';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202199', '安全社会科学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全生理学 (父分类: 62025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202510', '安全生理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全心理学 代码原为6202020 (父分类: 62025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202520', '安全心理学 代码原为6202020', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全人机学 代码原为6202040 (父分类: 62025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202530', '安全人机学 代码原为6202040', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全人体学其他学科 (父分类: 62025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202599', '安全人体学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全运筹学 (父分类: 62027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202710', '安全运筹学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全信息论 (父分类: 62027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202720', '安全信息论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全控制论 (父分类: 62027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202730', '安全控制论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全模拟与安全仿真学 代码原为6202030 (父分类: 62027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202740', '安全模拟与安全仿真学 代码原为6202030', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全系统学其他学科 (父分类: 62027)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62027';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6202799', '安全系统学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全工程理论 (父分类: 62030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6203005', '安全工程理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 火灾科学与消防工程 原名为“消防工程” (父分类: 62030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6203010', '火灾科学与消防工程 原名为“消防工程”', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 爆炸安全工程 (父分类: 62030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6203020', '爆炸安全工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全设备工程 含安全特种设备工程 (父分类: 62030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6203030', '安全设备工程 含安全特种设备工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全机械工程 (父分类: 62030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6203035', '安全机械工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全电气工程 (父分类: 62030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6203040', '安全电气工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全人机工程 (父分类: 62030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6203060', '安全人机工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全系统工程 含安全运筹工程、安全控制工程、安全信息工程 (父分类: 62030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6203070', '安全系统工程 含安全运筹工程、安全控制工程、安全信息工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全工程技术科学其他学科 (父分类: 62030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6203099', '安全工程技术科学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 防尘工程技术 (父分类: 62040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6204010', '防尘工程技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 防毒工程技术 (父分类: 62040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6204020', '防毒工程技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 噪声与振动控制 (父分类: 62040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6204030', '噪声与振动控制', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 个体防护工程 (父分类: 62040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6204040', '个体防护工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全卫生工程技术其他学科 原名为“职业卫生工程其他学科” (父分类: 62040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6204099', '安全卫生工程技术其他学科 原名为“职业卫生工程其他学科”', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全管理工程 代码原为62050 (父分类: 62060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6206010', '安全管理工程 代码原为62050', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全经济工程 (父分类: 62060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6206020', '安全经济工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全教育工程 (父分类: 62060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6206030', '安全教育工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全社会工程其他学科 (父分类: 62060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6206099', '安全社会工程其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 公共安全信息工程 (父分类: 62080)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62080';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6208010', '公共安全信息工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 公共安全风险评估与规划 原名称及代码为“6205020风险评价与失效分 (父分类: 62080)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62080';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6208015', '公共安全风险评估与规划 原名称及代码为“6205020风险评价与失效分', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 公共安全检测检验 (父分类: 62080)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62080';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6208020', '公共安全检测检验', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 公共安全监测监控 (父分类: 62080)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62080';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6208025', '公共安全监测监控', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 公共安全预测预警 (父分类: 62080)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62080';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6208030', '公共安全预测预警', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 应急决策指挥 (父分类: 62080)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62080';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6208035', '应急决策指挥', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 应急救援 (父分类: 62080)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62080';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6208040', '应急救援', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 公共安全其他学科 (父分类: 62080)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '62080';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6208099', '公共安全其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 管理哲学 (父分类: 63015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6301510', '管理哲学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 组织理论 (父分类: 63015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6301520', '组织理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 行为科学 (父分类: 63015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6301530', '行为科学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 决策理论 (父分类: 63015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6301540', '决策理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 系统管理理论 (父分类: 63015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6301550', '系统管理理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 管理理论其他学科 (父分类: 63015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6301599', '管理理论其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 科学社会学 (父分类: 63035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6303510', '科学社会学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 科技政策学 (父分类: 63035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6303520', '科技政策学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 科学体系学 (父分类: 63035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6303525', '科学体系学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 科学心理学 (父分类: 63035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6303530', '科学心理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 科学计量学 (父分类: 63035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6303540', '科学计量学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 科技管理学 (父分类: 63035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6303550', '科技管理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 科学学与科技管理其他学科 (父分类: 63035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6303599', '科学学与科技管理其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生产管理 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304010', '生产管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 经营管理 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304015', '经营管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 财务管理 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304020', '财务管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 成本管理 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304025', '成本管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 劳动人事管理 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304030', '劳动人事管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 技术管理 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304035', '技术管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 营销管理 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304040', '营销管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 物资管理 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304045', '物资管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 设备管理 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304050', '设备管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 质量管理 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304055', '质量管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 企业管理其他学科 (父分类: 63040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304099', '企业管理其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 行政管理 代码原为63045 (父分类: 63044)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63044';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304410', '行政管理 代码原为63045', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 危机管理 也称“应急管理” (父分类: 63044)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63044';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304420', '危机管理 也称“应急管理”', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 公共管理其他学科 (父分类: 63044)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63044';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6304499', '公共管理其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生产系统管理 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305010', '生产系统管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 研究与开发管理 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305015', '研究与开发管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 质量控制与可靠性管理 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305020', '质量控制与可靠性管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 物流系统管理 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305025', '物流系统管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 战略管理 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305030', '战略管理', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 决策分析 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305035', '决策分析', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 决策支持系统 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305040', '决策支持系统', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 管理信息系统 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305045', '管理信息系统', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 管理系统仿真 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305050', '管理系统仿真', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 工效学 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305055', '工效学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 部门管理工程 各部门管理工程入有关学科 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305060', '部门管理工程 各部门管理工程入有关学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 管理工程其他学科 (父分类: 63050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305099', '管理工程其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人力资源开发战略 (父分类: 63055)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63055';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305510', '人力资源开发战略', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人才学 (父分类: 63055)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63055';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305520', '人才学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人力资源开发与管理其他学科 (父分类: 63055)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63055';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6305599', '人力资源开发与管理其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 理论预测学 (父分类: 63060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6306010', '理论预测学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 预测评价学 (父分类: 63060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6306020', '预测评价学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 技术评估学 (父分类: 63060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '63060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '6306030', '技术评估学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  RAISE NOTICE '三级学科分类（第 19 批）创建完成';
END $$;
