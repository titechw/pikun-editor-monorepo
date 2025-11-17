-- 初始化学科分类 - 第三批：三级分类（计算机科学）
-- 创建时间: 2024
-- 说明：以计算机科学为例，创建三级分类

SET search_path TO pikun_db, public;

DO $$
DECLARE
  computer_science_id UUID;
BEGIN
  -- 获取计算机科学分类ID
  SELECT category_id INTO computer_science_id 
  FROM pikun_db.subject_categories 
  WHERE code = 'computer_science';

  IF computer_science_id IS NULL THEN
    RAISE EXCEPTION '计算机科学分类不存在，请先创建二级分类';
  END IF;

  -- 计算机科学 - 三级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), computer_science_id, 'software_engineering', '软件工程', '研究软件开发、软件设计和软件管理的学科', 1),
    (uuid_generate_v4(), computer_science_id, 'artificial_intelligence', '人工智能', '研究机器学习、深度学习、自然语言处理等AI技术的学科', 2),
    (uuid_generate_v4(), computer_science_id, 'data_science', '数据科学', '研究数据分析、数据挖掘和大数据处理的学科', 3),
    (uuid_generate_v4(), computer_science_id, 'computer_networks', '计算机网络', '研究网络协议、网络架构和网络安全的学科', 4),
    (uuid_generate_v4(), computer_science_id, 'database_systems', '数据库系统', '研究数据库设计、数据库管理和数据存储的学科', 5),
    (uuid_generate_v4(), computer_science_id, 'operating_systems', '操作系统', '研究操作系统原理、系统设计和系统优化的学科', 6),
    (uuid_generate_v4(), computer_science_id, 'algorithms', '算法与数据结构', '研究算法设计、算法分析和数据结构的学科', 7),
    (uuid_generate_v4(), computer_science_id, 'programming_languages', '编程语言', '研究编程语言设计、语言实现和语言理论的学科', 8),
    (uuid_generate_v4(), computer_science_id, 'computer_graphics', '计算机图形学', '研究图形渲染、图像处理和可视化的学科', 9),
    (uuid_generate_v4(), computer_science_id, 'cybersecurity', '网络安全', '研究信息安全、密码学和网络防护的学科', 10),
    (uuid_generate_v4(), computer_science_id, 'distributed_systems', '分布式系统', '研究分布式计算、云计算和微服务架构的学科', 11),
    (uuid_generate_v4(), computer_science_id, 'mobile_computing', '移动计算', '研究移动应用开发、移动平台和移动技术的学科', 12)
  ON CONFLICT (code) DO NOTHING;

  RAISE NOTICE '计算机科学三级分类创建完成';
END $$;

-- 验证插入结果
SELECT 
    sc1.name as level1_name,
    sc2.name as level2_name,
    sc3.code,
    sc3.name as level3_name,
    sc3.level,
    sc3.path
FROM pikun_db.subject_categories sc3
JOIN pikun_db.subject_categories sc2 ON sc3.parent_id = sc2.category_id
JOIN pikun_db.subject_categories sc1 ON sc2.parent_id = sc1.category_id
WHERE sc3.level = 3
  AND sc2.code = 'computer_science'
ORDER BY sc3.sort_order;

