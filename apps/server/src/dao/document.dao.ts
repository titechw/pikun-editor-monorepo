import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { Document, DocumentSnapshot } from '@/entities';

/**
 * 文档 DAO
 * 负责文档相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('DocumentDAO')
export class DocumentDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 创建文档
   */
  async create(document: {
    workspace_id: string;
    title: string;
    content: Buffer;
    content_length: number;
    owner_uid: number;
    metadata?: Record<string, any>;
  }): Promise<Document> {
    const result = await this.db.query<Document>(
      `INSERT INTO pikun_db.documents (workspace_id, title, content, content_length, owner_uid, metadata)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING object_id, workspace_id, title, content, content_length, owner_uid, metadata, deleted_at, created_at, updated_at`,
      [
        document.workspace_id,
        document.title,
        document.content,
        document.content_length,
        document.owner_uid,
        JSON.stringify(document.metadata || {}),
      ]
    );
    return result.rows[0];
  }

  /**
   * 根据 ID 查找文档
   */
  async findById(object_id: string): Promise<Document | null> {
    const result = await this.db.query<Document>(
      'SELECT * FROM pikun_db.documents WHERE object_id = $1 AND deleted_at IS NULL',
      [object_id]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据工作空间 ID 查找文档列表
   */
  async findByWorkspaceId(
    workspace_id: string,
    options: {
      page?: number;
      page_size?: number;
      sort_by?: 'created_at' | 'updated_at' | 'title';
      order?: 'asc' | 'desc';
    } = {}
  ): Promise<{ documents: Document[]; total: number }> {
    const page = options.page || 1;
    const page_size = options.page_size || 20;
    const sort_by = options.sort_by || 'updated_at';
    const order = options.order || 'desc';
    const offset = (page - 1) * page_size;

    // 获取总数
    const countResult = await this.db.query<{ count: string }>(
      'SELECT COUNT(*) as count FROM pikun_db.documents WHERE workspace_id = $1 AND deleted_at IS NULL',
      [workspace_id]
    );
    const total = parseInt(countResult.rows[0].count, 10);

    // 获取文档列表（不包含 content，减少数据传输）
    const result = await this.db.query<Document>(
      `SELECT object_id, workspace_id, title, content_length, owner_uid, metadata, deleted_at, created_at, updated_at
       FROM pikun_db.documents
       WHERE workspace_id = $1 AND deleted_at IS NULL
       ORDER BY ${sort_by} ${order}
       LIMIT $2 OFFSET $3`,
      [workspace_id, page_size, offset]
    );

    return {
      documents: result.rows,
      total,
    };
  }

  /**
   * 更新文档
   */
  async update(
    object_id: string,
    updates: {
      title?: string;
      content?: Buffer;
      content_length?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<Document> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(updates.title);
    }
    if (updates.content !== undefined) {
      fields.push(`content = $${paramIndex++}`);
      values.push(updates.content);
    }
    if (updates.content_length !== undefined) {
      fields.push(`content_length = $${paramIndex++}`);
      values.push(updates.content_length);
    }
    if (updates.metadata !== undefined) {
      fields.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) {
      return this.findById(object_id) as Promise<Document>;
    }

    values.push(object_id);
    const result = await this.db.query<Document>(
      `UPDATE pikun_db.documents SET ${fields.join(', ')} WHERE object_id = $${paramIndex} AND deleted_at IS NULL
       RETURNING object_id, workspace_id, title, content, content_length, owner_uid, metadata, deleted_at, created_at, updated_at`,
      values
    );
    return result.rows[0];
  }

  /**
   * 删除文档（软删除）
   */
  async delete(object_id: string): Promise<void> {
    await this.db.query(
      'UPDATE pikun_db.documents SET deleted_at = CURRENT_TIMESTAMP WHERE object_id = $1',
      [object_id]
    );
  }

  /**
   * 创建文档快照
   */
  async createSnapshot(snapshot: {
    object_id: string;
    workspace_id: string;
    snapshot_data: Buffer;
    snapshot_version: number;
    doc_state?: Buffer;
    doc_state_version?: number;
    metadata?: Record<string, any>;
  }): Promise<DocumentSnapshot> {
    const created_at = Date.now();
    const result = await this.db.query<DocumentSnapshot>(
      `INSERT INTO pikun_db.document_snapshots (object_id, workspace_id, snapshot_data, snapshot_version, doc_state, doc_state_version, metadata, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        snapshot.object_id,
        snapshot.workspace_id,
        snapshot.snapshot_data,
        snapshot.snapshot_version,
        snapshot.doc_state || null,
        snapshot.doc_state_version || 1,
        JSON.stringify(snapshot.metadata || {}),
        created_at,
      ]
    );
    return result.rows[0];
  }

  /**
   * 获取文档快照列表
   */
  async getSnapshots(
    object_id: string,
    options: { limit?: number; offset?: number } = {}
  ): Promise<{ snapshots: DocumentSnapshot[]; total: number }> {
    const limit = options.limit || 20;
    const offset = options.offset || 0;

    const countResult = await this.db.query<{ count: string }>(
      'SELECT COUNT(*) as count FROM pikun_db.document_snapshots WHERE object_id = $1',
      [object_id]
    );
    const total = parseInt(countResult.rows[0].count, 10);

    const result = await this.db.query<DocumentSnapshot>(
      `SELECT * FROM pikun_db.document_snapshots
       WHERE object_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [object_id, limit, offset]
    );

    return {
      snapshots: result.rows,
      total,
    };
  }

  /**
   * 获取最新快照
   */
  async getLatestSnapshot(object_id: string): Promise<DocumentSnapshot | null> {
    const result = await this.db.query<DocumentSnapshot>(
      `SELECT * FROM pikun_db.document_snapshots
       WHERE object_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [object_id]
    );
    return result.rows[0] || null;
  }
}

