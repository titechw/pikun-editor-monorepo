import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// 加载环境变量
dotenv.config({ path: resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const pool = new Pool({ connectionString });

interface AbilityData {
  category: {
    code: string;
    name: string;
    description: string;
    sort_order: number;
  };
  dimensions: Array<{
    code: string;
    name: string;
    description: string;
    sort_order: number;
    items: Array<{
      code: string;
      name: string;
      description: string;
      definition: string;
      performance_description: string;
      evaluation_points: string;
      training_strategies: string;
      theoretical_basis: string;
      talent_ratio: number;
      acquired_training_ratio: number;
      sort_order: number;
    }>;
  }>;
}

const abilityData: AbilityData[] = [
  {
    category: {
      code: 'meta_system',
      name: '元系统层',
      description: '个人最底层的认知和价值体系',
      sort_order: 1,
    },
    dimensions: [
      {
        code: 'worldview',
        name: '三观',
        description: '世界观、人生观、价值观',
        sort_order: 1,
        items: [
          {
            code: 'worldview',
            name: '世界观',
            description: '对世界本质、运行规律的根本认知',
            definition: '对世界本质、运行规律的根本认知',
            performance_description: '认为世界"可知/不可知""因果确定/偶然"',
            evaluation_points: '对科学规律、社会现象的认知一致性、开放性',
            training_strategies: '1. 阅读哲学、科学史著作（如《科学革命的结构》）；2. 参与跨学科讨论，暴露多元认知视角',
            theoretical_basis: '康德《纯粹理性批判》、波普尔科学哲学',
            talent_ratio: 60,
            acquired_training_ratio: 40,
            sort_order: 1,
          },
          {
            code: 'lifeview',
            name: '人生观',
            description: '对人生意义、目标的根本判断',
            definition: '对人生意义、目标的根本判断',
            performance_description: '追求"自我实现/享乐主义/奉献社会"',
            evaluation_points: '人生目标的清晰度、行动与目标的匹配度',
            training_strategies: '1. 写人生意义反思日记；2. 尝试不同领域实践（如公益、创业），总结价值感来源',
            theoretical_basis: '马斯洛需求层次理论、存在主义哲学',
            talent_ratio: 50,
            acquired_training_ratio: 50,
            sort_order: 2,
          },
          {
            code: 'values',
            name: '价值观',
            description: '对价值优先级的选择',
            definition: '对价值优先级的选择',
            performance_description: '"创新＞稳定""利他＞利己"等',
            evaluation_points: '价值选择的一致性、决策时的价值权重',
            training_strategies: '1. 做Schwartz价值观测试并定期复盘；2. 在决策场景中（如职业选择）明确价值优先级',
            theoretical_basis: 'Schwartz价值观理论、罗克奇价值观调查',
            talent_ratio: 40,
            acquired_training_ratio: 60,
            sort_order: 3,
          },
        ],
      },
      {
        code: 'personality',
        name: '人格特质',
        description: '性格和动机',
        sort_order: 2,
        items: [
          {
            code: 'personality',
            name: '性格',
            description: '相对稳定的行为模式（参考大五人格：外向性、尽责性等）',
            definition: '相对稳定的行为模式（参考大五人格：外向性、尽责性等）',
            performance_description: '外向/内向、谨慎/冒险',
            evaluation_points: '行为模式的一致性、场景适配度',
            training_strategies: '1. 做大五人格测试，针对性调整行为（如内向者刻意练习公开表达）；2. 记录性格引发的行为结果并复盘',
            theoretical_basis: '大五人格理论',
            talent_ratio: 70,
            acquired_training_ratio: 30,
            sort_order: 1,
          },
          {
            code: 'motivation',
            name: '动机',
            description: '驱动行为的内在需求（如成就动机、亲和动机）',
            definition: '驱动行为的内在需求（如成就动机、亲和动机）',
            performance_description: '追求成就、渴望社交',
            evaluation_points: '动机的强度、行动的持续性',
            training_strategies: '1. 设定梯度目标（如从完成小任务到挑战大项目）强化成就动机；2. 参与团队协作项目培养亲和动机',
            theoretical_basis: 'McClelland成就动机理论',
            talent_ratio: 50,
            acquired_training_ratio: 50,
            sort_order: 2,
          },
        ],
      },
    ],
  },
  {
    category: {
      code: 'core',
      name: '核心底层能力',
      description: '所有活动都需具备的通用能力，决定个人能力的成长上限',
      sort_order: 2,
    },
    dimensions: [
      {
        code: 'cognitive',
        name: '认知力',
        description: '认知能力',
        sort_order: 1,
        items: [
          {
            code: 'logical_thinking',
            name: '逻辑思维',
            description: '对事物因果、规律的分析与推导能力',
            definition: '对事物因果、规律的分析与推导能力',
            performance_description: '清晰拆解问题、识别逻辑漏洞',
            evaluation_points: '解题正确率、推理步骤清晰度',
            training_strategies: '1. 练习逻辑题（如三段论、因果链分析）；2. 用MECE原则拆解复杂问题',
            theoretical_basis: '逻辑学、批判性思维理论',
            talent_ratio: 30,
            acquired_training_ratio: 70,
            sort_order: 1,
          },
          {
            code: 'memory',
            name: '记忆力',
            description: '信息的存储与提取能力',
            definition: '信息的存储与提取能力',
            performance_description: '快速记住知识、精准提取记忆',
            evaluation_points: '记忆容量、提取速度',
            training_strategies: '1. 学习记忆宫殿法、艾宾浩斯复习法；2. 定期复习并关联新旧知识',
            theoretical_basis: '艾宾浩斯记忆曲线、认知心理学记忆理论',
            talent_ratio: 50,
            acquired_training_ratio: 50,
            sort_order: 2,
          },
          {
            code: 'focus',
            name: '专注力',
            description: '注意力的集中与抗干扰能力',
            definition: '注意力的集中与抗干扰能力',
            performance_description: '长时间专注任务、不受干扰',
            evaluation_points: '专注时长、任务完成度',
            training_strategies: '1. 练习冥想（如每天10分钟专注呼吸）；2. 用番茄工作法分段专注',
            theoretical_basis: '认知心理学注意力理论',
            talent_ratio: 35,
            acquired_training_ratio: 65,
            sort_order: 3,
          },
          {
            code: 'learning_ability',
            name: '学习力',
            description: '知识的吸收、迁移与应用能力',
            definition: '知识的吸收、迁移与应用能力',
            performance_description: '快速掌握新知识、跨领域应用',
            evaluation_points: '学习效率、知识迁移案例',
            training_strategies: '1. 用费曼技巧讲解知识；2. 学习跨领域知识并寻找关联点',
            theoretical_basis: '建构主义学习理论、迁移学习理论',
            talent_ratio: 20,
            acquired_training_ratio: 80,
            sort_order: 4,
          },
          {
            code: 'perception',
            name: '感知力',
            description: '五感及空间的敏锐感知与细节捕捉能力',
            definition: '五感及空间的敏锐感知与细节捕捉能力',
            performance_description: '分辨细微色彩/声音、空间想象',
            evaluation_points: '感官分辨度、空间建模准确度',
            training_strategies: '1. 练习感官聚焦（如闭眼听声辨位）；2. 玩空间类游戏（如魔方、密室逃脱）',
            theoretical_basis: '认知心理学感知觉理论',
            talent_ratio: 60,
            acquired_training_ratio: 40,
            sort_order: 5,
          },
        ],
      },
      {
        code: 'emotional_willpower',
        name: '情绪与意志能力',
        description: '情绪管理和意志力',
        sort_order: 2,
        items: [
          {
            code: 'eq',
            name: '情商',
            description: '情绪的识别、管理与共情能力',
            definition: '情绪的识别、管理与共情能力',
            performance_description: '识别自身/他人情绪、有效沟通',
            evaluation_points: '情绪调节速度、共情准确度',
            training_strategies: '1. 写情绪日记分析触发点；2. 练习换位思考（如模拟他人处境）',
            theoretical_basis: '情商理论（戈尔曼）',
            talent_ratio: 25,
            acquired_training_ratio: 75,
            sort_order: 1,
          },
          {
            code: 'patience',
            name: '耐心',
            description: '面对枯燥、复杂任务的耐受能力',
            definition: '面对枯燥、复杂任务的耐受能力',
            performance_description: '长期坚持复杂任务、不急躁',
            evaluation_points: '任务坚持时长、完成质量',
            training_strategies: '1. 设定长期目标并拆解为小步骤；2. 做需要耐心的事（如拼图、练字）',
            theoretical_basis: '意志心理学理论',
            talent_ratio: 15,
            acquired_training_ratio: 85,
            sort_order: 2,
          },
          {
            code: 'perseverance',
            name: '毅力',
            description: '面对困难、挫折的坚持能力',
            definition: '面对困难、挫折的坚持能力',
            performance_description: '失败后重启、长期追求目标',
            evaluation_points: '挫折恢复速度、目标完成率',
            training_strategies: '1. 设定有挑战的目标并复盘鼓励；2. 从失败案例中总结经验',
            theoretical_basis: '自我决定理论、坚毅理论（Duckworth）',
            talent_ratio: 15,
            acquired_training_ratio: 85,
            sort_order: 3,
          },
          {
            code: 'resilience',
            name: '抗挫力',
            description: '压力下的心理调适与恢复能力',
            definition: '压力下的心理调适与恢复能力',
            performance_description: '抗压不崩溃、快速恢复',
            evaluation_points: '压力应对策略、恢复时间',
            training_strategies: '1. 进行梯度挑战（如从低难度任务到高难度）；2. 学习压力管理技巧（如正念）',
            theoretical_basis: '心理韧性理论',
            talent_ratio: 20,
            acquired_training_ratio: 80,
            sort_order: 4,
          },
          {
            code: 'self_discipline',
            name: '自律性',
            description: '自我约束与习惯养成能力',
            definition: '自我约束与习惯养成能力',
            performance_description: '按时完成计划、抵制诱惑',
            evaluation_points: '计划完成率、习惯养成速度',
            training_strategies: '1. 用习惯堆叠法养成新习惯；2. 设计环境减少诱惑（如手机放远处）',
            theoretical_basis: '自我决定理论、习惯养成理论',
            talent_ratio: 10,
            acquired_training_ratio: 90,
            sort_order: 5,
          },
        ],
      },
      {
        code: 'meta',
        name: '元能力',
        description: '元认知和自我管理能力',
        sort_order: 3,
        items: [
          {
            code: 'self_awareness',
            name: '自我认知',
            description: '对自身优势、短板、需求的清晰认知',
            definition: '对自身优势、短板、需求的清晰认知',
            performance_description: '明确自身擅长/不足、职业定位',
            evaluation_points: '自我分析准确度、目标与优势匹配度',
            training_strategies: '1. 做SWOT分析并定期更新；2. 收集他人反馈并总结',
            theoretical_basis: '自我决定理论、OECD DeSeCo项目（自主行动能力）',
            talent_ratio: 15,
            acquired_training_ratio: 85,
            sort_order: 1,
          },
          {
            code: 'goal_management',
            name: '目标管理',
            description: '大目标拆解为可执行任务并推进的能力',
            definition: '大目标拆解为可执行任务并推进的能力',
            performance_description: '任务拆解合理、进度可控',
            evaluation_points: '目标完成率、任务拆解颗粒度',
            training_strategies: '1. 用SMART原则定目标；2. 用四象限法则排序任务',
            theoretical_basis: '目标管理理论、OECD DeSeCo项目（自主行动能力）',
            talent_ratio: 5,
            acquired_training_ratio: 95,
            sort_order: 2,
          },
          {
            code: 'review_iteration',
            name: '复盘迭代',
            description: '总结经验教训并优化行动的能力',
            definition: '总结经验教训并优化行动的能力',
            performance_description: '经验提炼有效、行动改进明显',
            evaluation_points: '复盘深度、改进效果',
            training_strategies: '1. 用复盘四步法（回顾目标-评估结果-分析原因-总结规律）；2. 写复盘日记',
            theoretical_basis: 'PDCA循环、OECD DeSeCo项目（自主行动能力）',
            talent_ratio: 5,
            acquired_training_ratio: 95,
            sort_order: 3,
          },
          {
            code: 'decision_making',
            name: '决策力',
            description: '基于信息分析快速做出合理选择的能力',
            definition: '基于信息分析快速做出合理选择的能力',
            performance_description: '决策逻辑清晰、结果满意度高',
            evaluation_points: '决策效率、结果满意度',
            training_strategies: '1. 学习决策矩阵（如 pros/cons 打分）；2. 模拟决策场景（如预算有限选产品）',
            theoretical_basis: '决策理论、OECD DeSeCo项目（自主行动能力）',
            talent_ratio: 20,
            acquired_training_ratio: 80,
            sort_order: 4,
          },
        ],
      },
    ],
  },
  {
    category: {
      code: 'specialized',
      name: '专项应用能力',
      description: '在特定领域或场景中应用的能力',
      sort_order: 3,
    },
    dimensions: [
      {
        code: 'professional_skills',
        name: '专业知识与技能',
        description: '专业知识与技能',
        sort_order: 1,
        items: [
          {
            code: 'science_ability',
            name: '科学领域能力',
            description: '科学学科的知识储备与研究能力',
            definition: '科学学科的知识储备与研究能力',
            performance_description: '掌握学科理论、开展实验/研究',
            evaluation_points: '知识掌握度、研究成果质量',
            training_strategies: '1. 系统学习学科教材；2. 参与科研项目或实验',
            theoretical_basis: '科学教育理论、学科能力模型',
            talent_ratio: 10,
            acquired_training_ratio: 90,
            sort_order: 1,
          },
          {
            code: 'humanities_ability',
            name: '人文领域能力',
            description: '人文社科的知识储备与分析能力',
            definition: '人文社科的知识储备与分析能力',
            performance_description: '理解社会现象、分析人文问题',
            evaluation_points: '知识广度、分析深度',
            training_strategies: '1. 阅读人文经典著作；2. 撰写社会现象分析文章',
            theoretical_basis: '人文社科研究方法',
            talent_ratio: 10,
            acquired_training_ratio: 90,
            sort_order: 2,
          },
          {
            code: 'technical_tool_ability',
            name: '技术工具能力',
            description: '专业技术工具的操作与应用能力',
            definition: '专业技术工具的操作与应用能力',
            performance_description: '熟练使用工具、解决技术问题',
            evaluation_points: '工具熟练度、问题解决效率',
            training_strategies: '1. 参加工具培训课程；2. 用工具完成实际项目',
            theoretical_basis: '技术技能习得理论',
            talent_ratio: 10,
            acquired_training_ratio: 90,
            sort_order: 3,
          },
          {
            code: 'art_ability',
            name: '艺术领域能力',
            description: '艺术创作、鉴赏的知识与技能',
            definition: '艺术创作、鉴赏的知识与技能',
            performance_description: '创作作品、鉴赏艺术',
            evaluation_points: '作品完成度、鉴赏准确度',
            training_strategies: '1. 系统学习艺术理论；2. 持续创作并寻求反馈',
            theoretical_basis: '艺术教育理论',
            talent_ratio: 30,
            acquired_training_ratio: 70,
            sort_order: 4,
          },
        ],
      },
      {
        code: 'practical_strategy',
        name: '实践与策略能力',
        description: '实践与策略能力',
        sort_order: 2,
        items: [
          {
            code: 'financial_quotient',
            name: '财商',
            description: '财务规划、投资决策的能力',
            definition: '财务规划、投资决策的能力',
            performance_description: '合理规划收支、投资收益可观',
            evaluation_points: '财务健康度、投资回报率',
            training_strategies: '1. 学习理财知识（如基金、股票基础）；2. 模拟投资并复盘',
            theoretical_basis: '财商教育理论',
            talent_ratio: 10,
            acquired_training_ratio: 90,
            sort_order: 1,
          },
          {
            code: 'strategy',
            name: '谋略',
            description: '竞争、合作中的策略制定与执行能力',
            definition: '竞争、合作中的策略制定与执行能力',
            performance_description: '策略有效性、应变能力',
            evaluation_points: '策略成功率、应变速度',
            training_strategies: '1. 学习博弈论基础；2. 参与模拟商战、团队竞赛',
            theoretical_basis: '博弈论、战略管理理论',
            talent_ratio: 20,
            acquired_training_ratio: 80,
            sort_order: 2,
          },
          {
            code: 'communication',
            name: '沟通表达',
            description: '信息传递、说服他人的能力',
            definition: '信息传递、说服他人的能力',
            performance_description: '表达清晰、说服力强',
            evaluation_points: '信息传递准确度、说服成功率',
            training_strategies: '1. 练习公众演讲；2. 学习非暴力沟通技巧',
            theoretical_basis: '沟通理论、说服心理学',
            talent_ratio: 15,
            acquired_training_ratio: 85,
            sort_order: 3,
          },
          {
            code: 'negotiation',
            name: '谈判协作',
            description: '谈判中的利益协调与团队协作能力',
            definition: '谈判中的利益协调与团队协作能力',
            performance_description: '谈判达成双赢、团队协作高效',
            evaluation_points: '谈判成果、团队任务完成率',
            training_strategies: '1. 参与模拟谈判；2. 学习团队协作方法（如敏捷管理）',
            theoretical_basis: '谈判理论、团队协作理论',
            talent_ratio: 15,
            acquired_training_ratio: 85,
            sort_order: 4,
          },
          {
            code: 'creativity',
            name: '创造力',
            description: '产生新颖、有价值想法的能力',
            definition: '产生新颖、有价值想法的能力',
            performance_description: '提出创新方案、创作新作品',
            evaluation_points: '想法新颖度、落地价值',
            training_strategies: '1. 练习头脑风暴、逆向思维；2. 跨领域融合知识（如科技+艺术）',
            theoretical_basis: '创造力理论（Amabile）、设计思维',
            talent_ratio: 30,
            acquired_training_ratio: 70,
            sort_order: 5,
          },
          {
            code: 'problem_solving',
            name: '问题解决能力',
            description: '分析并解决复杂问题的能力',
            definition: '分析并解决复杂问题的能力',
            performance_description: '问题拆解清晰、解决方案有效',
            evaluation_points: '问题解决效率、方案满意度',
            training_strategies: '1. 学习问题解决框架（如丰田5Why法）；2. 参与实际问题解决项目',
            theoretical_basis: '问题解决理论、设计思维',
            talent_ratio: 20,
            acquired_training_ratio: 80,
            sort_order: 6,
          },
        ],
      },
      {
        code: 'scenario_adaptation',
        name: '场景适配能力',
        description: '场景适配能力',
        sort_order: 3,
        items: [
          {
            code: 'workplace_execution',
            name: '职场执行能力',
            description: '职场任务的执行与结果交付能力',
            definition: '职场任务的执行与结果交付能力',
            performance_description: '任务完成质量、效率',
            evaluation_points: 'KPI达成率、同事评价',
            training_strategies: '1. 学习职场技能（如Excel高阶、PPT设计）；2. 主动承担项目并复盘',
            theoretical_basis: '职场能力模型',
            talent_ratio: 10,
            acquired_training_ratio: 90,
            sort_order: 1,
          },
          {
            code: 'project_management',
            name: '项目管理能力',
            description: '项目全流程的规划、执行与控制能力',
            definition: '项目全流程的规划、执行与控制能力',
            performance_description: '项目按时交付、质量达标',
            evaluation_points: '项目完成率、stakeholder满意度',
            training_strategies: '1. 学习项目管理知识（如PMP）；2. 主导小型项目并运用管理工具',
            theoretical_basis: '项目管理理论（PMBOK）',
            talent_ratio: 10,
            acquired_training_ratio: 90,
            sort_order: 2,
          },
          {
            code: 'entrepreneurship',
            name: '创业运营能力',
            description: '创业项目的运营、资源整合能力',
            definition: '创业项目的运营、资源整合能力',
            performance_description: '项目存活、盈利',
            evaluation_points: '用户增长、营收情况',
            training_strategies: '1. 学习创业知识（如精益创业）；2. 参与创业实践或模拟',
            theoretical_basis: '创业理论、精益创业',
            talent_ratio: 10,
            acquired_training_ratio: 90,
            sort_order: 3,
          },
          {
            code: 'learning_exam',
            name: '学习应试能力',
            description: '学习应试的技巧与策略应用能力',
            definition: '学习应试的技巧与策略应用能力',
            performance_description: '考试分数、学习效率',
            evaluation_points: '分数提升幅度、学习时间利用率',
            training_strategies: '1. 学习应试技巧（如答题策略、时间分配）；2. 模拟考试并分析错题',
            theoretical_basis: '教育测量学、学习策略理论',
            talent_ratio: 10,
            acquired_training_ratio: 90,
            sort_order: 4,
          },
        ],
      },
    ],
  },
];

async function importData() {
  const client = await pool.connect();
  try {
    // 设置 search_path
    await client.query('SET search_path TO pikun_db, public');

    console.log('开始导入能力模型数据...\n');

    // 遍历每个类别
    for (const categoryData of abilityData) {
      // 1. 创建类别（使用 ON CONFLICT 处理重复）
      const categoryResult = await client.query(
        `INSERT INTO pikun_db.ability_categories (code, name, description, sort_order)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (code) DO UPDATE SET
           name = EXCLUDED.name,
           description = EXCLUDED.description,
           sort_order = EXCLUDED.sort_order
         RETURNING category_id`,
        [
          categoryData.category.code,
          categoryData.category.name,
          categoryData.category.description,
          categoryData.category.sort_order,
        ]
      );
      const categoryId = categoryResult.rows[0].category_id;
      console.log(`✓ 创建类别: ${categoryData.category.name} (${categoryId})`);

      // 2. 遍历每个维度
      for (const dimensionData of categoryData.dimensions) {
        // 创建维度（使用 ON CONFLICT 处理重复）
        const dimensionResult = await client.query(
          `INSERT INTO pikun_db.ability_dimensions (category_id, code, name, description, sort_order)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (category_id, code) DO UPDATE SET
             name = EXCLUDED.name,
             description = EXCLUDED.description,
             sort_order = EXCLUDED.sort_order
           RETURNING dimension_id`,
          [
            categoryId,
            dimensionData.code,
            dimensionData.name,
            dimensionData.description,
            dimensionData.sort_order,
          ]
        );
        const dimensionId = dimensionResult.rows[0].dimension_id;
        console.log(`  ✓ 创建维度: ${dimensionData.name} (${dimensionId})`);

        // 3. 遍历每个能力项
        for (const itemData of dimensionData.items) {
          // 创建能力项（使用 ON CONFLICT 处理重复）
          await client.query(
            `INSERT INTO pikun_db.ability_items (
              dimension_id, code, name, description, definition, performance_description,
              evaluation_points, training_strategies, theoretical_basis,
              talent_ratio, acquired_training_ratio, sort_order
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            ON CONFLICT (dimension_id, code) DO UPDATE SET
              name = EXCLUDED.name,
              description = EXCLUDED.description,
              definition = EXCLUDED.definition,
              performance_description = EXCLUDED.performance_description,
              evaluation_points = EXCLUDED.evaluation_points,
              training_strategies = EXCLUDED.training_strategies,
              theoretical_basis = EXCLUDED.theoretical_basis,
              talent_ratio = EXCLUDED.talent_ratio,
              acquired_training_ratio = EXCLUDED.acquired_training_ratio,
              sort_order = EXCLUDED.sort_order`,
            [
              dimensionId,
              itemData.code,
              itemData.name,
              itemData.description,
              itemData.definition,
              itemData.performance_description,
              itemData.evaluation_points,
              itemData.training_strategies,
              itemData.theoretical_basis,
              itemData.talent_ratio,
              itemData.acquired_training_ratio,
              itemData.sort_order,
            ]
          );
          console.log(`    ✓ 创建能力项: ${itemData.name}`);
        }
      }
      console.log('');
    }

    console.log('数据导入完成！');
  } catch (error) {
    console.error('导入过程中出错:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function ensureColumnsExist() {
  const client = await pool.connect();
  try {
    await client.query('SET search_path TO pikun_db, public');
    console.log('检查并添加必要字段...\n');

    // 检查 talent_ratio 字段是否存在
    const checkTalentRatio = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'pikun_db' 
      AND table_name = 'ability_items' 
      AND column_name = 'talent_ratio'
    `);

    if (checkTalentRatio.rows.length === 0) {
      console.log('添加 talent_ratio 和 acquired_training_ratio 字段...');
      await client.query(`
        ALTER TABLE pikun_db.ability_items
        ADD COLUMN talent_ratio DECIMAL(5,2) DEFAULT 50.00 CHECK (talent_ratio >= 0 AND talent_ratio <= 100),
        ADD COLUMN acquired_training_ratio DECIMAL(5,2) DEFAULT 50.00 CHECK (acquired_training_ratio >= 0 AND acquired_training_ratio <= 100)
      `);
      
      // 添加约束：确保两者之和等于 100
      await client.query(`
        ALTER TABLE pikun_db.ability_items
        ADD CONSTRAINT check_talent_ratio_sum CHECK (talent_ratio + acquired_training_ratio = 100)
      `);
      
      // 为现有数据设置默认值
      await client.query(`
        UPDATE pikun_db.ability_items
        SET talent_ratio = 50.00, acquired_training_ratio = 50.00
        WHERE talent_ratio IS NULL OR acquired_training_ratio IS NULL
      `);
      console.log('✓ 字段添加完成\n');
    } else {
      console.log('✓ 字段已存在\n');
    }
  } catch (error) {
    console.error('检查字段过程中出错:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function checkTableExists(client: any, tableName: string): Promise<boolean> {
  const result = await client.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'pikun_db' 
      AND table_name = $1
    )
  `, [tableName]);
  return result.rows[0].exists;
}

async function clearData() {
  const client = await pool.connect();
  try {
    await client.query('SET search_path TO pikun_db, public');
    console.log('开始清空现有数据...\n');

    // 检查表是否存在，如果不存在则跳过
    const tables = [
      { name: 'user_ability_experience_logs', label: '用户经验记录' },
      { name: 'user_ability_levels', label: '用户能力等级' },
      { name: 'ability_item_level_configs', label: '能力项等级配置' },
      { name: 'ability_items', label: '能力项' },
      { name: 'ability_dimensions', label: '能力维度' },
      { name: 'ability_categories', label: '能力类别' },
    ];

    for (const table of tables) {
      const exists = await checkTableExists(client, table.name);
      if (exists) {
        await client.query(`DELETE FROM pikun_db.${table.name}`);
        console.log(`✓ 清空${table.label}`);
      } else {
        console.log(`⚠ 表 ${table.name} 不存在，跳过清空`);
      }
    }

    console.log('\n数据清空完成！\n');
  } catch (error) {
    console.error('清空数据过程中出错:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function checkTablesExist(): Promise<boolean> {
  const client = await pool.connect();
  try {
    await client.query('SET search_path TO pikun_db, public');
    
    const requiredTables = [
      'ability_categories',
      'ability_dimensions',
      'ability_items',
    ];

    for (const tableName of requiredTables) {
      const exists = await checkTableExists(client, tableName);
      if (!exists) {
        console.error(`\n❌ 错误: 表 ${tableName} 不存在！`);
        console.error('请先运行数据库初始化脚本：');
        console.error('  cd apps/server');
        console.error('  ./scripts/init_ability_database.sh');
        return false;
      }
    }

    return true;
  } finally {
    client.release();
  }
}

async function main() {
  try {
    // 先检查表是否存在
    console.log('检查数据库表...\n');
    const tablesExist = await checkTablesExist();
    if (!tablesExist) {
      process.exit(1);
    }
    console.log('✓ 数据库表检查通过\n');

    // 确保字段存在
    await ensureColumnsExist();

    // 再清空数据
    await clearData();

    // 最后导入新数据
    await importData();

    console.log('\n所有操作完成！');
  } catch (error) {
    console.error('执行失败:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// 执行主函数
main();
