-- 初始化学科分类 - 三级学科分类（第 14 批：第 1301-1400 个）
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，创建三级学科分类

SET search_path TO pikun_db, public;

DO $$
DECLARE
  parent_category_id UUID;
  category_id_var UUID;
  parent_code_var VARCHAR(50);
BEGIN

  -- 粉末冶金 (父分类: 45030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503015', '粉末冶金', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 真空冶金 (父分类: 45030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503020', '真空冶金', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电磁冶金 (父分类: 45030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503025', '电磁冶金', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 原子能冶金 (父分类: 45030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503030', '原子能冶金', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 湿法冶金 (父分类: 45030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503035', '湿法冶金', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 纤维冶金 (父分类: 45030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503040', '纤维冶金', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卤素冶金 (父分类: 45030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503045', '卤素冶金', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微生物冶金 (父分类: 45030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503050', '微生物冶金', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 冶金技术其他学科 (父分类: 45030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503099', '冶金技术其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 炼铁 (父分类: 45035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503510', '炼铁', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 炼钢 (父分类: 45035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503520', '炼钢', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 铁合金冶炼 (父分类: 45035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503530', '铁合金冶炼', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 钢铁冶金其他学科 (父分类: 45035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '45035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4503599', '钢铁冶金其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械原理与机构学 (父分类: 46015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4601510', '机械原理与机构学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械动力学与振动 (父分类: 46015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4601520', '机械动力学与振动', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械强度 (父分类: 46015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4601530', '机械强度', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械摩擦、磨损及润滑 (父分类: 46015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4601540', '机械摩擦、磨损及润滑', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械学其他学科 (父分类: 46015)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46015';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4601599', '机械学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械设计原理与方法 (父分类: 46020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602010', '机械设计原理与方法', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械零件及传动 (父分类: 46020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602020', '机械零件及传动', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械公差、配合与技术测量 (父分类: 46020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602030', '机械公差、配合与技术测量', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械制图 (父分类: 46020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602040', '机械制图', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械设计其他学科 (父分类: 46020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602099', '机械设计其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 铸造工艺与设备 (父分类: 46025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602510', '铸造工艺与设备', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 焊接工艺与设备 包括连接工艺与设备 (父分类: 46025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602515', '焊接工艺与设备 包括连接工艺与设备', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 塑性加工工艺与设备 (父分类: 46025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602520', '塑性加工工艺与设备', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 热处理工艺与设备 (父分类: 46025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602525', '热处理工艺与设备', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 切削加工工艺 (父分类: 46025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602530', '切削加工工艺', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 特种加工工艺 (父分类: 46025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602535', '特种加工工艺', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机器装配工艺 (父分类: 46025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602540', '机器装配工艺', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 非金属加工工艺 (父分类: 46025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602545', '非金属加工工艺', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械制造工艺与设备其他学科 (父分类: 46025)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46025';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4602599', '机械制造工艺与设备其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 切削理论 (父分类: 46030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4603010', '切削理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 切削刀具 (父分类: 46030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4603020', '切削刀具', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 磨削工具 (父分类: 46030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4603030', '磨削工具', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 刀具技术其他学科 (父分类: 46030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4603099', '刀具技术其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机床基础理论 (父分类: 46035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4603510', '机床基础理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 金属切削机床 (父分类: 46035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4603520', '金属切削机床', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 数字控制机床 (父分类: 46035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4603530', '数字控制机床', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 特种加工机床 (父分类: 46035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4603540', '特种加工机床', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机床技术其他学科 (父分类: 46035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4603599', '机床技术其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 成组技术 (父分类: 46050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4605010', '成组技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 数控技术 (父分类: 46050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4605020', '数控技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机器人技术 包括工业机器人、智能机器人、服务机器人 (父分类: 46050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4605030', '机器人技术 包括工业机器人、智能机器人、服务机器人', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 计算机辅助制造 (父分类: 46050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4605040', '计算机辅助制造', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机械制造自动化其他学科 (父分类: 46050)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '46050';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4605099', '机械制造自动化其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 工程热力学 (父分类: 47010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4701010', '工程热力学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 工程传热、传质学 (父分类: 47010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4701020', '工程传热、传质学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 燃烧学 (父分类: 47010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4701030', '燃烧学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 多相流动 (父分类: 47010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4701040', '多相流动', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微尺度热物理学 (父分类: 47010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4701050', '微尺度热物理学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 工程热物理其他学科 (父分类: 47010)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47010';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4701099', '工程热物理其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 热工测量与仪器仪表 (父分类: 47020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4702010', '热工测量与仪器仪表', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 供热工程 (父分类: 47020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4702030', '供热工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 工业锅炉 (父分类: 47020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4702040', '工业锅炉', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 热工学其他学科 (父分类: 47020)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47020';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4702099', '热工学其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 蒸汽工程 包括锅炉、蒸汽机、汽轮机等 (父分类: 47030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4703010', '蒸汽工程 包括锅炉、蒸汽机、汽轮机等', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 内燃机工程 包括汽油机、柴油机、气体燃料发动机等 (父分类: 47030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4703020', '内燃机工程 包括汽油机、柴油机、气体燃料发动机等', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 流体机械及流体动力工程 (父分类: 47030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4703030', '流体机械及流体动力工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 喷气推进机与涡轮机械 (父分类: 47030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4703040', '喷气推进机与涡轮机械', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 微动力工程 (父分类: 47030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4703050', '微动力工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动力机械工程其他学科 (父分类: 47030)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47030';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4703099', '动力机械工程其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 制冷工程 (父分类: 47035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4703510', '制冷工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 低温工程 (父分类: 47035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4703520', '低温工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 热泵与空调 (父分类: 47035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4703530', '热泵与空调', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 制冷与低温工程其他学科 (父分类: 47035)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47035';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4703599', '制冷与低温工程其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电工学 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704011', '电工学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电路理论 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704014', '电路理论', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电磁测量技术及其仪器 原名为“电气测量技术及其仪器仪表” (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704017', '电磁测量技术及其仪器 原名为“电气测量技术及其仪器仪表”', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电工材料 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704021', '电工材料', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电机学 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704024', '电机学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电源技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704025', '电源技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电器学 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704027', '电器学', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电力电子技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704031', '电力电子技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 高电压工程 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704034', '高电压工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 绝缘技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704037', '绝缘技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电热与高频技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704041', '电热与高频技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 超导电工技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704044', '超导电工技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 发电工程 包括水力、热力、风力、磁流体发电工程等 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704047', '发电工程 包括水力、热力、风力、磁流体发电工程等', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 输配电工程 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704051', '输配电工程', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电力系统及其自动化 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704054', '电力系统及其自动化', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电力拖动及其自动化 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704057', '电力拖动及其自动化', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 用电技术 包括节电技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704061', '用电技术 包括节电技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电加工技术 亦可称作微细加工技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704064', '电加工技术 亦可称作微细加工技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 脉冲功率技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704067', '脉冲功率技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 放电理论与发电等离子体技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704071', '放电理论与发电等离子体技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电磁环境与电磁兼容 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704073', '电磁环境与电磁兼容', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物与医学电工技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704075', '生物与医学电工技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 可再生能源发电技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704077', '可再生能源发电技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 分布式电力技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704079', '分布式电力技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电气化交通技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704081', '电气化交通技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 强磁场技术 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704083', '强磁场技术', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电气工程其他学科 (父分类: 47040)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '47040';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4704099', '电气工程其他学科', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 煤炭能 (父分类: 48060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '48060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4806010', '煤炭能', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 石油、天然气能 (父分类: 48060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '48060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4806020', '石油、天然气能', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 水能 包括海洋能等 (父分类: 48060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '48060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4806030', '水能 包括海洋能等', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 风能 (父分类: 48060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '48060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4806040', '风能', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 地热能 (父分类: 48060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '48060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4806050', '地热能', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物能 (父分类: 48060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '48060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4806060', '生物能', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 太阳能 (父分类: 48060)
  SELECT category_id INTO parent_category_id 
  FROM pikun_db.subject_categories 
  WHERE code = '48060';
  
  IF parent_category_id IS NOT NULL THEN
    INSERT INTO pikun_db.subject_categories (
      category_id, parent_id, code, name, description, sort_order
    ) VALUES (
      uuid_generate_v4(), parent_category_id, '4806070', '太阳能', NULL, 0
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  RAISE NOTICE '三级学科分类（第 14 批）创建完成';
END $$;
