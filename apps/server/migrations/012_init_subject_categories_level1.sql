-- 初始化学科分类 - 第一批：顶级分类
-- 创建时间: 2024
-- 说明：根据常见的学科分类体系，创建顶级分类

SET search_path TO pikun_db, public;

-- 插入顶级分类（一级分类）
-- 注意：由于触发器会自动计算 path 和 level，这里只需要设置 parent_id 为 NULL
INSERT INTO pikun_db.subject_categories (
    category_id, parent_id, code, name, description, sort_order
) VALUES
    -- 理学类
    (uuid_generate_v4(), NULL, 'science', '理学', '研究自然现象和规律的学科门类', 1),
    -- 工学类
    (uuid_generate_v4(), NULL, 'engineering', '工学', '应用科学原理解决实际问题的学科门类', 2),
    -- 文学类
    (uuid_generate_v4(), NULL, 'literature', '文学', '研究语言文字和文学创作的学科门类', 3),
    -- 历史学类
    (uuid_generate_v4(), NULL, 'history', '历史学', '研究人类社会发展历程的学科门类', 4),
    -- 哲学类
    (uuid_generate_v4(), NULL, 'philosophy', '哲学', '研究世界观、人生观、价值观的学科门类', 5),
    -- 经济学类
    (uuid_generate_v4(), NULL, 'economics', '经济学', '研究资源配置和经济活动的学科门类', 6),
    -- 法学类
    (uuid_generate_v4(), NULL, 'law', '法学', '研究法律制度和法律实践的学科门类', 7),
    -- 教育学类
    (uuid_generate_v4(), NULL, 'education', '教育学', '研究教育理论和教育实践的学科门类', 8),
    -- 艺术学类
    (uuid_generate_v4(), NULL, 'arts', '艺术学', '研究艺术创作和艺术理论的学科门类', 9),
    -- 医学类
    (uuid_generate_v4(), NULL, 'medicine', '医学', '研究人体健康和疾病防治的学科门类', 10),
    -- 农学类
    (uuid_generate_v4(), NULL, 'agriculture', '农学', '研究农业生产和农业技术的学科门类', 11),
    -- 管理学类
    (uuid_generate_v4(), NULL, 'management', '管理学', '研究组织管理和管理实践的学科门类', 12)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    updated_at = CURRENT_TIMESTAMP;

-- 验证插入结果
SELECT 
    category_id,
    code,
    name,
    level,
    path,
    sort_order
FROM pikun_db.subject_categories
WHERE parent_id IS NULL
ORDER BY sort_order;

