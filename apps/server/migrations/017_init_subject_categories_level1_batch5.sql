-- 初始化学科分类 - 一级学科分类（第 5 批：第 121-130 个）
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，创建一级学科分类

SET search_path TO pikun_db, public;

DO $$
DECLARE
  category_id_var UUID;
BEGIN

  -- 图书馆、情报与文献学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '870', '图书馆、情报与文献学', NULL, 121
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 教育学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '880', '教育学', NULL, 122
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 体育科学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '890', '体育科学', NULL, 123
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 统计学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '910', '统计学', NULL, 124
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 信息与系统科学相关工程与技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '413', '信息与系统科学相关工程与技术', NULL, 125
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 自然科学相关工程与技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '416', '自然科学相关工程与技术', NULL, 126
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 产品应用相关工程与技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '535', '产品应用相关工程与技术', NULL, 127
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 电子、通信与自动控制技术 电子与通信技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '510', '电子、通信与自动控制技术 电子与通信技术', NULL, 128
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 环境科学技术 环境科学技术及资源科学技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '610', '环境科学技术 环境科学技术及资源科学技术', NULL, 129
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 民族学 民族学与文化学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '850', '民族学 民族学与文化学', NULL, 130
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  RAISE NOTICE '一级学科分类（第 5 批）创建完成';
END $$;
