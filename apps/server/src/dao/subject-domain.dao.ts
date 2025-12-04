import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';

/**
 * 学科门类实体
 */
export interface SubjectDomain {
  domain_id: string;
  code: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 学科门类 DAO
 */
@Injectable('SubjectDomainDAO')
export class SubjectDomainDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 获取所有学科门类
   */
  async findAll(): Promise<SubjectDomain[]> {
    const result = await this.db.query<SubjectDomain>(
      'SELECT * FROM pikun_db.subject_domains WHERE deleted_at IS NULL ORDER BY sort_order ASC, created_at ASC',
      []
    );
    return result.rows;
  }

  /**
   * 根据ID查找学科门类
   */
  async findById(domainId: string): Promise<SubjectDomain | null> {
    const result = await this.db.query<SubjectDomain>(
      'SELECT * FROM pikun_db.subject_domains WHERE domain_id = $1 AND deleted_at IS NULL',
      [domainId]
    );
    return result.rows[0] || null;
  }

  /**
   * 获取学科门类下的一级学科分类
   */
  async getCategoriesByDomainId(domainId: string): Promise<Array<{
    category_id: string;
    name: string;
    code: string;
    sort_order: number;
  }>> {
    const result = await this.db.query<{
      category_id: string;
      name: string;
      code: string;
      sort_order: number;
    }>(
      `SELECT 
        c.category_id,
        c.name,
        c.code,
        dcm.sort_order
      FROM pikun_db.domain_category_mappings dcm
      INNER JOIN pikun_db.subject_categories c ON dcm.category_id = c.category_id
      WHERE dcm.domain_id = $1 AND c.deleted_at IS NULL
      ORDER BY dcm.sort_order ASC, c.sort_order ASC`,
      [domainId]
    );
    return result.rows;
  }

  /**
   * 获取学科门类需要的基础能力
   */
  async getFoundationalAbilitiesByDomainId(domainId: string): Promise<Array<{
    ability_id: string;
    code: string;
    name: string;
    requirement_type: 'required' | 'recommended';
  }>> {
    const result = await this.db.query<{
      ability_id: string;
      code: string;
      name: string;
      requirement_type: 'required' | 'recommended';
    }>(
      `SELECT 
        fa.ability_id,
        fa.code,
        fa.name,
        dfar.requirement_type
      FROM pikun_db.domain_foundational_ability_requirements dfar
      INNER JOIN pikun_db.foundational_abilities fa ON dfar.ability_id = fa.ability_id
      WHERE dfar.domain_id = $1 AND fa.deleted_at IS NULL
      ORDER BY dfar.requirement_type DESC, fa.sort_order ASC`,
      [domainId]
    );
    return result.rows;
  }
}

