-- 初始化学科门类与一级学科分类的映射关系
-- 创建时间: 2025-01-XX
-- 说明：将一级学科分类映射到对应的学科门类

SET search_path TO pikun_db, public;

-- 将一级学科分类映射到学科门类
-- 根据 GB/T 13745 标准进行分类

-- 自然科学（natural_sciences）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    d.domain_id,
    c.category_id,
    c.sort_order
FROM pikun_db.subject_domains d
CROSS JOIN pikun_db.subject_categories c
WHERE d.code = 'natural_sciences'
    AND c.code IN ('110', '120', '130', '140', '150', '160', '170', '180') -- 数学、信息科学、力学、物理、化学、天文、地球科学、生物
    AND c.parent_id IS NULL
    AND c.deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO NOTHING;

-- 社会科学（social_sciences）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    d.domain_id,
    c.category_id,
    c.sort_order
FROM pikun_db.subject_domains d
CROSS JOIN pikun_db.subject_categories c
WHERE d.code = 'social_sciences'
    AND c.code IN ('630', '640', '650', '660', '670', '680', '690', '710', '720', '730', '740', '750', '760') -- 管理学、马克思主义、哲学、宗教学、语言学、文学、艺术学、历史学、考古学、经济学、政治学、法学、社会学、民族学、新闻学与传播学、图书馆情报与文献学、教育学、心理学、体育学
    AND c.parent_id IS NULL
    AND c.deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO NOTHING;

-- 人文科学（humanities）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    d.domain_id,
    c.category_id,
    c.sort_order
FROM pikun_db.subject_domains d
CROSS JOIN pikun_db.subject_categories c
WHERE d.code = 'humanities'
    AND c.code IN ('710', '720', '730', '740', '750', '760', '770', '780') -- 语言学、文学、艺术学、历史学、考古学、经济学、政治学、法学、社会学、民族学、新闻学与传播学、图书馆情报与文献学、教育学、心理学、体育学
    AND c.parent_id IS NULL
    AND c.deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO NOTHING;

-- 工程技术（engineering）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    d.domain_id,
    c.category_id,
    c.sort_order
FROM pikun_db.subject_domains d
CROSS JOIN pikun_db.subject_categories c
WHERE d.code = 'engineering'
    AND c.code LIKE '4%' -- 所有以4开头的代码（工程技术类）
    AND c.parent_id IS NULL
    AND c.deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO NOTHING;

-- 医学健康（medicine）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    d.domain_id,
    c.category_id,
    c.sort_order
FROM pikun_db.subject_domains d
CROSS JOIN pikun_db.subject_categories c
WHERE d.code = 'medicine'
    AND c.code LIKE '32%' -- 所有以32开头的代码（医学类）
    AND c.parent_id IS NULL
    AND c.deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO NOTHING;

-- 艺术创作（arts）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    d.domain_id,
    c.category_id,
    c.sort_order
FROM pikun_db.subject_domains d
CROSS JOIN pikun_db.subject_categories c
WHERE d.code = 'arts'
    AND c.code IN ('760') -- 艺术学
    AND c.parent_id IS NULL
    AND c.deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO NOTHING;

-- 农业科学（agriculture）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    d.domain_id,
    c.category_id,
    c.sort_order
FROM pikun_db.subject_domains d
CROSS JOIN pikun_db.subject_categories c
WHERE d.code = 'agriculture'
    AND c.code LIKE '21%' -- 所有以21开头的代码（农业科学类）
    AND c.parent_id IS NULL
    AND c.deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO NOTHING;

-- 管理科学（management）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    d.domain_id,
    c.category_id,
    c.sort_order
FROM pikun_db.subject_domains d
CROSS JOIN pikun_db.subject_categories c
WHERE d.code = 'management'
    AND c.code IN ('630') -- 管理学
    AND c.parent_id IS NULL
    AND c.deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO NOTHING;

-- 注意：由于分类代码可能不完全符合上述规则，我们需要更精确的映射
-- 这里提供一个更完整的映射方案，基于实际的分类代码

-- 重新映射，使用更精确的分类
-- 先删除之前的映射（可选，如果不想重复）
-- DELETE FROM pikun_db.domain_category_mappings;

-- 更精确的映射（基于实际的一级学科分类代码）
-- 自然科学类（110-180）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    (SELECT domain_id FROM pikun_db.subject_domains WHERE code = 'natural_sciences'),
    category_id,
    sort_order
FROM pikun_db.subject_categories
WHERE code IN ('110', '120', '130', '140', '150', '160', '170', '180')
    AND parent_id IS NULL
    AND deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 社会科学类（630-790，但排除艺术学760）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    (SELECT domain_id FROM pikun_db.subject_domains WHERE code = 'social_sciences'),
    category_id,
    sort_order
FROM pikun_db.subject_categories
WHERE code IN ('630', '710', '720', '730', '740', '750', '770', '780', '790')
    AND parent_id IS NULL
    AND deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 人文科学类（主要是文学、历史、哲学相关）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    (SELECT domain_id FROM pikun_db.subject_domains WHERE code = 'humanities'),
    category_id,
    sort_order
FROM pikun_db.subject_categories
WHERE code IN ('710', '720', '730', '740', '750', '760', '770', '780')
    AND parent_id IS NULL
    AND deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 工程技术类（所有4开头的代码）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    (SELECT domain_id FROM pikun_db.subject_domains WHERE code = 'engineering'),
    category_id,
    sort_order
FROM pikun_db.subject_categories
WHERE code ~ '^4[0-9]{2}$' -- 匹配400-499的代码
    AND parent_id IS NULL
    AND deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 医学健康类（所有32开头的代码）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    (SELECT domain_id FROM pikun_db.subject_domains WHERE code = 'medicine'),
    category_id,
    sort_order
FROM pikun_db.subject_categories
WHERE code ~ '^32[0-9]$' -- 匹配320-329的代码
    AND parent_id IS NULL
    AND deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 艺术创作类（760艺术学）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    (SELECT domain_id FROM pikun_db.subject_domains WHERE code = 'arts'),
    category_id,
    sort_order
FROM pikun_db.subject_categories
WHERE code = '760'
    AND parent_id IS NULL
    AND deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 农业科学类（所有21开头的代码）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    (SELECT domain_id FROM pikun_db.subject_domains WHERE code = 'agriculture'),
    category_id,
    sort_order
FROM pikun_db.subject_categories
WHERE code ~ '^21[0-9]$' -- 匹配210-219的代码
    AND parent_id IS NULL
    AND deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 管理科学类（630管理学）
INSERT INTO pikun_db.domain_category_mappings (domain_id, category_id, sort_order)
SELECT 
    (SELECT domain_id FROM pikun_db.subject_domains WHERE code = 'management'),
    category_id,
    sort_order
FROM pikun_db.subject_categories
WHERE code = '630'
    AND parent_id IS NULL
    AND deleted_at IS NULL
ON CONFLICT (domain_id, category_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;


