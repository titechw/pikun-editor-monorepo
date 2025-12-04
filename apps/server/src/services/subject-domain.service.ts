import { injectable, inject } from 'tsyringe';
import { SubjectDomainDAO, type SubjectDomain } from '@/dao/subject-domain.dao';

/**
 * 学科门类服务
 */
@injectable()
export class SubjectDomainService {
  constructor(
    @inject('SubjectDomainDAO') private domainDAO: SubjectDomainDAO
  ) {}

  /**
   * 获取所有学科门类
   */
  async getAllDomains(): Promise<SubjectDomain[]> {
    return this.domainDAO.findAll();
  }

  /**
   * 根据ID获取学科门类
   */
  async getDomainById(domainId: string): Promise<SubjectDomain | null> {
    return this.domainDAO.findById(domainId);
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
    return this.domainDAO.getCategoriesByDomainId(domainId);
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
    return this.domainDAO.getFoundationalAbilitiesByDomainId(domainId);
  }
}


