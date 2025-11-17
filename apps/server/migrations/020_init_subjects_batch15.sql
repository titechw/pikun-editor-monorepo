-- 初始化学科数据 - 第 15 批：第 2801-3000 个学科
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，将三级学科分类作为学科录入

SET search_path TO pikun_db, public;

DO $$
DECLARE
  category_id_var UUID;
  subject_id_var UUID;
BEGIN

  -- 兽医病原学  4133030 海洋信息技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2303006';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2303006', '兽医病原学  4133030 海洋信息技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兽医流行学  4161010 同步辐射及实验技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2303007';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2303007', '兽医流行学  4161010 同步辐射及实验技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 动物分子病原学  4163030 海岸工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2303016';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2303016', '动物分子病原学  4163030 海岸工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 水产遗传育种学  4163035 近海工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2401033';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2401033', '水产遗传育种学  4163035 近海工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 水产动物医学  4163040 深海工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2401036';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2401036', '水产动物医学  4163040 深海工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 分子病理学  4163045 海洋资源开发利用技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3104485';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3104485', '分子病理学  4163045 海洋资源开发利用技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 小儿外科学  4163050 海洋观测预报技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3202770';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3202770', '小儿外科学  4163050 海洋观测预报技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 小儿内科学  4163055 海洋环境保护技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3203410';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3203410', '小儿内科学  4163055 海洋环境保护技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卫生监督学  4164025 代谢工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3308110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3308110', '卫生监督学  4164025 代谢工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卫生政策学  4164045 生物传感技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3308120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3308120', '卫生政策学  4164045 生物传感技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卫生信息管理学  4164050 纳米生物分析技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3308130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3308130', '卫生信息管理学  4164050 纳米生物分析技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 高压氧医学  4166060 干细胞与组织工程学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3402050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3402050', '高压氧医学  4166060 干细胞与组织工程学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 藏医药学  4166070 医学成像技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3602010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3602010', '藏医药学  4166070 医学成像技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 蒙医药学  4301035 计算材料学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3602020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3602020', '蒙医药学  4301035 计算材料学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 维吾尔医药学  4305540 有机-无机杂化复合材料
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3602030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3602030', '维吾尔医药学  4305540 有机-无机杂化复合材料', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 民族草药学  4305550 生物复合材料
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3602040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3602040', '民族草药学  4305550 生物复合材料', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合基础医学  4305560 功能复合材料
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603010', '中西医结合基础医学  4305560 功能复合材料', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合医学导论  4306010 组织工程材料
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603020', '中西医结合医学导论  4306010 组织工程材料', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合预防医学  4306020 医学工程材料
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603030', '中西医结合预防医学  4306020 医学工程材料', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合临床医学  4306030 环境友好材料
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603040', '中西医结合临床医学  4306030 环境友好材料', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合护理学  4701050 微尺度热物理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603050', '中西医结合护理学  4701050 微尺度热物理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合康复医学  4703510 制冷工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603060', '中西医结合康复医学  4703510 制冷工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中西医结合养生保健医学  4703520 低温工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3603070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3603070', '中西医结合养生保健医学  4703520 低温工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 标准原理与方法  4703530 热泵与空调
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4105010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4105010', '标准原理与方法  4703530 热泵与空调', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 标准基础学  4704025 电源技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4105020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4105020', '标准基础学  4704025 电源技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 标准工程与应用  4704067 脉冲功率技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4105050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4105050', '标准工程与应用  4704067 脉冲功率技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 指挥与控制系统工程  4704071 放电理论与发电等离子体技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131015', '指挥与控制系统工程  4704071 放电理论与发电等离子体技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 导航制导与控制  4704073 电磁环境与电磁兼容
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131025', '导航制导与控制  4704073 电磁环境与电磁兼容', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真科学技术基础学科  4704075 生物与医学电工技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131510', '仿真科学技术基础学科  4704075 生物与医学电工技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真建模理论与技术  4704077 可再生能源发电技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131520';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131520', '仿真建模理论与技术  4704077 可再生能源发电技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真系统理论与技术  4704079 分布式电力技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131530';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131530', '仿真系统理论与技术  4704079 分布式电力技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真应用  4704081 电气化交通技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131540';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131540', '仿真应用  4704081 电气化交通技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仿真科学技术其它学科  4704083 强磁场技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4131599';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4131599', '仿真科学技术其它学科  4704083 强磁场技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全协议  4806075 生活固体废弃物能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132015', '安全协议  4806075 生活固体废弃物能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 系统安全  4806085 天然气水合物能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132020', '系统安全  4806085 天然气水合物能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 网络安全  4807045 氢能
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132025', '网络安全  4807045 氢能', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 软件安全  5352010 兵器科学与技术基础学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132030', '软件安全  5352010 兵器科学与技术基础学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 信息隐藏  5352015 兵器系统与运用工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132035', '信息隐藏  5352015 兵器系统与运用工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全测评  5352020 兵器结构、动力、传动与平台技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132040', '安全测评  5352020 兵器结构、动力、传动与平台技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 信息安全工程  5352025 弹道学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4132045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4132045', '信息安全工程  5352025 弹道学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军用光学与光电子技术  6208035 应急决策指挥
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352035', '军用光学与光电子技术  6208035 应急决策指挥', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 军事信息工程与信息对抗技术  6208040 应急救援
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352040', '军事信息工程与信息对抗技术  6208040 应急救援', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 含能材料技术  6303525 科学体系学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352045', '含能材料技术  6303525 科学体系学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兵器制造技术  6304420 危机管理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352050', '兵器制造技术  6304420 危机管理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兵器材料科学与工程  7204570 环境伦理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352055', '兵器材料科学与工程  7204570 环境伦理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 兵器测试与实验技术  7302460 佛教宗派学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5352060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5352060', '兵器测试与实验技术  7302460 佛教宗派学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 食品微生物学  7403570 术语学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5501035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5501035', '食品微生物学  7403570 术语学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 食品生物技术  7405018 丹麦语、挪威语、冰岛语
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5501040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5501040', '食品生物技术  7405018 丹麦语、挪威语、冰岛语', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 谷物化学  7405020 拉丁语
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5501045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5501045', '谷物化学  7405020 拉丁语', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 油脂化学  7405052 芬兰语
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5501050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5501050', '油脂化学  7405052 芬兰语', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 米面制品加工技术  7405053 爱沙尼亚语、拉脱维亚语、立陶宛语
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5502070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5502070', '米面制品加工技术  7405053 爱沙尼亚语、拉脱维亚语、立陶宛语', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 植物蛋白加工技术  7405092 朝鲜语和韩国语
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5502075';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5502075', '植物蛋白加工技术  7405092 朝鲜语和韩国语', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 食品工程  7701010 中国史学史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5507010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5507010', '食品工程  7701010 中国史学史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 粮油工程  7701020 外国史学史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5507020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5507020', '粮油工程  7701020 外国史学史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 救助、打捞与潜水作业工程  7701510 马克思主义史学理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5804070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5804070', '救助、打捞与潜水作业工程  7701510 马克思主义史学理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海事技术与装备工程  7701520 中国传统史学理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5804080';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5804080', '海事技术与装备工程  7701520 中国传统史学理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 航天摩擦学  7701530 外国史学理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5901035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5901035', '航天摩擦学  7701530 外国史学理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 航空、航天材料失效与保护  7703532 晚清政治史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5904050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5904050', '航空、航天材料失效与保护  7703532 晚清政治史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 飞行事故  7703547 抗日战争史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5905530';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5905530', '飞行事故  7703547 抗日战争史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 航空地面设施  7703575 近代经济史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5906030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5906030', '航空地面设施  7703575 近代经济史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 航空地面技术保障  7703580 近代思想文化史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5906040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5906040', '航空地面技术保障  7703580 近代思想文化史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 城市环境学  7703585 近代社会史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6102050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6102050', '城市环境学  7703585 近代社会史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 环境修复工程  7704525 东北亚史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6103055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6103055', '环境修复工程  7704525 东北亚史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全哲学  7707042 中外关系史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6201005';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6201005', '安全哲学  7707042 中外关系史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全史  7709910 简帛学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6201007';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6201007', '安全史  7709910 简帛学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全科学学  7806045 古陶瓷学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6201009';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6201009', '安全科学学  7806045 古陶瓷学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全社会学  7901310 西方宏观经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202110', '安全社会学  7901310 西方宏观经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全伦理学  7901320 社会主义宏观经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202150';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202150', '安全伦理学  7901320 社会主义宏观经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全文化学  7901510 西方微观经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202160';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202160', '安全文化学  7901510 西方微观经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全生理学  7901520 社会主义微观经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202510', '安全生理学  7901520 社会主义微观经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全运筹学  7902952 中东欧经济
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202710';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202710', '安全运筹学  7902952 中东欧经济', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全信息论  7904105 技术经济理论与方法
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202720';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202720', '安全信息论  7904105 技术经济理论与方法', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全控制论  7904141 贸易技术经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202730';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202730', '安全控制论  7904141 贸易技术经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全工程理论  7904170 服务业技术经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6203005';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6203005', '安全工程理论  7904170 服务业技术经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全机械工程  7904525 健康经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6203035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6203035', '安全机械工程  7904525 健康经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全人机工程  7907313 货币史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6203060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6203060', '安全人机工程  7907313 货币史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全系统工程  7907322 金融风险管理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6203070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6203070', '安全系统工程  7907322 金融风险管理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全经济工程  7907343 公司金融学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6206020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6206020', '安全经济工程  7907343 公司金融学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全教育工程  7907344 房地产金融学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6206030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6206030', '安全教育工程  7907344 房地产金融学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 公共安全信息工程  7907346 开发性金融学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6208010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6208010', '公共安全信息工程  7907346 开发性金融学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 公共安全预测预警  7907353 金融发展学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6208030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6208030', '公共安全预测预警  7907353 金融发展学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 金融工程学  8602040 传播技术史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7907356';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7907356', '金融工程学  8602040 传播技术史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 金融制度学  8604010 传媒经济
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7907359';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7907359', '金融制度学  8604010 传媒经济', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 保险史  8604020 传媒管理
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7907505';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7907505', '保险史  8604020 传媒管理', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 政治学方法论  8606050 传播与社会发展
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8101060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8101060', '政治学方法论  8606050 传播与社会发展', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中东欧政治  8606051 人际传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8104052';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8104052', '中东欧政治  8606051 人际传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卫生法学  8606053 国际传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8203072';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8203072', '卫生法学  8606053 国际传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 宗教法学  8606055 跨文化传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8203088';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8203088', '宗教法学  8606055 跨文化传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会保险学  8606057 网络传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407440';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407440', '社会保险学  8606057 网络传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 职业安全卫生科学技术  8606069 新媒介传播
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8407445';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8407445', '职业安全卫生科学技术  8606069 新媒介传播', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文化地理学  9103025 经济统计分析
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8507010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8507010', '文化地理学  9103025 经济统计分析', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 文化心理学  9106010 生物统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8507020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8507020', '文化心理学  9106010 生物统计学', NULL, 0, true
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

  -- 插值法与逼近论  8405110 社会心理学史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106110', '插值法与逼近论  8405110 社会心理学史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 连续问题离散化方法  8405120 社会心理学理论与研究方法
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106160';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106160', '连续问题离散化方法  8405120 社会心理学理论与研究方法', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 等离子体天体物理学  8405130 实验社会心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1602030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1602030', '等离子体天体物理学  8405130 实验社会心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 普通心理学  9101510 统计调查分析理沦
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807425';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807425', '普通心理学  9101510 统计调查分析理沦', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 个性心理学  9101530 统计监督理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807435';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807435', '个性心理学  9101530 统计监督理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 缺陷心理学  9101540 统计预测理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807440';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807440', '缺陷心理学  9101540 统计预测理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 灾害物理学  9101550 统计逻缉学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6201010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6201010', '灾害物理学  9101550 统计逻缉学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 灾害化学  9103010 宏观经济统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6201020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6201020', '灾害化学  9103010 宏观经济统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 灾害毒理学  9103020 微观经济统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6201040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6201040', '灾害毒理学  9103020 微观经济统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全信息工程  9105510 国际标准分类统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6205010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6205010', '安全信息工程  9105510 国际标准分类统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 工业灾害控制  9105520 国际核算体系与方法论体系
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6208030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6208030', '工业灾害控制  9105520 国际核算体系与方法论体系', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 资本主义财政学  9105530 国际比较统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7907120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7907120', '资本主义财政学  9105530 国际比较统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 社会主义财政学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7907130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7907130', '社会主义财政学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 天文地球动力学 16070 天文地球动力学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1603010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1603010', '天文地球动力学 16070 天文地球动力学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物力学 13041 生物力学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1801415';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1801415', '生物力学 13041 生物力学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 心理学史 19010 心理学史
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807410';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807410', '心理学史 19010 心理学史', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生理心理学 19050 生理心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807420';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807420', '生理心理学 19050 生理心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 认知心理学 19015 认知心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807425';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807425', '认知心理学 19015 认知心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 发展心理学 19030 发展心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807430';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807430', '发展心理学 19030 发展心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 实验心理学 19025 实验心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807450';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807450', '实验心理学 19025 实验心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 应用心理学 19065 应用心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807455';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807455', '应用心理学 19065 应用心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农产品贮藏与加工 21045 农产品贮藏与加工
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2103055';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2103055', '农产品贮藏与加工 21045 农产品贮藏与加工', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 制冷与低温工程 47035 制冷与低温工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4702020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4702020', '制冷与低温工程 47035 制冷与低温工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全系统学 62027 安全系统学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202010', '安全系统学 62027 安全系统学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 部门安全工程 62070 部门安全工程理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6203050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6203050', '部门安全工程 62070 部门安全工程理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 卫生统计学 33072 卫生统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9104030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9104030', '卫生统计学 33072 卫生统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 量子声学 1402035 超声学、量子声学和声学效应 1402040 超声学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402030', '量子声学 1402035 超声学、量子声学和声学效应 1402040 超声学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 基因工程 4164010 基因工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807110', '基因工程 4164010 基因工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 细胞工程 4164015 细胞工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807120', '细胞工程 4164015 细胞工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 蛋白质工程 4164020 蛋白质工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807130', '蛋白质工程 4164020 蛋白质工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 酶工程 4164030 酶工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807140';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807140', '酶工程 4164030 酶工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 发酵工程 4164040 发酵工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807150';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807150', '发酵工程 4164040 发酵工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 比较心理学 1905020 比较心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1807445';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1807445', '比较心理学 1905020 比较心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 作物育种学与良种繁育学 2103033 作物育种学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2103035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2103035', '作物育种学与良种繁育学 2103033 作物育种学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 良种繁育学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2103036';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2103036', '良种繁育学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 果蔬贮藏与加工 2104530 果蔬贮藏与加工
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2104040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2104040', '果蔬贮藏与加工 2104530 果蔬贮藏与加工', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农业机械学 4165010 农业机械学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2107010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2107010', '农业机械学 4165010 农业机械学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农业机械化 4165015 农业机械化
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2107015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2107015', '农业机械化 4165015 农业机械化', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农业电气化与自动化 4165020 农业电气化与自动化
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2107020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2107020', '农业电气化与自动化 4165020 农业电气化与自动化', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农田水利 4165025 农田水利
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2107025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2107025', '农田水利 4165025 农田水利', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 水土保持学 4165030 水土保持学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2107030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2107030', '水土保持学 4165030 水土保持学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农田测量 4165035 农田测量
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2107035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2107035', '农田测量 4165035 农田测量', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农业环保工程 4165040 农业环保工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2107040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2107040', '农业环保工程 4165040 农业环保工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农业区划 4165045 农业区划
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2107045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2107045', '农业区划 4165045 农业区划', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 农业系统工程 4165050 农业系统工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2107050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2107050', '农业系统工程 4165050 农业系统工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物医学电子学 4165010 生物医学电子学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3106110';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3106110', '生物医学电子学 4165010 生物医学电子学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 临床工程学 4165020 临床工程学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3106120';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3106120', '临床工程学 4165020 临床工程学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 康复工程学 4165030 康复工程学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3106130';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3106130', '康复工程学 4165030 康复工程学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 生物医学测量学 4165040 生物医学测量学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3106140';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3106140', '生物医学测量学 4165040 生物医学测量学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 人工器官与生物医学材料学 4165050 人工器官与生物医学材料学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '3106150';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_3106150', '人工器官与生物医学材料学 4165050 人工器官与生物医学材料学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 地理信息系统 4133010 地理信息系统
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4203040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4203040', '地理信息系统 4133010 地理信息系统', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仪器仪表基础理论 5351010 仪器仪表基础理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4604010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4604010', '仪器仪表基础理论 5351010 仪器仪表基础理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 仪器仪表材料 5351015 仪器仪表材料
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4604015';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4604015', '仪器仪表材料 5351015 仪器仪表材料', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 传感器技术 5351020 传感器技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4604020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4604020', '传感器技术 5351020 传感器技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 精密仪器制造 5351025 精密仪器制造
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4604025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4604025', '精密仪器制造 5351025 精密仪器制造', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 测试计量仪器 5351030 测试计量仪器
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4604030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4604030', '测试计量仪器 5351030 测试计量仪器', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 光学技术与仪器 5351035 光学技术与仪器
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4604035';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4604035', '光学技术与仪器 5351035 光学技术与仪器', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 天文仪器 5351040 天文仪器
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4604040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4604040', '天文仪器 5351040 天文仪器', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 地球科学仪器 5351045 地球科学仪器
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4604045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4604045', '地球科学仪器 5351045 地球科学仪器', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 大气仪器仪表 5351050 大气仪器仪表
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4604050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4604050', '大气仪器仪表 5351050 大气仪器仪表', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 印刷、复制技术 5353010 印刷、复制技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '4605510';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_4605510', '印刷、复制技术 5353010 印刷、复制技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 自动控制理论 4131010 自动控制应用理论
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5108010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5108010', '自动控制理论 4131010 自动控制应用理论', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 控制系统仿真技术 4131020 控制系统仿真技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5108020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5108020', '控制系统仿真技术 4131020 控制系统仿真技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机电一体化技术 4131030 机电一体化技术
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5108030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5108030', '机电一体化技术 4131030 机电一体化技术', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 自动化仪器仪表与装置 4131040 自动化仪器仪表与装置
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5108040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5108040', '自动化仪器仪表与装置 4131040 自动化仪器仪表与装置', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 机器人控制 4131050 机器人控制
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5108050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5108050', '机器人控制 4131050 机器人控制', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 自动化技术应用 4131060 自动化技术应用
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5108060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5108060', '自动化技术应用 4131060 自动化技术应用', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋工程结构与施工 4163010 海洋工程结构与施工
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5705010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5705010', '海洋工程结构与施工 4163010 海洋工程结构与施工', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海底矿产开发 4163015 海底矿产开发
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5705020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5705020', '海底矿产开发 4163015 海底矿产开发', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海水资源利用 4163020 海水资源利用
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5705030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5705030', '海水资源利用 4163020 海水资源利用', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 海洋环境工程 4163025 海洋环境工程
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '5705040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_5705040', '海洋环境工程 4163025 海洋环境工程', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全心理学 6202520 安全心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202020', '安全心理学 6202520 安全心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全模拟与安全仿真学 6202740 安全模拟与安全仿真学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202030';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202030', '安全模拟与安全仿真学 6202740 安全模拟与安全仿真学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全人机学 6202530 安全人机学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202040', '安全人机学 6202530 安全人机学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全经济学 6202120 安全经济学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202050', '安全经济学 6202120 安全经济学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全管理学 6202130 安全管理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202060';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202060', '安全管理学 6202130 安全管理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全教育学 6202140 安全教育学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6202070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6202070', '安全教育学 6202140 安全教育学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 风险评价与失效分析 6208015 公共安全风险评估与规划
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6205020';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6205020', '风险评价与失效分析 6208015 公共安全风险评估与规划', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 安全检测与监控技术 6208020 公共安全检测检验
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6205040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6205040', '安全检测与监控技术 6208020 公共安全检测检验', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 公共安全监测监控
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '6208025';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_6208025', '公共安全监测监控', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中亚、西亚经济 7902966 中亚经济
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7902967';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7902967', '中亚、西亚经济 7902966 中亚经济', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 西亚经济
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7902968';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7902968', '西亚经济', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 劳动管理学 8407420 劳动管理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7904520';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7904520', '劳动管理学 8407420 劳动管理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 劳动统计学 8407425 劳动统计学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7904530';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7904530', '劳动统计学 8407425 劳动统计学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 劳动社会学 8407430 劳动社会学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7904540';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7904540', '劳动社会学 8407430 劳动社会学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 劳动心理学 8407435 劳动心理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '7904550';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_7904550', '劳动心理学 8407435 劳动心理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 中亚、西亚政治 8104068 中亚政治
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8104067';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8104067', '中亚、西亚政治 8104068 中亚政治', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 西亚政治
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8104069';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8104069', '西亚政治', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 密码学 4132010 密码学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '8304050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_8304050', '密码学 4132010 密码学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 统计核算理论 9103015 国民经济核算
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '9101520';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_9101520', '统计核算理论 9103015 国民经济核算', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 积分方程数值解 积分变换与积分方程数值方法
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106140';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106140', '积分方程数值解 积分变换与积分方程数值方法', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 随机数值实验 随机数值方法与统计计算
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106170';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106170', '随机数值实验 随机数值方法与统计计算', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 误差分析 误差分析与区间算法
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1106180';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1106180', '误差分析 误差分析与区间算法', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 物理声学 普通线性声学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402010', '物理声学 普通线性声学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 水声学 水声和海洋声学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402050';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402050', '水声学 水声和海洋声学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 声学其他学科 与声学有关的其它物理问题和交叉学科
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1402099';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1402099', '声学其他学科 与声学有关的其它物理问题和交叉学科', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 液晶物理学 软物质物理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1405040';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1405040', '液晶物理学 软物质物理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 等离子体光谱学 等离子体诊断学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1405530';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1405530', '等离子体光谱学 等离子体诊断学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 基本粒子物理学 粒子物理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1407010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1407010', '基本粒子物理学 粒子物理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 热谱分析 热化学分析
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1502535';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1502535', '热谱分析 热化学分析', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 云与降水物理学 大气边界层物理学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1701540';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1701540', '云与降水物理学 大气边界层物理学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 河口、海岸学 海洋地理学和河口海岸学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1706045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1706045', '河口、海岸学 海洋地理学和河口海岸学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 分子生物物理学 分子生物物理学与结构生物学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1801450';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1801450', '分子生物物理学 分子生物物理学与结构生物学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 植物胚胎学 植物生殖生物学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '1805145';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_1805145', '植物胚胎学 植物生殖生物学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 植物病虫害测报学 有害生物监测预警
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2106045';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2106045', '植物病虫害测报学 有害生物监测预警', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 杂草防治 杂草防除
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2106070';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2106070', '杂草防治 杂草防除', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  -- 家畜育种学 家畜遗传育种学
  SELECT category_id INTO category_id_var 
  FROM pikun_db.subject_categories 
  WHERE code = '2302010';
  
  IF category_id_var IS NOT NULL THEN
    INSERT INTO pikun_db.subjects (
      subject_id, category_id, code, name, short_name, sort_order, is_published
    ) VALUES (
      uuid_generate_v4(), category_id_var, 'subject_2302010', '家畜育种学 家畜遗传育种学', NULL, 0, true
    )
    ON CONFLICT (code) DO UPDATE SET
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP;
  END IF;

  RAISE NOTICE '学科数据（第 15 批）创建完成';
END $$;
