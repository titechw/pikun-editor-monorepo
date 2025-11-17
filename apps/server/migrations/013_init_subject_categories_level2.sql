-- 初始化学科分类 - 第二批：二级分类
-- 创建时间: 2024
-- 说明：创建主要学科的二级分类

SET search_path TO pikun_db, public;

DO $$
DECLARE
  science_id UUID;
  engineering_id UUID;
  literature_id UUID;
  history_id UUID;
  philosophy_id UUID;
  economics_id UUID;
  law_id UUID;
  education_id UUID;
  arts_id UUID;
  medicine_id UUID;
  agriculture_id UUID;
  management_id UUID;
BEGIN
  -- 获取一级分类ID
  SELECT category_id INTO science_id FROM pikun_db.subject_categories WHERE code = 'science';
  SELECT category_id INTO engineering_id FROM pikun_db.subject_categories WHERE code = 'engineering';
  SELECT category_id INTO literature_id FROM pikun_db.subject_categories WHERE code = 'literature';
  SELECT category_id INTO history_id FROM pikun_db.subject_categories WHERE code = 'history';
  SELECT category_id INTO philosophy_id FROM pikun_db.subject_categories WHERE code = 'philosophy';
  SELECT category_id INTO economics_id FROM pikun_db.subject_categories WHERE code = 'economics';
  SELECT category_id INTO law_id FROM pikun_db.subject_categories WHERE code = 'law';
  SELECT category_id INTO education_id FROM pikun_db.subject_categories WHERE code = 'education';
  SELECT category_id INTO arts_id FROM pikun_db.subject_categories WHERE code = 'arts';
  SELECT category_id INTO medicine_id FROM pikun_db.subject_categories WHERE code = 'medicine';
  SELECT category_id INTO agriculture_id FROM pikun_db.subject_categories WHERE code = 'agriculture';
  SELECT category_id INTO management_id FROM pikun_db.subject_categories WHERE code = 'management';

  -- 理学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), science_id, 'mathematics', '数学', '研究数量、结构、变化以及空间等概念的学科', 1),
    (uuid_generate_v4(), science_id, 'physics', '物理学', '研究物质、能量、空间和时间等基本概念的学科', 2),
    (uuid_generate_v4(), science_id, 'chemistry', '化学', '研究物质的组成、性质、结构和变化规律的学科', 3),
    (uuid_generate_v4(), science_id, 'biology', '生物学', '研究生命现象和生命活动规律的学科', 4),
    (uuid_generate_v4(), science_id, 'astronomy', '天文学', '研究天体、宇宙结构和演化的学科', 5),
    (uuid_generate_v4(), science_id, 'geography', '地理学', '研究地球表面自然和人文现象的学科', 6),
    (uuid_generate_v4(), science_id, 'statistics', '统计学', '研究数据收集、分析和解释的学科', 7)
  ON CONFLICT (code) DO NOTHING;

  -- 工学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), engineering_id, 'computer_science', '计算机科学', '研究计算机系统、算法和软件开发的学科', 1),
    (uuid_generate_v4(), engineering_id, 'mechanical_engineering', '机械工程', '研究机械设计、制造和应用的学科', 2),
    (uuid_generate_v4(), engineering_id, 'electrical_engineering', '电气工程', '研究电力系统、电子技术和自动化的学科', 3),
    (uuid_generate_v4(), engineering_id, 'civil_engineering', '土木工程', '研究建筑、道路、桥梁等基础设施的学科', 4),
    (uuid_generate_v4(), engineering_id, 'chemical_engineering', '化学工程', '研究化学工艺和化工生产的学科', 5),
    (uuid_generate_v4(), engineering_id, 'materials_engineering', '材料工程', '研究材料性能、制备和应用的学科', 6),
    (uuid_generate_v4(), engineering_id, 'aerospace_engineering', '航空航天工程', '研究飞行器和航天器的设计制造的学科', 7),
    (uuid_generate_v4(), engineering_id, 'biomedical_engineering', '生物医学工程', '研究医学设备和技术应用的学科', 8)
  ON CONFLICT (code) DO NOTHING;

  -- 文学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), literature_id, 'chinese_literature', '中国语言文学', '研究中国语言文字和文学创作的学科', 1),
    (uuid_generate_v4(), literature_id, 'foreign_literature', '外国语言文学', '研究外国语言文字和文学创作的学科', 2),
    (uuid_generate_v4(), literature_id, 'journalism', '新闻传播学', '研究新闻传播理论和实践的学科', 3),
    (uuid_generate_v4(), literature_id, 'linguistics', '语言学', '研究语言结构、功能和演变的学科', 4)
  ON CONFLICT (code) DO NOTHING;

  -- 历史学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), history_id, 'chinese_history', '中国史', '研究中国历史发展进程的学科', 1),
    (uuid_generate_v4(), history_id, 'world_history', '世界史', '研究世界历史发展进程的学科', 2),
    (uuid_generate_v4(), history_id, 'archaeology', '考古学', '研究古代人类文化和遗存的学科', 3)
  ON CONFLICT (code) DO NOTHING;

  -- 哲学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), philosophy_id, 'chinese_philosophy', '中国哲学', '研究中国传统哲学思想的学科', 1),
    (uuid_generate_v4(), philosophy_id, 'western_philosophy', '西方哲学', '研究西方哲学思想的学科', 2),
    (uuid_generate_v4(), philosophy_id, 'logic', '逻辑学', '研究思维规律和推理方法的学科', 3),
    (uuid_generate_v4(), philosophy_id, 'ethics', '伦理学', '研究道德和价值观的学科', 4)
  ON CONFLICT (code) DO NOTHING;

  -- 经济学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), economics_id, 'theoretical_economics', '理论经济学', '研究经济学基本理论和规律的学科', 1),
    (uuid_generate_v4(), economics_id, 'applied_economics', '应用经济学', '研究经济学在实际问题中应用的学科', 2),
    (uuid_generate_v4(), economics_id, 'finance', '金融学', '研究货币、信用和金融市场的学科', 3),
    (uuid_generate_v4(), economics_id, 'international_trade', '国际贸易', '研究国际贸易理论和实践的学科', 4)
  ON CONFLICT (code) DO NOTHING;

  -- 法学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), law_id, 'jurisprudence', '法学理论', '研究法律基本理论和法律思想的学科', 1),
    (uuid_generate_v4(), law_id, 'constitutional_law', '宪法学', '研究宪法制度和宪法实践的学科', 2),
    (uuid_generate_v4(), law_id, 'criminal_law', '刑法学', '研究犯罪和刑罚的学科', 3),
    (uuid_generate_v4(), law_id, 'civil_law', '民法学', '研究民事法律关系的学科', 4),
    (uuid_generate_v4(), law_id, 'commercial_law', '商法学', '研究商事法律关系的学科', 5)
  ON CONFLICT (code) DO NOTHING;

  -- 教育学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), education_id, 'pedagogy', '教育学原理', '研究教育基本理论和教育规律的学科', 1),
    (uuid_generate_v4(), education_id, 'curriculum_teaching', '课程与教学论', '研究课程设计和教学方法的学科', 2),
    (uuid_generate_v4(), education_id, 'educational_psychology', '教育心理学', '研究教育过程中的心理现象的学科', 3),
    (uuid_generate_v4(), education_id, 'preschool_education', '学前教育', '研究幼儿教育理论和实践的学科', 4)
  ON CONFLICT (code) DO NOTHING;

  -- 艺术学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), arts_id, 'fine_arts', '美术学', '研究绘画、雕塑等视觉艺术的学科', 1),
    (uuid_generate_v4(), arts_id, 'music', '音乐学', '研究音乐理论和音乐创作的学科', 2),
    (uuid_generate_v4(), arts_id, 'drama', '戏剧学', '研究戏剧理论和戏剧表演的学科', 3),
    (uuid_generate_v4(), arts_id, 'design', '设计学', '研究设计理论和设计实践的学科', 4)
  ON CONFLICT (code) DO NOTHING;

  -- 医学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), medicine_id, 'clinical_medicine', '临床医学', '研究疾病诊断和治疗的学科', 1),
    (uuid_generate_v4(), medicine_id, 'preventive_medicine', '预防医学', '研究疾病预防和健康促进的学科', 2),
    (uuid_generate_v4(), medicine_id, 'traditional_chinese_medicine', '中医学', '研究中医理论和中医治疗的学科', 3),
    (uuid_generate_v4(), medicine_id, 'pharmacy', '药学', '研究药物研发和药物应用的学科', 4)
  ON CONFLICT (code) DO NOTHING;

  -- 农学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), agriculture_id, 'crop_science', '作物学', '研究作物栽培和作物育种的学科', 1),
    (uuid_generate_v4(), agriculture_id, 'horticulture', '园艺学', '研究果树、蔬菜、花卉等园艺作物的学科', 2),
    (uuid_generate_v4(), agriculture_id, 'animal_science', '畜牧学', '研究动物饲养和动物育种的学科', 3),
    (uuid_generate_v4(), agriculture_id, 'forestry', '林学', '研究森林培育和森林管理的学科', 4)
  ON CONFLICT (code) DO NOTHING;

  -- 管理学 - 二级分类
  INSERT INTO pikun_db.subject_categories (category_id, parent_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), management_id, 'business_administration', '工商管理', '研究企业管理和商业运营的学科', 1),
    (uuid_generate_v4(), management_id, 'public_administration', '公共管理', '研究公共组织管理和公共政策的学科', 2),
    (uuid_generate_v4(), management_id, 'library_science', '图书情报学', '研究信息管理和知识服务的学科', 3),
    (uuid_generate_v4(), management_id, 'tourism_management', '旅游管理', '研究旅游业管理和旅游服务的学科', 4)
  ON CONFLICT (code) DO NOTHING;

  RAISE NOTICE '二级分类创建完成';
END $$;

-- 验证插入结果
SELECT 
    sc1.name as level1_name,
    sc2.code,
    sc2.name as level2_name,
    sc2.level,
    sc2.path
FROM pikun_db.subject_categories sc2
JOIN pikun_db.subject_categories sc1 ON sc2.parent_id = sc1.category_id
WHERE sc2.level = 2
ORDER BY sc1.sort_order, sc2.sort_order
LIMIT 20;

