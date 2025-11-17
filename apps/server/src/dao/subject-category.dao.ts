import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { SubjectCategory } from '@/entities';

/**
 * 学科分类 DAO
 * 负责学科分类相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('SubjectCategoryDAO')
export class SubjectCategoryDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 获取所有学科分类（未删除）
   */
  async findAll(): Promise<SubjectCategory[]> {
    const result = await this.db.query<SubjectCategory>(
      'SELECT * FROM pikun_db.subject_categories WHERE deleted_at IS NULL ORDER BY level ASC, sort_order ASC, code ASC',
      []
    );
    return result.rows;
  }

  /**
   * 获取树形结构的学科分类
   */
  async findTree(): Promise<Array<SubjectCategory & { children?: SubjectCategory[] }>> {
    const all = await this.findAll();
    return this.buildTree(all);
  }

  /**
   * 构建树形结构
   */
  private buildTree(categories: SubjectCategory[]): Array<SubjectCategory & { children?: SubjectCategory[] }> {
    const map = new Map<string, SubjectCategory & { children?: SubjectCategory[] }>();
    const roots: Array<SubjectCategory & { children?: SubjectCategory[] }> = [];

    // 创建映射
    categories.forEach((cat) => {
      map.set(cat.category_id, { ...cat, children: [] });
    });

    // 构建树
    categories.forEach((cat) => {
      const node = map.get(cat.category_id)!;
      if (cat.parent_id) {
        const parent = map.get(cat.parent_id);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  /**
   * 根据 ID 查找学科分类
   */
  async findById(categoryId: string): Promise<SubjectCategory | null> {
    const result = await this.db.query<SubjectCategory>(
      'SELECT * FROM pikun_db.subject_categories WHERE category_id = $1 AND deleted_at IS NULL',
      [categoryId]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据代码查找学科分类
   */
  async findByCode(code: string): Promise<SubjectCategory | null> {
    const result = await this.db.query<SubjectCategory>(
      'SELECT * FROM pikun_db.subject_categories WHERE code = $1 AND deleted_at IS NULL',
      [code]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据父分类 ID 查找子分类（支持分页和搜索）
   */
  async findByParentId(
    parentId: string | null,
    options?: { current?: number; pageSize?: number; keyword?: string }
  ): Promise<{ categories: SubjectCategory[]; total: number }> {
    const current = options?.current || 1;
    const pageSize = options?.pageSize || 20;
    const offset = (current - 1) * pageSize;
    const keyword = options?.keyword?.trim();

    let countQuery: string;
    let listQuery: string;
    const params: any[] = [];
    let paramIndex = 1;
    const keywordCondition = keyword ? ` AND (name ILIKE $${paramIndex} OR code ILIKE $${paramIndex})` : '';
    const keywordParam = keyword ? `%${keyword}%` : null;

    if (parentId === null) {
      const baseCondition = 'parent_id IS NULL AND deleted_at IS NULL';
      countQuery = `SELECT COUNT(*) as count FROM pikun_db.subject_categories WHERE ${baseCondition}${keywordCondition}`;
      listQuery = `SELECT 
        sc.*,
        (SELECT COUNT(*) FROM pikun_db.subject_categories WHERE parent_id = sc.category_id AND deleted_at IS NULL) as children_count
      FROM pikun_db.subject_categories sc
      WHERE ${baseCondition}${keywordCondition} ORDER BY sc.sort_order ASC, sc.code ASC LIMIT $${paramIndex + (keyword ? 1 : 0)} OFFSET $${paramIndex + (keyword ? 2 : 1)}`;
      if (keyword) {
        params.push(keywordParam, pageSize, offset);
      } else {
        params.push(pageSize, offset);
      }
    } else {
      const baseCondition = 'parent_id = $1 AND deleted_at IS NULL';
      countQuery = `SELECT COUNT(*) as count FROM pikun_db.subject_categories WHERE ${baseCondition}${keywordCondition.replace(/\$\d+/, `$${paramIndex + 1}`)}`;
      listQuery = `SELECT 
        sc.*,
        (SELECT COUNT(*) FROM pikun_db.subject_categories WHERE parent_id = sc.category_id AND deleted_at IS NULL) as children_count
      FROM pikun_db.subject_categories sc
      WHERE ${baseCondition}${keywordCondition.replace(/\$\d+/, `$${paramIndex + 1}`)} ORDER BY sc.sort_order ASC, sc.code ASC LIMIT $${paramIndex + (keyword ? 2 : 1)} OFFSET $${paramIndex + (keyword ? 3 : 2)}`;
      params.push(parentId);
      if (keyword) {
        params.push(keywordParam, pageSize, offset);
      } else {
        params.push(pageSize, offset);
      }
    }

    const countParams = parentId === null ? (keyword ? [keywordParam] : []) : (keyword ? [parentId, keywordParam] : [parentId]);
    const countResult = await this.db.query<{ count: string }>(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count, 10);

    const result = await this.db.query<SubjectCategory & { children_count?: number }>(listQuery, params);

    return {
      categories: result.rows,
      total,
    };
  }

  /**
   * 根据父分类 ID 查找直接子分类（不分页，用于树懒加载）
   * 同时返回每个分类的子分类数量
   */
  async findChildrenByParentId(parentId: string | null): Promise<SubjectCategory[]> {
    // 当 parentId 为 null 时，需要使用 IS NULL 查询
    const query = parentId === null
      ? `SELECT 
          sc.*,
          (SELECT COUNT(*) FROM pikun_db.subject_categories WHERE parent_id = sc.category_id AND deleted_at IS NULL) as children_count
        FROM pikun_db.subject_categories sc
        WHERE sc.parent_id IS NULL AND sc.deleted_at IS NULL 
        ORDER BY sc.sort_order ASC, sc.code ASC`
      : `SELECT 
          sc.*,
          (SELECT COUNT(*) FROM pikun_db.subject_categories WHERE parent_id = sc.category_id AND deleted_at IS NULL) as children_count
        FROM pikun_db.subject_categories sc
        WHERE sc.parent_id = $1 AND sc.deleted_at IS NULL 
        ORDER BY sc.sort_order ASC, sc.code ASC`;
    
    const params = parentId === null ? [] : [parentId];
    const result = await this.db.query<SubjectCategory & { children_count?: number }>(query, params);
    return result.rows;
  }

  /**
   * 创建学科分类
   */
  async create(data: {
    parent_id?: string | null;
    code: string;
    name: string;
    description?: string;
    icon_url?: string;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<SubjectCategory> {
    // 如果 parent_id 为空字符串，转换为 NULL
    const parentId = data.parent_id === '' || data.parent_id === undefined ? null : data.parent_id;
    
    const result = await this.db.query<SubjectCategory>(
      `INSERT INTO pikun_db.subject_categories (parent_id, code, name, description, icon_url, sort_order, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        parentId,
        data.code,
        data.name,
        data.description || null,
        data.icon_url || null,
        data.sort_order || 0,
        JSON.stringify(data.metadata || {}),
      ]
    );
    return result.rows[0];
  }

  /**
   * 更新学科分类
   */
  async update(
    categoryId: string,
    updates: {
      parent_id?: string | null;
      code?: string;
      name?: string;
      description?: string;
      icon_url?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<SubjectCategory> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.parent_id !== undefined) {
      // 如果 parent_id 为空字符串，转换为 NULL
      const parentId = updates.parent_id === '' ? null : updates.parent_id;
      fields.push(`parent_id = $${paramIndex++}`);
      values.push(parentId);
    }
    if (updates.code !== undefined) {
      fields.push(`code = $${paramIndex++}`);
      values.push(updates.code);
    }
    if (updates.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(updates.name);
    }
    if (updates.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(updates.description);
    }
    if (updates.icon_url !== undefined) {
      fields.push(`icon_url = $${paramIndex++}`);
      values.push(updates.icon_url);
    }
    if (updates.sort_order !== undefined) {
      fields.push(`sort_order = $${paramIndex++}`);
      values.push(updates.sort_order);
    }
    if (updates.metadata !== undefined) {
      fields.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) {
      return this.findById(categoryId) as Promise<SubjectCategory>;
    }

    values.push(categoryId);
    const result = await this.db.query<SubjectCategory>(
      `UPDATE pikun_db.subject_categories SET ${fields.join(', ')} WHERE category_id = $${paramIndex} AND deleted_at IS NULL
       RETURNING *`,
      values
    );
    return result.rows[0];
  }

  /**
   * 删除学科分类（软删除）
   */
  async delete(categoryId: string): Promise<void> {
    await this.db.query(
      'UPDATE pikun_db.subject_categories SET deleted_at = CURRENT_TIMESTAMP WHERE category_id = $1',
      [categoryId]
    );
  }
}

