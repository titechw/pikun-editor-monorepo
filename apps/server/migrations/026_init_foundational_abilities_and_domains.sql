-- 初始化基础能力和学科门类数据
-- 创建时间: 2025-01-XX

SET search_path TO pikun_db, public;

-- 插入基础能力
INSERT INTO pikun_db.foundational_abilities (
    ability_id, code, name, description, sort_order
) VALUES
    (uuid_generate_v4(), 'literacy', '识字能力', '能够识别和理解文字的基本能力，是所有学科学习的基础', 1),
    (uuid_generate_v4(), 'basic_math', '基础数学', '掌握基本的数学概念和运算能力，包括加减乘除、分数、小数等', 2),
    (uuid_generate_v4(), 'logical_reasoning', '逻辑推理', '能够进行基本的逻辑推理和问题分析的能力', 3),
    (uuid_generate_v4(), 'reading_comprehension', '阅读理解', '能够理解文本内容，提取关键信息的能力', 4),
    (uuid_generate_v4(), 'basic_language', '基础语言', '掌握基本的语言表达能力，包括听说读写', 5),
    (uuid_generate_v4(), 'observation', '观察能力', '能够仔细观察和发现事物特征的能力', 6),
    (uuid_generate_v4(), 'memory', '记忆能力', '能够记忆和回忆信息的基本能力', 7),
    (uuid_generate_v4(), 'attention', '注意力', '能够集中注意力，专注于学习任务的能力', 8)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    updated_at = CURRENT_TIMESTAMP;

-- 插入基础能力依赖关系（例如：阅读理解需要识字能力）
INSERT INTO pikun_db.foundational_ability_dependencies (
    ability_id, prerequisite_ability_id, dependency_type
)
SELECT 
    a1.ability_id,
    a2.ability_id,
    'required'
FROM pikun_db.foundational_abilities a1
CROSS JOIN pikun_db.foundational_abilities a2
WHERE a1.code = 'reading_comprehension' AND a2.code = 'literacy'
ON CONFLICT (ability_id, prerequisite_ability_id) DO NOTHING;

-- 插入学科门类
INSERT INTO pikun_db.subject_domains (
    domain_id, code, name, description, sort_order
) VALUES
    (uuid_generate_v4(), 'natural_sciences', '自然科学', '研究自然现象和规律的学科门类，包括数学、物理、化学、生物等', 1),
    (uuid_generate_v4(), 'social_sciences', '社会科学', '研究社会现象和人类行为的学科门类，包括经济学、社会学、心理学等', 2),
    (uuid_generate_v4(), 'humanities', '人文科学', '研究人类文化和精神活动的学科门类，包括文学、历史、哲学等', 3),
    (uuid_generate_v4(), 'engineering', '工程技术', '应用科学原理解决实际问题的学科门类，包括计算机、机械、电子等', 4),
    (uuid_generate_v4(), 'medicine', '医学健康', '研究人体健康和疾病防治的学科门类', 5),
    (uuid_generate_v4(), 'arts', '艺术创作', '研究艺术创作和艺术理论的学科门类', 6),
    (uuid_generate_v4(), 'agriculture', '农业科学', '研究农业生产和农业技术的学科门类', 7),
    (uuid_generate_v4(), 'management', '管理科学', '研究组织管理和管理实践的学科门类', 8)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    updated_at = CURRENT_TIMESTAMP;

-- 将一级学科分类映射到学科门类
-- 这里需要根据实际的分类代码进行映射
-- 示例：数学、物理、化学、生物 -> 自然科学
-- 经济学、社会学、心理学 -> 社会科学
-- 文学、历史、哲学 -> 人文科学
-- 等等

-- 注意：这个映射需要根据实际的一级学科分类数据来填写
-- 这里提供一个示例框架，实际使用时需要根据 category_id 来映射

COMMENT ON TABLE pikun_db.domain_category_mappings IS '学科门类与一级学科分类的映射关系，需要根据实际数据填写';

-- 插入基础能力到学科门类的要求关系
-- 所有学科门类都需要基础能力
INSERT INTO pikun_db.domain_foundational_ability_requirements (
    domain_id, ability_id, requirement_type
)
SELECT 
    d.domain_id,
    a.ability_id,
    'required'
FROM pikun_db.subject_domains d
CROSS JOIN pikun_db.foundational_abilities a
WHERE a.code IN ('literacy', 'basic_math', 'logical_reasoning', 'reading_comprehension')
ON CONFLICT (domain_id, ability_id) DO NOTHING;


