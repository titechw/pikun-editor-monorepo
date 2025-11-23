-- 初始化能力模型基础数据
-- 创建时间: 2024

SET search_path TO pikun_db, public;

-- 插入能力类别
INSERT INTO pikun_db.ability_categories (category_id, code, name, description, sort_order) VALUES
  (uuid_generate_v4(), 'core', '核心底层能力', '所有活动都需具备的通用能力，决定个人能力的成长上限', 1),
  (uuid_generate_v4(), 'specialized', '专项应用能力', '适配特定场景的差异化能力，体现个人的核心竞争力', 2)
ON CONFLICT (code) DO NOTHING;

-- 获取类别ID（用于后续插入）
DO $$
DECLARE
  core_category_id UUID;
  specialized_category_id UUID;
BEGIN
  SELECT category_id INTO core_category_id FROM pikun_db.ability_categories WHERE code = 'core';
  SELECT category_id INTO specialized_category_id FROM pikun_db.ability_categories WHERE code = 'specialized';

  -- 插入核心底层能力的维度
  INSERT INTO pikun_db.ability_dimensions (dimension_id, category_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), core_category_id, 'cognitive', '认知能力', '个体理解、处理、转化信息的基础能力，是所有能力的核心支撑', 1),
    (uuid_generate_v4(), core_category_id, 'emotional_willpower', '情绪与意志能力', '个体调节自身情绪、抵御挫折、保持行动持续性的能力，影响能力发挥的稳定性', 2),
    (uuid_generate_v4(), core_category_id, 'meta', '元能力', '驱动所有能力升级的"能力之能力"，是个人成长的核心引擎', 3)
  ON CONFLICT (category_id, code) DO NOTHING;

  -- 插入专项应用能力的维度
  INSERT INTO pikun_db.ability_dimensions (dimension_id, category_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), specialized_category_id, 'professional_skills', '专业知识与技能', '个体在特定领域积累的系统性知识与实操技能，是场景应用的基础', 1),
    (uuid_generate_v4(), specialized_category_id, 'practical_strategy', '实践与策略能力', '个体将知识技能转化为实际成果的能力，强调解决问题的效率与效果', 2),
    (uuid_generate_v4(), specialized_category_id, 'scenario_adaptation', '场景适配能力', '个体在特定场景中整合底层能力与专项技能的综合能力，具有强实践性', 3)
  ON CONFLICT (category_id, code) DO NOTHING;
END $$;

-- 插入核心底层能力 - 认知能力的能力项
DO $$
DECLARE
  cognitive_dimension_id UUID;
BEGIN
  SELECT dimension_id INTO cognitive_dimension_id FROM pikun_db.ability_dimensions WHERE code = 'cognitive';
  
  INSERT INTO pikun_db.ability_items (item_id, dimension_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), cognitive_dimension_id, 'logical_thinking', '逻辑思维', '对问题进行分析、推理、归纳，构建严谨思维链条的能力', 1),
    (uuid_generate_v4(), cognitive_dimension_id, 'memory', '记忆力', '对信息进行存储、编码与提取的能力', 2),
    (uuid_generate_v4(), cognitive_dimension_id, 'focus', '专注力', '排除干扰、将注意力持续集中于目标任务的能力', 3),
    (uuid_generate_v4(), cognitive_dimension_id, 'learning', '学习力', '吸收新知识、转化为自身技能，并迁移到新场景的能力', 4),
    (uuid_generate_v4(), cognitive_dimension_id, 'perception', '感知力', '敏锐捕捉环境、他人情绪与细节信息的能力', 5),
    (uuid_generate_v4(), cognitive_dimension_id, 'basic_imagination', '基础想象力', '个体在已有知识经验基础上，构建未感知过的事物形象或设想未发生情境的通用能力', 6),
    (uuid_generate_v4(), cognitive_dimension_id, 'basic_creativity', '基础创造力', '个体将基础想象力转化为新颖且有价值的简单成果的通用能力', 7),
    (uuid_generate_v4(), cognitive_dimension_id, 'basic_calculation', '基础计算力', '个体对整数、小数、分数等基础数值进行运算，解决日常简单计算问题的能力', 8)
  ON CONFLICT (dimension_id, code) DO NOTHING;
END $$;

-- 插入核心底层能力 - 情绪与意志能力的能力项
DO $$
DECLARE
  emotional_dimension_id UUID;
BEGIN
  SELECT dimension_id INTO emotional_dimension_id FROM pikun_db.ability_dimensions WHERE code = 'emotional_willpower';
  
  INSERT INTO pikun_db.ability_items (item_id, dimension_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), emotional_dimension_id, 'eq', '情商', '识别、表达自身与他人情绪，并有效管理情绪的能力', 1),
    (uuid_generate_v4(), emotional_dimension_id, 'patience', '耐心', '为长期目标持续投入，不急于求成的能力', 2),
    (uuid_generate_v4(), emotional_dimension_id, 'perseverance', '毅力', '面对困难与挫折时，不放弃、持续努力的韧性', 3),
    (uuid_generate_v4(), emotional_dimension_id, 'resilience', '抗挫力', '经历失败或打击后，快速恢复心态、重新投入的能力', 4),
    (uuid_generate_v4(), emotional_dimension_id, 'self_discipline', '自律性', '自我约束、抵制诱惑，按计划完成任务的能力', 5)
  ON CONFLICT (dimension_id, code) DO NOTHING;
END $$;

-- 插入核心底层能力 - 元能力的能力项
DO $$
DECLARE
  meta_dimension_id UUID;
BEGIN
  SELECT dimension_id INTO meta_dimension_id FROM pikun_db.ability_dimensions WHERE code = 'meta';
  
  INSERT INTO pikun_db.ability_items (item_id, dimension_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), meta_dimension_id, 'self_awareness', '自我认知', '清晰了解自身优势、短板、需求与价值观的能力', 1),
    (uuid_generate_v4(), meta_dimension_id, 'goal_management', '目标管理', '将大目标拆解为可执行任务，合理排序并推进的能力', 2),
    (uuid_generate_v4(), meta_dimension_id, 'review_iteration', '复盘迭代', '完成任务后，总结经验教训，优化后续行动的能力', 3),
    (uuid_generate_v4(), meta_dimension_id, 'decision_making', '决策力', '基于信息分析，快速做出合理选择的能力', 4)
  ON CONFLICT (dimension_id, code) DO NOTHING;
END $$;

-- 插入专项应用能力 - 专业知识与技能的能力项（示例，可根据实际需求扩展）
DO $$
DECLARE
  professional_dimension_id UUID;
BEGIN
  SELECT dimension_id INTO professional_dimension_id FROM pikun_db.ability_dimensions WHERE code = 'professional_skills';
  
  INSERT INTO pikun_db.ability_items (item_id, dimension_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), professional_dimension_id, 'professional_calculation', '专业计算力', '个体运用特定领域知识进行复杂数值运算与数据处理的能力', 1),
    (uuid_generate_v4(), professional_dimension_id, 'professional_imagination', '专业想象力', '个体结合特定领域专业知识，构建该领域内未感知事物形象或设想专业场景的能力', 2),
    (uuid_generate_v4(), professional_dimension_id, 'professional_creativity', '专业创造力', '个体依托特定领域专业知识与技能，将专业想象力转化为新颖且有价值的专业成果的能力', 3),
    (uuid_generate_v4(), professional_dimension_id, 'information_retrieval', '信息检索与处理能力', '个体在海量信息中精准检索所需信息，并对信息进行筛选、分析、整合的能力', 4),
    (uuid_generate_v4(), professional_dimension_id, 'cross_cultural_communication', '跨文化沟通能力', '个体在不同文化背景下，准确传递信息、理解他人意图、达成沟通目标的能力', 5),
    (uuid_generate_v4(), professional_dimension_id, 'programming', '编程能力', '运用编程语言，设计程序、解决问题的能力', 6)
  ON CONFLICT (dimension_id, code) DO NOTHING;
END $$;

-- 插入专项应用能力 - 实践与策略能力的能力项（示例）
DO $$
DECLARE
  practical_dimension_id UUID;
BEGIN
  SELECT dimension_id INTO practical_dimension_id FROM pikun_db.ability_dimensions WHERE code = 'practical_strategy';
  
  INSERT INTO pikun_db.ability_items (item_id, dimension_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), practical_dimension_id, 'problem_solving', '解题能力', '运用学科知识与逻辑，解决各类学科问题的能力', 1),
    (uuid_generate_v4(), practical_dimension_id, 'financial_quotient', '财商', '认知、管理、增值财富，控制财务风险的能力', 2),
    (uuid_generate_v4(), practical_dimension_id, 'crisis_response', '危机应对能力', '个体在突发危机中，快速分析情况、制定应对方案、控制事态发展的能力', 3),
    (uuid_generate_v4(), practical_dimension_id, 'strategy', '谋略能力', '分析局势、制定策略，实现目标的能力', 4),
    (uuid_generate_v4(), practical_dimension_id, 'communication', '沟通表达能力', '清晰传递信息、准确理解他人意图，达成沟通目标的能力', 5),
    (uuid_generate_v4(), practical_dimension_id, 'creativity', '创造力', '提出新颖思路、设计创新方案，解决问题或创造价值的能力', 6)
  ON CONFLICT (dimension_id, code) DO NOTHING;
END $$;

-- 插入专项应用能力 - 场景适配能力的能力项（示例）
DO $$
DECLARE
  scenario_dimension_id UUID;
BEGIN
  SELECT dimension_id INTO scenario_dimension_id FROM pikun_db.ability_dimensions WHERE code = 'scenario_adaptation';
  
  INSERT INTO pikun_db.ability_items (item_id, dimension_id, code, name, description, sort_order) VALUES
    (uuid_generate_v4(), scenario_dimension_id, 'workplace_execution', '职场执行能力', '高效完成职场任务，确保工作质量与进度的能力', 1),
    (uuid_generate_v4(), scenario_dimension_id, 'project_management', '项目管理能力', '规划、协调项目资源，控制项目进度与风险，实现项目目标的能力', 2),
    (uuid_generate_v4(), scenario_dimension_id, 'learning_exam', '学习应试能力', '掌握考试技巧、高效输出知识，取得好成绩的能力', 3),
    (uuid_generate_v4(), scenario_dimension_id, 'entrepreneurship', '创业运营能力', '洞察市场需求、整合资源、推进创业项目，实现商业价值的能力', 4),
    (uuid_generate_v4(), scenario_dimension_id, 'lifelong_learning', '终身学习能力', '个体根据社会发展与个人需求，持续学习新知识、新技能，适应环境变化的能力', 5)
  ON CONFLICT (dimension_id, code) DO NOTHING;
END $$;

-- 插入全局等级模板（1-10级，经验值递增）
INSERT INTO pikun_db.ability_item_level_configs (
  config_id, item_id, level, required_exp, requires_assessment, level_name, is_template, sort_order
) VALUES
  (uuid_generate_v4(), NULL, 1, 10, false, '初级', true, 1),
  (uuid_generate_v4(), NULL, 2, 100, false, '初级+', true, 2),
  (uuid_generate_v4(), NULL, 3, 500, false, '中级', true, 3),
  (uuid_generate_v4(), NULL, 4, 1000, true, '中级+', true, 4),
  (uuid_generate_v4(), NULL, 5, 2500, false, '高级', true, 5),
  (uuid_generate_v4(), NULL, 6, 5000, true, '高级+', true, 6),
  (uuid_generate_v4(), NULL, 7, 10000, false, '专家', true, 7),
  (uuid_generate_v4(), NULL, 8, 20000, true, '专家+', true, 8),
  (uuid_generate_v4(), NULL, 9, 50000, false, '大师', true, 9),
  (uuid_generate_v4(), NULL, 10, 100000, true, '大师+', true, 10)
ON CONFLICT (COALESCE(item_id::text, 'template'), level) DO NOTHING;









