import { injectable, inject } from 'tsyringe';
import { DocumentDAO } from '@/dao/document.dao';
import { SnapshotService } from '@/services/snapshot.service';

/**
 * 快照调度器
 * 负责定期创建文档快照，而不是每次保存都创建
 */
@injectable()
export class SnapshotScheduler {
  private editCounts: Map<string, number> = new Map(); // objectId -> editCount
  private lastSnapshotTimes: Map<string, number> = new Map(); // objectId -> lastSnapshotTime
  private readonly EDITS_THRESHOLD = parseInt(process.env.SNAPSHOT_EDITS_THRESHOLD || '10', 10);
  private readonly TIME_THRESHOLD = parseInt(process.env.SNAPSHOT_TIME_THRESHOLD || '300000', 10); // 5分钟（300000毫秒）

  constructor(
    @inject('DocumentDAO') private documentDAO: DocumentDAO,
    @inject('SnapshotService') private snapshotService: SnapshotService
  ) {}

  /**
   * 记录一次编辑
   * @param objectId 文档 ID
   * @param workspaceId 工作空间 ID
   * @param docState 文档状态（Y.encodeStateAsUpdate）
   * @param snapshot Yjs Snapshot（可选）
   * @returns 如果创建了快照，返回快照信息；否则返回 null
   */
  async recordEdit(
    objectId: string,
    workspaceId: string,
    docState: Buffer,
    snapshot?: Buffer
  ): Promise<{ snapshot_id: string; created_at: number } | null> {
    const key = objectId;
    const editCount = (this.editCounts.get(key) || 0) + 1;
    this.editCounts.set(key, editCount);

    const now = Date.now();
    let lastSnapshotTime = this.lastSnapshotTimes.get(key);
    
    // 如果内存中没有记录，从数据库查询最后一个快照的时间
    if (!lastSnapshotTime) {
      try {
        const latestSnapshot = await this.documentDAO.getLatestSnapshot(objectId);
        if (latestSnapshot) {
          lastSnapshotTime = latestSnapshot.created_at;
          this.lastSnapshotTimes.set(key, lastSnapshotTime);
        } else {
          // 如果没有快照，设置为0，这样第一次编辑就会创建快照
          lastSnapshotTime = 0;
          this.lastSnapshotTimes.set(key, 0);
        }
      } catch (error) {
        console.error(`Failed to get latest snapshot for ${objectId}:`, error);
        lastSnapshotTime = 0;
        this.lastSnapshotTimes.set(key, 0);
      }
    }
    
    const timeSinceLastSnapshot = now - lastSnapshotTime;

    // 判断是否需要创建快照
    const shouldCreateSnapshot =
      editCount >= this.EDITS_THRESHOLD || timeSinceLastSnapshot >= this.TIME_THRESHOLD;

    if (shouldCreateSnapshot) {
      const result = await this.createSnapshot(objectId, workspaceId, docState, snapshot, 'major');
      // 重置计数和时间
      this.editCounts.set(key, 0);
      this.lastSnapshotTimes.set(key, now);
      return result;
    }
    return null;
  }

  /**
   * 创建快照
   */
  private async createSnapshot(
    objectId: string,
    workspaceId: string,
    docState: Buffer,
    snapshot?: Buffer,
    versionType: 'major' | 'minor' = 'major'
  ): Promise<{ snapshot_id: string; created_at: number }> {
    try {
      // 使用 SnapshotService 创建快照
      const result = await this.snapshotService.createSnapshot({
        workspaceId,
        objectId,
        docState,
        snapshot,
        metadata: {
          auto_save: versionType === 'major',
          doc_state_length: docState.length,
          version_type: versionType,
        },
      });

      // 在数据库中记录快照元数据
      const snapshotRecord = await this.documentDAO.createSnapshot({
        object_id: objectId,
        workspace_id: workspaceId,
        snapshot_data: snapshot || Buffer.alloc(0), // Snapshot（状态向量）
        snapshot_version: 1,
        doc_state: docState, // Doc State（完整状态）
        doc_state_version: 1,
        version_type: versionType,
        metadata: {
          snapshot_id: result.snapshotId,
          created_at: result.createdAt,
          stored_in: 'file', // 存储在文件系统中
        },
      });

      return {
        snapshot_id: snapshotRecord.snapshot_id,
        created_at: result.createdAt,
      };
    } catch (error) {
      console.error(`Failed to create snapshot for document ${objectId}:`, error);
      throw error;
    }
  }

  /**
   * 手动触发快照创建（用于手动保存）
   */
  async createSnapshotManually(
    objectId: string,
    workspaceId: string,
    docState: Buffer,
    snapshot?: Buffer,
    versionType: 'major' | 'minor' = 'minor'
  ): Promise<{ snapshot_id: string; created_at: number }> {
    const result = await this.createSnapshot(
      objectId,
      workspaceId,
      docState,
      snapshot,
      versionType
    );
    // 重置计数和时间
    this.editCounts.set(objectId, 0);
    this.lastSnapshotTimes.set(objectId, Date.now());
    return result;
  }

  /**
   * 重置文档的编辑计数（用于文档关闭等场景）
   */
  reset(objectId: string): void {
    this.editCounts.delete(objectId);
    this.lastSnapshotTimes.delete(objectId);
  }
}
