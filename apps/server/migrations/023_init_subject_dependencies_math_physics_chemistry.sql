-- 初始化学科依赖关系数据（数学、物理、化学）
-- 创建时间: 2025-12-03
-- 为数学、物理、化学相关学科创建合理的依赖关系

SET search_path TO pikun_db, public;

BEGIN;

-- ============================================
-- 数学学科依赖关系
-- ============================================

-- 数学基础 -> 线性代数
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1102110' -- 线性代数
  AND s2.code = 'subject_1101460' -- 数学基础
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 线性代数 -> 群论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1102115' -- 群论
  AND s2.code = 'subject_1102110' -- 线性代数
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 线性代数 -> 域论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1102120' -- 域论
  AND s2.code = 'subject_1102110' -- 线性代数
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 线性代数 -> 环论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1102140' -- 环论
  AND s2.code = 'subject_1102110' -- 线性代数
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 环论 -> 模论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1102145' -- 模论
  AND s2.code = 'subject_1102140' -- 环论
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 数学基础 -> 初等数论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1101710' -- 初等数论
  AND s2.code = 'subject_1101460' -- 数学基础
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 初等数论 -> 解析数论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1101720' -- 解析数论
  AND s2.code = 'subject_1101710' -- 初等数论
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 线性代数 + 初等数论 -> 代数数论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1101730' -- 代数数论
  AND s2.code = 'subject_1102110' -- 线性代数
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1101730' -- 代数数论
  AND s2.code = 'subject_1101710' -- 初等数论
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 数学基础 -> 几何学基础
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1102710' -- 几何学基础
  AND s2.code = 'subject_1101460' -- 数学基础
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 几何学基础 -> 欧氏几何学
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1102715' -- 欧氏几何学
  AND s2.code = 'subject_1102710' -- 几何学基础
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 线性代数 -> 向量和张量分析
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1102730' -- 向量和张量分析
  AND s2.code = 'subject_1102110' -- 线性代数
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 几何学基础 + 线性代数 -> 微分几何学
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1102745' -- 微分几何学
  AND s2.code = 'subject_1102710' -- 几何学基础
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'recommended'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1102745' -- 微分几何学
  AND s2.code = 'subject_1102110' -- 线性代数
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 数学基础 -> 微分学
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1103410' -- 微分学
  AND s2.code = 'subject_1101460' -- 数学基础
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 微分学 -> 积分学
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1103420' -- 积分学
  AND s2.code = 'subject_1103410' -- 微分学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 积分学 -> 级数论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1103430' -- 级数论
  AND s2.code = 'subject_1103420' -- 积分学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 积分学 -> 实变函数论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1104110' -- 实变函数论
  AND s2.code = 'subject_1103420' -- 积分学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 积分学 -> 单复变函数论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1104120' -- 单复变函数论
  AND s2.code = 'subject_1103420' -- 积分学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 单复变函数论 -> 多复变函数论
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1104130' -- 多复变函数论
  AND s2.code = 'subject_1104120' -- 单复变函数论
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 积分学 -> 常微分方程
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1104410' -- 定性理论（常微分方程）
  AND s2.code = 'subject_1103420' -- 积分学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1104420' -- 稳定性理论（常微分方程）
  AND s2.code = 'subject_1103420' -- 积分学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 积分学 + 线性代数 -> 偏微分方程
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1104710' -- 椭圆型偏微分方程
  AND s2.code = 'subject_1103420' -- 积分学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1104710' -- 椭圆型偏微分方程
  AND s2.code = 'subject_1102110' -- 线性代数
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- ============================================
-- 物理学科依赖关系
-- ============================================

-- 数学基础 -> 理论力学
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1301010' -- 理论力学
  AND s2.code = 'subject_1101460' -- 数学基础
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 积分学 -> 理论力学（推荐）
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'recommended'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1301010' -- 理论力学
  AND s2.code = 'subject_1103420' -- 积分学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 理论力学 -> 弹性力学
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1301510' -- 弹性力学
  AND s2.code = 'subject_1301010' -- 理论力学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 弹性力学 -> 塑性力学
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1301515' -- 塑性力学
  AND s2.code = 'subject_1301510' -- 弹性力学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 理论力学 -> 理论物理学
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'required'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1401510' -- 数学物理
  AND s2.code = 'subject_1301010' -- 理论力学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 积分学 -> 数学物理（推荐）
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'recommended'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1401510' -- 数学物理
  AND s2.code = 'subject_1103420' -- 积分学
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

-- 线性代数 -> 数学物理（推荐）
INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
SELECT 
  s1.subject_id,
  s2.subject_id,
  'recommended'
FROM pikun_db.subjects s1
CROSS JOIN pikun_db.subjects s2
WHERE s1.code = 'subject_1401510' -- 数学物理
  AND s2.code = 'subject_1102110' -- 线性代数
ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING;

COMMIT;

-- 说明：
-- 1. 本脚本创建了数学学科之间的基础依赖关系
-- 2. 依赖关系遵循从基础到高级的学习路径
-- 3. 物理和化学的依赖关系需要根据实际的学科数据来创建
-- 4. 可以通过管理端界面继续添加更多的依赖关系

