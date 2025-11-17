-- 初始化学科分类 - 一级学科分类（第 4 批：第 91-120 个）
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，创建一级学科分类

SET search_path TO pikun_db, public;

DO $$
DECLARE
  category_id_var UUID;
BEGIN

  -- 能源科学技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '480', '能源科学技术', NULL, 91
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 核科学技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '490', '核科学技术', NULL, 92
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 电子与通信技术 原名为“电子、通信与自动控制技术”
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '510', '电子与通信技术 原名为“电子、通信与自动控制技术”', NULL, 93
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 计算机科学技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '520', '计算机科学技术', NULL, 94
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 化学工程
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '530', '化学工程', NULL, 95
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 产品应用相关工程与技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '535', '产品应用相关工程与技术', NULL, 96
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 纺织科学技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '540', '纺织科学技术', NULL, 97
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 食品科学技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '550', '食品科学技术', NULL, 98
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 土木建筑工程
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '560', '土木建筑工程', NULL, 99
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 水利工程
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '570', '水利工程', NULL, 100
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 交通运输工程
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '580', '交通运输工程', NULL, 101
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 航空、航天科学技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '590', '航空、航天科学技术', NULL, 102
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 环境科学技术及资源科学技术 原名为“环境科学技术”
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '610', '环境科学技术及资源科学技术 原名为“环境科学技术”', NULL, 103
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 安全科学技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '620', '安全科学技术', NULL, 104
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 管理学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '630', '管理学', NULL, 105
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 马克思主义
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '710', '马克思主义', NULL, 106
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 哲学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '720', '哲学', NULL, 107
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 宗教学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '730', '宗教学', NULL, 108
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 语言学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '740', '语言学', NULL, 109
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 文学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '750', '文学', NULL, 110
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 艺术学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '760', '艺术学', NULL, 111
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 历史学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '770', '历史学', NULL, 112
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 考古学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '780', '考古学', NULL, 113
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 经济学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '790', '经济学', NULL, 114
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 政治学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '810', '政治学', NULL, 115
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 法学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '820', '法学', NULL, 116
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 军事学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '830', '军事学', NULL, 117
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 社会学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '840', '社会学', NULL, 118
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 民族学与文化学 原名为“民族学”
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '850', '民族学与文化学 原名为“民族学”', NULL, 119
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 新闻学与传播学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '860', '新闻学与传播学', NULL, 120
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  RAISE NOTICE '一级学科分类（第 4 批）创建完成';
END $$;
