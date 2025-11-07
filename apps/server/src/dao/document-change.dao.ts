import { Injectable } from '@/decorators/injectable.decorator';
import { Database } from '@/core/database';
import { v4 as uuidv4 } from 'uuid';

export interface DocumentChange {
  change_id: string;
  object_id: string;
  workspace_id: string;
  snapshot_id: string | null;
  change_type: 'auto_save' | 'manual_save';
  change_data: Buffer;
  before_state_vector: Buffer | null;
  after_state_vector: Buffer | null;
  change_size: number;
  metadata: Record<string, any>;
  created_at: number;
}

/**
 * 文档变更日志 DAO
 */
@Injectable('DocumentChangeDAO')
export class DocumentChangeDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 创建变更记录
   */
  async create(change: {
    object_id: string;
    workspace_id: string;
    snapshot_id?: string | null;
    change_type: 'auto_save' | 'manual_save';
    change_data: Buffer;
    before_state_vector?: Buffer | null;
    after_state_vector?: Buffer | null;
    metadata?: Record<string, any>;
  }): Promise<DocumentChange> {
    const created_at = Date.now();
    const result = await this.db.query<DocumentChange>(
      `INSERT INTO pikun_db.document_changes (
        change_id, object_id, workspace_id, snapshot_id, change_type, 
        change_data, before_state_vector, after_state_vector, change_size, metadata, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        uuidv4(),
        change.object_id,
        change.workspace_id,
        change.snapshot_id || null,
        change.change_type,
        change.change_data,
        change.before_state_vector || null,
        change.after_state_vector || null,
        change.change_data.length,
        JSON.stringify(change.metadata || {}),
        created_at,
      ]
    );
    return result.rows[0];
  }

  /**
   * 获取文档的变更列表
   */
  async findByObjectId(
    object_id: string,
    options: {
      limit?: number;
      offset?: number;
      after_snapshot_id?: string | null; // 获取某个快照之后的变更
    } = {}
  ): Promise<{ changes: DocumentChange[]; total: number }> {
    const { limit = 100, offset = 0, after_snapshot_id } = options;

    let query = `
      SELECT COUNT(*) as count 
      FROM pikun_db.document_changes 
      WHERE object_id = $1
    `;
    const countParams: any[] = [object_id];

    if (after_snapshot_id) {
      query += ` AND created_at > (SELECT created_at FROM pikun_db.document_snapshots WHERE snapshot_id = $2)`;
      countParams.push(after_snapshot_id);
    }

    const countResult = await this.db.query<{ count: string }>(query, countParams);
    const total = parseInt(countResult.rows[0].count, 10);

    let listQuery = `
      SELECT * FROM pikun_db.document_changes
      WHERE object_id = $1
    `;
    const listParams: any[] = [object_id];

    if (after_snapshot_id) {
      listQuery += ` AND created_at > (SELECT created_at FROM pikun_db.document_snapshots WHERE snapshot_id = $2)`;
      listParams.push(after_snapshot_id);
    }

    listQuery += ` ORDER BY created_at ASC LIMIT $${listParams.length + 1} OFFSET $${listParams.length + 2}`;
    listParams.push(limit, offset);

    const result = await this.db.query<DocumentChange>(listQuery, listParams);

    return {
      changes: result.rows,
      total,
    };
  }

  /**
   * 获取两个快照之间的变更
   */
  async getChangesBetweenSnapshots(
    object_id: string,
    from_snapshot_id: string,
    to_snapshot_id: string
  ): Promise<DocumentChange[]> {
    const result = await this.db.query<DocumentChange>(
      `SELECT * FROM pikun_db.document_changes
       WHERE object_id = $1
         AND created_at > (SELECT created_at FROM pikun_db.document_snapshots WHERE snapshot_id = $2)
         AND created_at <= (SELECT created_at FROM pikun_db.document_snapshots WHERE snapshot_id = $3)
       ORDER BY created_at ASC`,
      [object_id, from_snapshot_id, to_snapshot_id]
    );
    return result.rows;
  }

  /**
   * 删除文档的所有变更记录
   */
  async deleteByObjectId(object_id: string): Promise<void> {
    await this.db.query(
      'DELETE FROM pikun_db.document_changes WHERE object_id = $1',
      [object_id]
    );
  }
}

