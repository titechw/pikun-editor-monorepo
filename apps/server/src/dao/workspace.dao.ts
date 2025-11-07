import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { Workspace } from '@/entities';

/**
 * 工作空间 DAO
 * 负责工作空间相关的数据库操作
 */
@Injectable('WorkspaceDAO')
export class WorkspaceDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 创建工作空间
   */
  async create(workspace: {
    name: string;
    owner_uid: number;
    icon?: string;
    metadata?: Record<string, any>;
  }): Promise<Workspace> {
    const result = await this.db.query<Workspace>(
      `INSERT INTO pikun_db.workspaces (name, owner_uid, icon, metadata)
       VALUES ($1, $2, $3, $4)
       RETURNING workspace_id, name, owner_uid, icon, metadata, deleted_at, created_at, updated_at`,
      [
        workspace.name,
        workspace.owner_uid,
        workspace.icon || null,
        JSON.stringify(workspace.metadata || {}),
      ]
    );
    return result.rows[0];
  }

  /**
   * 根据 ID 查找工作空间
   */
  async findById(workspace_id: string): Promise<Workspace | null> {
    const result = await this.db.query<Workspace>(
      'SELECT * FROM pikun_db.workspaces WHERE workspace_id = $1 AND deleted_at IS NULL',
      [workspace_id]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据用户 ID 查找用户的所有工作空间
   */
  async findByOwnerUid(owner_uid: number): Promise<Workspace[]> {
    const result = await this.db.query<Workspace>(
      'SELECT * FROM pikun_db.workspaces WHERE owner_uid = $1 AND deleted_at IS NULL ORDER BY created_at DESC',
      [owner_uid]
    );
    return result.rows;
  }

  /**
   * 获取用户的默认工作空间（第一个工作空间或创建新的）
   */
  async getOrCreateDefault(owner_uid: number): Promise<Workspace> {
    // 先查找用户的工作空间
    const workspaces = await this.findByOwnerUid(owner_uid);
    if (workspaces.length > 0) {
      return workspaces[0];
    }

    // 如果没有，创建默认工作空间
    return await this.create({
      name: '我的工作空间',
      owner_uid,
    });
  }

  /**
   * 更新工作空间
   */
  async update(
    workspace_id: string,
    updates: {
      name?: string;
      icon?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<Workspace> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(updates.name);
    }
    if (updates.icon !== undefined) {
      fields.push(`icon = $${paramIndex++}`);
      values.push(updates.icon);
    }
    if (updates.metadata !== undefined) {
      fields.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) {
      return this.findById(workspace_id) as Promise<Workspace>;
    }

    values.push(workspace_id);
    const result = await this.db.query<Workspace>(
      `UPDATE pikun_db.workspaces SET ${fields.join(', ')} WHERE workspace_id = $${paramIndex} AND deleted_at IS NULL
       RETURNING workspace_id, name, owner_uid, icon, metadata, deleted_at, created_at, updated_at`,
      values
    );
    return result.rows[0];
  }

  /**
   * 删除工作空间（软删除）
   */
  async delete(workspace_id: string): Promise<void> {
    await this.db.query(
      'UPDATE pikun_db.workspaces SET deleted_at = CURRENT_TIMESTAMP WHERE workspace_id = $1',
      [workspace_id]
    );
  }
}

