import { injectable, inject } from 'tsyringe';
import { FoundationalAbilityDAO, type FoundationalAbility } from '@/dao/foundational-ability.dao';

/**
 * 基础能力服务
 */
@injectable()
export class FoundationalAbilityService {
  constructor(
    @inject('FoundationalAbilityDAO') private abilityDAO: FoundationalAbilityDAO
  ) {}

  /**
   * 获取所有基础能力
   */
  async getAllAbilities(): Promise<FoundationalAbility[]> {
    return this.abilityDAO.findAll();
  }

  /**
   * 根据ID获取基础能力
   */
  async getAbilityById(abilityId: string): Promise<FoundationalAbility | null> {
    return this.abilityDAO.findById(abilityId);
  }
}


