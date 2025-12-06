import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { injectable, inject } from 'tsyringe';
import { SubjectService } from '@/services/subject.service';
import { KnowledgePointService } from '@/services/knowledge-point.service';
import { FoundationalAbilityService } from '@/services/foundational-ability.service';
import { SubjectDomainService } from '@/services/subject-domain.service';

/**
 * 学科控制器
 */
@injectable()
export class SubjectController {
  constructor(
    @inject(SubjectService) private subjectService: SubjectService,
    @inject(KnowledgePointService) private knowledgePointService: KnowledgePointService,
    @inject(FoundationalAbilityService)
    private foundationalAbilityService: FoundationalAbilityService,
    @inject(SubjectDomainService) private subjectDomainService: SubjectDomainService
  ) {}

  /**
   * 获取学科分类树形结构
   */
  async getCategoryTree(req: NextRequest): Promise<NextResponse> {
    try {
      const tree = await this.subjectService.getCategoryTree();
      return NextResponse.json({
        success: true,
        data: tree,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get category tree',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取学科分类列表
   */
  async getCategories(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const parentId = searchParams.get('parent_id');
      const current = parseInt(searchParams.get('current') || '1', 10);
      const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
      const keyword = searchParams.get('keyword') || undefined;

      let result;
      // 如果 parentId 是 'null' 字符串或 null，查询顶级分类（支持分页和搜索）
      if (parentId === 'null' || parentId === null) {
        result = await this.subjectService.getCategoriesByParentId(null, {
          current,
          pageSize,
          keyword,
        });
      } else if (parentId) {
        // 如果 parentId 有值，查询指定父分类的子分类（支持分页和搜索）
        result = await this.subjectService.getCategoriesByParentId(parentId, {
          current,
          pageSize,
          keyword,
        });
      } else {
        // 如果没有传递 parentId，查询所有分类（不分页，用于下拉选择等场景）
        const categories = await this.subjectService.getCategories();
        return NextResponse.json({
          success: true,
          data: categories,
          pagination: {
            current: 1,
            pageSize: categories.length,
            total: categories.length,
          },
        });
      }

      return NextResponse.json({
        success: true,
        data: result.categories,
        pagination: {
          current,
          pageSize,
          total: result.total,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get categories',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取分类的直接子分类（用于树懒加载）
   */
  async getCategoryChildren(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const parentId = searchParams.get('parent_id');
      const children = await this.subjectService.getCategoryChildren(
        parentId === 'null' ? null : parentId
      );
      return NextResponse.json({
        success: true,
        data: children,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get category children',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取学科分类详情
   */
  async getCategoryById(req: NextRequest, categoryId: string): Promise<NextResponse> {
    try {
      const category = await this.subjectService.getCategoryById(categoryId);
      if (!category) {
        return NextResponse.json(
          {
            success: false,
            message: 'Category not found',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get category',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 创建学科分类
   */
  async createCategory(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        parent_id: z.string().nullable().optional(),
        code: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        icon_url: z.string().optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const category = await this.subjectService.createCategory(validatedData);

      return NextResponse.json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to create category',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 更新学科分类
   */
  async updateCategory(req: NextRequest, categoryId: string): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        parent_id: z.string().nullable().optional(),
        code: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        icon_url: z.string().optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const category = await this.subjectService.updateCategory(categoryId, validatedData);

      return NextResponse.json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to update category',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 删除学科分类
   */
  async deleteCategory(req: NextRequest, categoryId: string): Promise<NextResponse> {
    try {
      await this.subjectService.deleteCategory(categoryId);
      return NextResponse.json({
        success: true,
        message: 'Category deleted successfully',
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to delete category',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 获取学科列表
   */
  async getSubjects(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const categoryId = searchParams.get('category_id');
      const current = parseInt(searchParams.get('current') || '1', 10);
      const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
      const keyword = searchParams.get('keyword') || undefined;

      let result;
      if (categoryId) {
        result = await this.subjectService.getSubjectsByCategoryId(categoryId, {
          current,
          pageSize,
          keyword,
        });
      } else {
        // 如果没有 categoryId，查询所有学科（支持分页和搜索）
        result = await this.subjectService.getSubjectsByCategoryId(null, {
          current,
          pageSize,
          keyword,
        });
      }

      return NextResponse.json({
        success: true,
        data: result.subjects,
        pagination: {
          current,
          pageSize,
          total: result.total,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get subjects',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取学科详情
   */
  async getSubjectById(req: NextRequest, subjectId: string): Promise<NextResponse> {
    try {
      const subject = await this.subjectService.getSubjectById(subjectId);
      if (!subject) {
        return NextResponse.json(
          {
            success: false,
            message: 'Subject not found',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: subject,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get subject',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 创建学科
   */
  async createSubject(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        category_id: z.string().min(1),
        code: z.string().min(1),
        name: z.string().min(1),
        short_name: z.string().optional(),
        icon_url: z.string().optional(),
        cover_image_url: z.string().optional(),
        sort_order: z.number().optional(),
        is_published: z.boolean().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const subject = await this.subjectService.createSubject(validatedData);

      return NextResponse.json({
        success: true,
        data: subject,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to create subject',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 更新学科
   */
  async updateSubject(req: NextRequest, subjectId: string): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        category_id: z.string().optional(),
        code: z.string().optional(),
        name: z.string().optional(),
        short_name: z.string().optional(),
        icon_url: z.string().optional(),
        cover_image_url: z.string().optional(),
        sort_order: z.number().optional(),
        is_published: z.boolean().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const subject = await this.subjectService.updateSubject(subjectId, validatedData);

      return NextResponse.json({
        success: true,
        data: subject,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to update subject',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 删除学科
   */
  async deleteSubject(req: NextRequest, subjectId: string): Promise<NextResponse> {
    try {
      await this.subjectService.deleteSubject(subjectId);
      return NextResponse.json({
        success: true,
        message: 'Subject deleted successfully',
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to delete subject',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 获取学科详情信息
   */
  async getSubjectDetail(req: NextRequest, subjectId: string): Promise<NextResponse> {
    try {
      const detail = await this.subjectService.getSubjectDetail(subjectId);
      return NextResponse.json({
        success: true,
        data: detail,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get subject detail',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 创建或更新学科详情
   */
  async upsertSubjectDetail(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        subject_id: z.string().min(1),
        definition: z.string().optional(),
        description: z.string().optional(),
        purpose: z.string().optional(),
        value: z.string().optional(),
        application_scenarios: z.string().optional(),
        learning_objectives: z.string().optional(),
        prerequisites: z.string().optional(),
        related_subjects: z.array(z.string()).optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const detail = await this.subjectService.upsertSubjectDetail(validatedData);

      return NextResponse.json({
        success: true,
        data: detail,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to upsert subject detail',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 创建学科依赖关系
   */
  async createDependency(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        subject_id: z.string().min(1),
        prerequisite_subject_id: z.string().min(1),
        dependency_type: z.enum(['required', 'recommended']),
      });

      const validatedData = schema.parse(body);
      const dependency = await this.subjectService.createDependency(validatedData);

      return NextResponse.json({
        success: true,
        data: dependency,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to create dependency',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 删除学科依赖关系
   */
  async deleteDependency(req: NextRequest, dependencyId: string): Promise<NextResponse> {
    try {
      await this.subjectService.deleteDependency(dependencyId);
      return NextResponse.json({
        success: true,
        message: 'Dependency deleted successfully',
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to delete dependency',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 获取学科的依赖关系
   */
  async getSubjectDependencies(req: NextRequest, subjectId: string): Promise<NextResponse> {
    try {
      const dependencies = await this.subjectService.getSubjectDependencies(subjectId);
      return NextResponse.json({
        success: true,
        data: dependencies,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get dependencies',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取知识地图数据
   */
  async getKnowledgeMap(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const categoryId = searchParams.get('category_id') || undefined;
      const mapData = await this.subjectService.getKnowledgeMap(categoryId || null);
      return NextResponse.json({
        success: true,
        data: mapData,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get knowledge map',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取分层知识地图数据（按层级返回）
   * Query参数：
   * - level: 层级（0=顶级分类, 1=学科, 2=知识点, 3=子知识点）
   * - parent_id: 父节点ID（可选，用于获取指定父节点下的子节点）
   * - category_id: 分类ID（可选，用于筛选）
   *
   * 返回规则：
   * - Level -1: 返回基础能力
   * - Level 0: 返回学科门类
   * - Level 1: 返回一级学科分类（如果 parent_id 是学科门类，返回该门类下的一级分类）
   * - Level 2: 返回学科（如果 parent_id 是一级分类，返回该分类下的学科）
   * - Level 3: 返回知识点（如果 parent_id 是学科，返回该学科的顶级知识点）
   * - Level 4: 返回子知识点（如果 parent_id 是知识点，返回该知识点的子知识点）
   */
  async getHierarchicalKnowledgeMap(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const levelParam = searchParams.get('level');
      const parentId = searchParams.get('parent_id') || undefined;
      const categoryId = searchParams.get('category_id') || undefined;

      const level = levelParam ? parseInt(levelParam, 10) : 0;

      // Level -1: 返回基础能力
      if (level === -1) {
        const abilities = await this.foundationalAbilityService.getAllAbilities();
        const nodes = abilities.map((ability) => ({
          id: `ability_${ability.ability_id}`,
          name: ability.name,
          code: ability.code,
          level: -1 as const,
          description: ability.description || undefined,
        }));

        // 获取基础能力之间的依赖关系
        // TODO: 需要创建 FoundationalAbilityDependencyDAO
        const edges: Array<{
          id: string;
          source: string;
          target: string;
          type: 'required' | 'recommended';
        }> = [];

        return NextResponse.json({
          success: true,
          data: { nodes, edges },
        });
      }

      // Level 0: 返回学科门类（而不是顶级分类）
      if (level === 0) {
        const domains = await this.subjectDomainService.getAllDomains();
        const nodes = domains.map((domain) => ({
          id: `domain_${domain.domain_id}`,
          name: domain.name,
          code: domain.code,
          level: 0 as const,
          description: domain.description || undefined,
        }));

        // 获取基础能力到学科门类的依赖关系
        const edges: Array<{
          id: string;
          source: string;
          target: string;
          type: 'required' | 'recommended';
        }> = [];

        // 为每个学科门类查找需要的基础能力创建边
        for (const domain of domains) {
          const requiredAbilities =
            await this.subjectDomainService.getFoundationalAbilitiesByDomainId(domain.domain_id);
          for (const ability of requiredAbilities) {
            edges.push({
              id: `edge_ability_${ability.ability_id}_domain_${domain.domain_id}`,
              source: `ability_${ability.ability_id}`,
              target: `domain_${domain.domain_id}`,
              type: ability.requirement_type,
            });
          }
        }

        return NextResponse.json({
          success: true,
          data: { nodes, edges },
        });
      }

      // Level 1: 返回一级学科分类（属于某个学科门类）
      if (level === 1) {
        if (!parentId || !parentId.startsWith('domain_')) {
          return NextResponse.json({
            success: true,
            data: { nodes: [], edges: [] },
          });
        }

        // 如果 parent_id 是学科门类，返回该门类下的一级学科分类
        const actualDomainId = parentId.replace('domain_', '');
        
        // 获取父节点（学科门类）信息
        const parentDomain = await this.subjectDomainService.getDomainById(actualDomainId);
        if (!parentDomain) {
          return NextResponse.json({
            success: true,
            data: { nodes: [], edges: [] },
          });
        }

        // 获取该门类下的一级学科分类
        const categories = await this.subjectDomainService.getCategoriesByDomainId(actualDomainId);

        // 构建节点：包含父节点和子节点
        const nodes = [
          // 父节点（学科门类）
          {
            id: parentId,
            name: parentDomain.name,
            code: parentDomain.code,
            level: 0 as const,
            description: parentDomain.description || undefined,
          },
          // 子节点（一级学科分类）
          ...categories.map((category) => ({
            id: `category_${category.category_id}`,
            name: category.name,
            code: category.code,
            level: 1 as const,
            parentId: parentId,
          })),
        ];

        // 创建从父节点到各个子节点的边
        const edges: Array<{
          id: string;
          source: string;
          target: string;
          type: 'required' | 'recommended';
        }> = categories.map((category) => ({
          id: `edge_domain_${actualDomainId}_category_${category.category_id}`,
          source: parentId,
          target: `category_${category.category_id}`,
          type: 'required' as const, // 学科门类到分类的关系是必需的
        }));

        return NextResponse.json({
          success: true,
          data: { nodes, edges },
        });
      }

      // Level 2: 返回学科（属于某个一级分类）
      if (level === 2) {
        let subjects;
        let parentCategory = null;
        
        if (parentId && parentId.startsWith('category_')) {
          // 如果 parent_id 是分类，返回该分类下的学科
          const actualCategoryId = parentId.replace('category_', '');
          
          // 获取父节点（分类）信息
          parentCategory = await this.subjectService.getCategoryById(actualCategoryId);
          if (!parentCategory) {
            return NextResponse.json({
              success: true,
              data: { nodes: [], edges: [] },
            });
          }
          
          const result = await this.subjectService.getSubjectsByCategoryId(actualCategoryId, {
            current: 1,
            pageSize: 10000,
          });
          subjects = result.subjects;
        } else if (categoryId) {
          // 如果指定了 category_id，返回该分类下的学科
          const result = await this.subjectService.getSubjectsByCategoryId(categoryId, {
            current: 1,
            pageSize: 10000,
          });
          subjects = result.subjects;
        } else {
          // 返回所有学科（无父节点）
          subjects = await this.subjectService.getSubjects();
        }

        // 构建节点：如果有父节点，包含父节点和子节点；否则只包含子节点
        const nodes = parentCategory && parentId
          ? [
              // 父节点（分类）
              {
                id: parentId,
                name: parentCategory.name,
                code: parentCategory.code,
                level: 1 as const,
                description: parentCategory.description || undefined,
              },
              // 子节点（学科）
              ...subjects.map((subject) => ({
                id: subject.subject_id,
                name: subject.name,
                code: subject.code,
                level: 2 as const,
                parentId: parentId,
              })),
            ]
          : subjects.map((subject) => ({
              id: subject.subject_id,
              name: subject.name,
              code: subject.code,
              level: 2 as const,
              parentId: parentId || undefined,
            }));

        // 获取学科之间的依赖关系
        const mapData = await this.subjectService.getKnowledgeMap(
          parentCategory ? parentCategory.category_id : categoryId || null
        );
        const subjectIdSet = new Set(subjects.map((s) => s.subject_id));
        const dependencyEdges = mapData.edges.filter(
          (edge) => subjectIdSet.has(edge.source) && subjectIdSet.has(edge.target)
        );

        // 创建从父节点到各个子节点的边（如果有父节点）
        const parentChildEdges: Array<{
          id: string;
          source: string;
          target: string;
          type: 'required' | 'recommended';
        }> =
          parentCategory && parentId
            ? subjects.map((subject) => ({
                id: `edge_category_${parentCategory!.category_id}_subject_${subject.subject_id}`,
                source: parentId,
                target: subject.subject_id,
                type: 'required' as const, // 分类到学科的关系是必需的
              }))
            : [];

        // 合并边：父节点到子节点的边 + 学科之间的依赖边
        const edges = [...parentChildEdges, ...dependencyEdges];

        return NextResponse.json({
          success: true,
          data: { nodes, edges },
        });
      }

      // Level 3: 返回知识点（顶级知识点，parent_point_id 为 NULL）
      if (level === 3) {
        if (!parentId || parentId.startsWith('category_')) {
          return NextResponse.json({
            success: true,
            data: { nodes: [], edges: [] },
          });
        }

        // parent_id 应该是学科ID，获取父节点（学科）信息
        const parentSubject = await this.subjectService.getSubjectById(parentId);
        if (!parentSubject) {
          return NextResponse.json({
            success: true,
            data: { nodes: [], edges: [] },
          });
        }

        // 获取该学科下的顶级知识点
        const result = await this.knowledgePointService.getPointsBySubjectId(parentId, null, {
          current: 1,
          pageSize: 10000,
        });

        // 构建节点：包含父节点和子节点
        const nodes = [
          // 父节点（学科）
          {
            id: parentId,
            name: parentSubject.name,
            code: parentSubject.code,
            level: 2 as const,
          },
          // 子节点（知识点）
          ...result.points.map((point) => ({
            id: point.point_id,
            name: point.name,
            code: point.code,
            level: 3 as const,
            parentId: parentId,
            description: point.description || undefined,
            difficulty: point.difficulty,
            estimatedTime: point.estimated_time || undefined,
          })),
        ];

        // 获取知识点之间的依赖关系
        const allDependencies = await this.knowledgePointService.getAllDependencies();
        const pointIdSet = new Set(result.points.map((p) => p.point_id));
        const dependencyEdges = allDependencies
          .filter((d) => pointIdSet.has(d.point_id) && pointIdSet.has(d.prerequisite_point_id))
          .map((d) => ({
            id: d.dependency_id,
            source: d.prerequisite_point_id,
            target: d.point_id,
            type: d.dependency_type,
          }));

        // 创建从父节点到各个子节点的边
        const parentChildEdges: Array<{
          id: string;
          source: string;
          target: string;
          type: 'required' | 'recommended';
        }> = result.points.map((point) => ({
          id: `edge_subject_${parentId}_point_${point.point_id}`,
          source: parentId,
          target: point.point_id,
          type: 'required' as const, // 学科到知识点的关系是必需的
        }));

        // 合并边：父节点到子节点的边 + 知识点之间的依赖边
        const edges = [...parentChildEdges, ...dependencyEdges];

        return NextResponse.json({
          success: true,
          data: { nodes, edges },
        });
      }

      // Level 4: 返回子知识点
      if (level === 4) {
        if (!parentId) {
          return NextResponse.json({
            success: true,
            data: { nodes: [], edges: [] },
          });
        }

        // 先找到 parent_id 对应的知识点（父节点），获取其 subject_id
        const parentPoint = await this.knowledgePointService.getPointById(parentId);
        if (!parentPoint) {
          return NextResponse.json({
            success: true,
            data: { nodes: [], edges: [] },
          });
        }

        // 获取该知识点下的子知识点
        const result = await this.knowledgePointService.getPointsBySubjectId(
          parentPoint.subject_id,
          parentId,
          {
            current: 1,
            pageSize: 10000,
          }
        );

        // 构建节点：包含父节点和子节点
        const nodes = [
          // 父节点（知识点）
          {
            id: parentId,
            name: parentPoint.name,
            code: parentPoint.code,
            level: 3 as const,
            description: parentPoint.description || undefined,
            difficulty: parentPoint.difficulty,
            estimatedTime: parentPoint.estimated_time || undefined,
          },
          // 子节点（子知识点）
          ...result.points.map((point) => ({
            id: point.point_id,
            name: point.name,
            code: point.code,
            level: 4 as const,
            parentId: parentId,
            description: point.description || undefined,
            difficulty: point.difficulty,
            estimatedTime: point.estimated_time || undefined,
          })),
        ];

        // 获取知识点之间的依赖关系
        const allDependencies = await this.knowledgePointService.getAllDependencies();
        const pointIdSet = new Set(result.points.map((p) => p.point_id));
        const dependencyEdges = allDependencies
          .filter((d) => pointIdSet.has(d.point_id) && pointIdSet.has(d.prerequisite_point_id))
          .map((d) => ({
            id: d.dependency_id,
            source: d.prerequisite_point_id,
            target: d.point_id,
            type: d.dependency_type,
          }));

        // 创建从父节点到各个子节点的边
        const parentChildEdges: Array<{
          id: string;
          source: string;
          target: string;
          type: 'required' | 'recommended';
        }> = result.points.map((point) => ({
          id: `edge_point_${parentId}_point_${point.point_id}`,
          source: parentId,
          target: point.point_id,
          type: 'required' as const, // 知识点到子知识点的关系是必需的
        }));

        // 合并边：父节点到子节点的边 + 知识点之间的依赖边
        const edges = [...parentChildEdges, ...dependencyEdges];

        return NextResponse.json({
          success: true,
          data: { nodes, edges },
        });
      }

      return NextResponse.json({
        success: true,
        data: { nodes: [], edges: [] },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get hierarchical knowledge map',
        },
        { status: 500 }
      );
    }
  }
}
