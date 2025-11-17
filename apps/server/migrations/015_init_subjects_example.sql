-- 初始化学科数据 - 示例：创建一些常见学科
-- 创建时间: 2024
-- 说明：创建一些常见学科作为示例，后续可以根据 PDF 内容补充

SET search_path TO pikun_db, public;

DO $$
DECLARE
  software_engineering_cat_id UUID;
  ai_cat_id UUID;
  data_science_cat_id UUID;
  python_subject_id UUID;
  java_subject_id UUID;
  machine_learning_subject_id UUID;
  deep_learning_subject_id UUID;
  data_analysis_subject_id UUID;
BEGIN
  -- 获取三级分类ID
  SELECT category_id INTO software_engineering_cat_id 
  FROM pikun_db.subject_categories 
  WHERE code = 'software_engineering';
  
  SELECT category_id INTO ai_cat_id 
  FROM pikun_db.subject_categories 
  WHERE code = 'artificial_intelligence';
  
  SELECT category_id INTO data_science_cat_id 
  FROM pikun_db.subject_categories 
  WHERE code = 'data_science';

  -- 创建 Python 编程学科
  INSERT INTO pikun_db.subjects (
    subject_id, category_id, code, name, short_name, sort_order, is_published
  ) VALUES (
    uuid_generate_v4(),
    software_engineering_cat_id,
    'python_programming',
    'Python 编程',
    'Python',
    1,
    true
  )
  ON CONFLICT (code) DO NOTHING
  RETURNING subject_id INTO python_subject_id;

  IF python_subject_id IS NULL THEN
    SELECT subject_id INTO python_subject_id FROM pikun_db.subjects WHERE code = 'python_programming';
  END IF;

  -- 创建 Java 编程学科
  INSERT INTO pikun_db.subjects (
    subject_id, category_id, code, name, short_name, sort_order, is_published
  ) VALUES (
    uuid_generate_v4(),
    software_engineering_cat_id,
    'java_programming',
    'Java 编程',
    'Java',
    2,
    true
  )
  ON CONFLICT (code) DO NOTHING
  RETURNING subject_id INTO java_subject_id;

  IF java_subject_id IS NULL THEN
    SELECT subject_id INTO java_subject_id FROM pikun_db.subjects WHERE code = 'java_programming';
  END IF;

  -- 创建机器学习学科
  INSERT INTO pikun_db.subjects (
    subject_id, category_id, code, name, short_name, sort_order, is_published
  ) VALUES (
    uuid_generate_v4(),
    ai_cat_id,
    'machine_learning',
    '机器学习',
    'ML',
    1,
    true
  )
  ON CONFLICT (code) DO NOTHING
  RETURNING subject_id INTO machine_learning_subject_id;

  IF machine_learning_subject_id IS NULL THEN
    SELECT subject_id INTO machine_learning_subject_id FROM pikun_db.subjects WHERE code = 'machine_learning';
  END IF;

  -- 创建深度学习学科
  INSERT INTO pikun_db.subjects (
    subject_id, category_id, code, name, short_name, sort_order, is_published
  ) VALUES (
    uuid_generate_v4(),
    ai_cat_id,
    'deep_learning',
    '深度学习',
    'DL',
    2,
    true
  )
  ON CONFLICT (code) DO NOTHING
  RETURNING subject_id INTO deep_learning_subject_id;

  IF deep_learning_subject_id IS NULL THEN
    SELECT subject_id INTO deep_learning_subject_id FROM pikun_db.subjects WHERE code = 'deep_learning';
  END IF;

  -- 创建数据分析学科
  INSERT INTO pikun_db.subjects (
    subject_id, category_id, code, name, short_name, sort_order, is_published
  ) VALUES (
    uuid_generate_v4(),
    data_science_cat_id,
    'data_analysis',
    '数据分析',
    '数据分析',
    1,
    true
  )
  ON CONFLICT (code) DO NOTHING
  RETURNING subject_id INTO data_analysis_subject_id;

  IF data_analysis_subject_id IS NULL THEN
    SELECT subject_id INTO data_analysis_subject_id FROM pikun_db.subjects WHERE code = 'data_analysis';
  END IF;

  -- 插入 Python 编程学科详情
  INSERT INTO pikun_db.subject_details (
    subject_id, definition, description, purpose, value, application_scenarios, learning_objectives, prerequisites
  ) VALUES (
    python_subject_id,
    'Python 是一种高级编程语言，具有简洁、易读的语法特点，由 Guido van Rossum 于 1991 年首次发布。',
    'Python 是一种解释型、面向对象、动态数据类型的高级程序设计语言。它支持多种编程范式，包括面向对象、命令式、函数式和过程式编程。',
    '掌握 Python 可以快速开发各种应用程序，提高开发效率，降低开发成本。',
    'Python 是当前最热门的编程语言之一，广泛应用于 Web 开发、数据分析、人工智能、自动化脚本等领域，就业前景广阔，薪资水平较高。',
    'Web 开发（Django、Flask）、数据分析（Pandas、NumPy）、机器学习（Scikit-learn、TensorFlow）、自动化脚本、爬虫开发、科学计算等。',
    '掌握 Python 基础语法、面向对象编程、常用标准库和第三方库的使用，能够独立开发中小型应用程序。',
    '具备基本的计算机操作能力，了解基本的编程概念，具备逻辑思维能力。'
  )
  ON CONFLICT (subject_id) DO UPDATE SET
    definition = EXCLUDED.definition,
    description = EXCLUDED.description,
    purpose = EXCLUDED.purpose,
    value = EXCLUDED.value,
    application_scenarios = EXCLUDED.application_scenarios,
    learning_objectives = EXCLUDED.learning_objectives,
    prerequisites = EXCLUDED.prerequisites,
    updated_at = CURRENT_TIMESTAMP;

  RAISE NOTICE '示例学科创建完成';
  RAISE NOTICE 'Python 编程学科 ID: %', python_subject_id;
  RAISE NOTICE 'Java 编程学科 ID: %', java_subject_id;
  RAISE NOTICE '机器学习学科 ID: %', machine_learning_subject_id;
END $$;

-- 验证插入结果
SELECT 
    s.code,
    s.name,
    sc3.name as category_name,
    sd.definition
FROM pikun_db.subjects s
LEFT JOIN pikun_db.subject_categories sc3 ON s.category_id = sc3.category_id
LEFT JOIN pikun_db.subject_details sd ON s.subject_id = sd.subject_id
WHERE s.deleted_at IS NULL
ORDER BY s.created_at DESC
LIMIT 10;

