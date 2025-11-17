-- 初始化学科数据 - 第 16 批：第 3001-3034 个学科
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，将三级学科分类作为学科录入

SET search_path TO pikun_db, public;

DO $$
DECLARE
  category_id_var UUID;
  subject_id_var UUID;
BEGIN

  -- 家畜解剖学 家畜解剖学与组织学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2303010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2303010', '家畜解剖学 家畜解剖学与组织学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兽医药理学 兽医药理学与毒理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2303030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2303030', '兽医药理学 兽医药理学与毒理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 胃肠病学 消化病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202425';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202425', '胃肠病学 消化病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 内分泌学 内分泌病学与代谢病学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202440';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202440', '内分泌学 内分泌病学与代谢病学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 野战外科学 野战外科学和创伤外科学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3401010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3401010', '野战外科学 野战外科学和创伤外科学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 无机陶瓷材料 陶瓷材料
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4304540';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4304540', '无机陶瓷材料 陶瓷材料', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 工业机器人技术 机器人技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4605030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4605030', '工业机器人技术 机器人技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 电气测量技术及其仪器仪表  电磁测量技术及其仪器
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4704017';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4704017', '电气测量技术及其仪器仪表  电磁测量技术及其仪器', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 粒子加速器工艺 粒子加速器工程技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4903510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4903510', '粒子加速器工艺 粒子加速器工程技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 食品生物化学 食品化学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5501010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5501010', '食品生物化学 食品化学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 食品焙烤加工技术 烘焙食品加工技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5502045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5502045', '食品焙烤加工技术 烘焙食品加工技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 航海学 航海技术与装备工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5804010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5804010', '航海学 航海技术与装备工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 导航建筑物与航标工程  船舶通信与导航工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5804020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5804020', '导航建筑物与航标工程  船舶通信与导航工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 飞行器发射、飞行事故 飞行器发射与回收
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5905520';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5905520', '飞行器发射、飞行事故 飞行器发射与回收', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 消防工程 火灾科学与消防工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6203010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6203010', '消防工程 火灾科学与消防工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 防尘工程 防尘工程技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6204010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6204010', '防尘工程 防尘工程技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 防毒工程 防毒工程技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6204020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6204020', '防毒工程 防毒工程技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生产噪声与振动控制 噪声与振动控制
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6204030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6204030', '生产噪声与振动控制 噪声与振动控制', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 个体防护 个体防护工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6204040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6204040', '个体防护 个体防护工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全信息工程 公共安全信息工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6208010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6208010', '安全信息工程 公共安全信息工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 风险评价与失效分析 公共安全风险评估与规划
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6208015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6208015', '风险评价与失效分析 公共安全风险评估与规划', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 商业与物流技术经济学 物流技术经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7904140';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7904140', '商业与物流技术经济学 物流技术经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 住宅经济学 房地产经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7904740';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7904740', '住宅经济学 房地产经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 物资经济理论 物流经济理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7905310';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7905310', '物资经济理论 物流经济理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 物资经济学 物流管理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7905320';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7905320', '物资经济学 物流管理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 货币理论 货币经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7907310';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7907310', '货币理论 货币经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 货币学说史 货币思想史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7907315';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7907315', '货币学说史 货币思想史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 银行经营管理学 金融资产管理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7907325';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7907325', '银行经营管理学 金融资产管理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口学原理 人口理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407110', '人口学原理 人口理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口史 历史人口
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407130', '人口史 历史人口', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人口政策学 人口政策
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407165';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407165', '人口政策学 人口政策', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会福利与社会保障统计学 社会保障统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9104050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9104050', '社会福利与社会保障统计学 社会保障统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 自然资源统计学 资源统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9105010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9105010', '自然资源统计学 资源统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生态平衡统计学 生态统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9105030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9105030', '生态平衡统计学 生态统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  RAISE NOTICE '学科数据（第 16 批）创建完成';
END $$;
