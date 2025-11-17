-- 初始化学科分类 - 一级学科分类（第 3 批：第 61-90 个）
-- 创建时间: 2024
-- 说明：根据 GB/T 13745 标准，创建一级学科分类

SET search_path TO pikun_db, public;

DO $$
DECLARE
  category_id_var UUID;
BEGIN

  -- 体育科学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '890', '体育科学', NULL, 61
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 统计学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '910', '统计学', NULL, 62
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 数学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '110', '数学', NULL, 63
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 信息科学与系统科学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '120', '信息科学与系统科学', NULL, 64
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 力学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '130', '力学', NULL, 65
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 物理学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '140', '物理学', NULL, 66
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 化学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '150', '化学', NULL, 67
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 天文学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '160', '天文学', NULL, 68
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 地球科学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '170', '地球科学', NULL, 69
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 生物学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '180', '生物学', NULL, 70
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 心理学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '190', '心理学', NULL, 71
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 农学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '210', '农学', NULL, 72
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 林学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '220', '林学', NULL, 73
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 畜牧、兽医科学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '230', '畜牧、兽医科学', NULL, 74
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 水产学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '240', '水产学', NULL, 75
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 基础医学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '310', '基础医学', NULL, 76
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 临床医学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '320', '临床医学', NULL, 77
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 预防医学与公共卫生学 原名为“预防医学与卫生学”
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '330', '预防医学与公共卫生学 原名为“预防医学与卫生学”', NULL, 78
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 军事医学与特种医学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '340', '军事医学与特种医学', NULL, 79
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 药学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '350', '药学', NULL, 80
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 中医学与中药学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '360', '中医学与中药学', NULL, 81
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 工程与技术科学基础学科
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '410', '工程与技术科学基础学科', NULL, 82
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 信息与系统科学相关工程与技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '413', '信息与系统科学相关工程与技术', NULL, 83
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 自然科学相关工程与技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '416', '自然科学相关工程与技术', NULL, 84
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 测绘科学技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '420', '测绘科学技术', NULL, 85
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 材料科学
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '430', '材料科学', NULL, 86
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 矿山工程技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '440', '矿山工程技术', NULL, 87
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 冶金工程技术
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '450', '冶金工程技术', NULL, 88
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 机械工程
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '460', '机械工程', NULL, 89
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  -- 动力与电气工程
  INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
  ) VALUES (
    uuid_generate_v4(), NULL, '470', '动力与电气工程', NULL, 90
  )
  ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = CURRENT_TIMESTAMP;

  RAISE NOTICE '一级学科分类（第 3 批）创建完成';
END $$;
