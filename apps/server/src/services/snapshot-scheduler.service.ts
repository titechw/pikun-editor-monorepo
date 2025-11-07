import { injectable, inject } from 'tsyringe';
import { DocumentDAO } from '@/dao/document.dao';
import { SnapshotService } from '@/services/snapshot.service';

/**
 * 快照版本类型判断策略接口
 * 用于判断是否应该创建大版本快照
 */
export interface SnapshotVersionStrategy {
  /**
   * 判断是否应该创建大版本快照
   * @param context 判断上下文
   * @returns true 表示应该创建大版本，false 表示创建小版本
   */
  shouldCreateMajorVersion(context: SnapshotVersionContext): boolean | Promise<boolean>;
}

/**
 * 快照版本判断上下文
 */
export interface SnapshotVersionContext {
  objectId: string;
  workspaceId: string;
  currentDocState: Buffer; // 当前文档状态
  currentTime: number; // 当前时间戳
  editCount: number; // 自上次快照以来的编辑次数
  timeSinceLastSnapshot: number; // 距离上次快照的时间（毫秒）
  lastSnapshotDocStateSize?: number; // 上次快照的文档状态大小（字节）
  lastSnapshotTime?: number; // 上次快照的时间戳
}

/**
 * 时间间隔策略：如果距离上次快照超过指定时间，创建大版本
 */
export class TimeIntervalStrategy implements SnapshotVersionStrategy {
  private readonly timeThreshold: number;

  constructor(timeThresholdMs: number = 300000) {
    // 默认 5 分钟（300000 毫秒）
    this.timeThreshold = timeThresholdMs;
  }

  shouldCreateMajorVersion(context: SnapshotVersionContext): boolean {
    return context.timeSinceLastSnapshot >= this.timeThreshold;
  }
}

/**
 * 内容变化策略：如果内容变化很大，创建大版本
 */
export class ContentChangeStrategy implements SnapshotVersionStrategy {
  private readonly changeThreshold: number; // 变化阈值（字节）

  constructor(changeThresholdBytes: number = 10000) {
    // 默认 10KB
    this.changeThreshold = changeThresholdBytes;
  }

  shouldCreateMajorVersion(context: SnapshotVersionContext): boolean {
    if (!context.lastSnapshotDocStateSize) {
      // 如果没有上次快照，不基于内容变化判断
      return false;
    }

    const currentSize = context.currentDocState.length;
    const sizeChange = Math.abs(currentSize - context.lastSnapshotDocStateSize);

    // 如果内容变化超过阈值，创建大版本
    return sizeChange >= this.changeThreshold;
  }
}

/**
 * 变更频次策略：如果变更频次超过阈值，创建大版本
 */
export class EditFrequencyStrategy implements SnapshotVersionStrategy {
  private readonly editThreshold: number;

  constructor(editThreshold: number = 50) {
    // 默认 50 次
    this.editThreshold = editThreshold;
  }

  shouldCreateMajorVersion(context: SnapshotVersionContext): boolean {
    return context.editCount >= this.editThreshold;
  }
}

/**
 * 组合策略：多个策略中任意一个满足条件就创建大版本
 */
export class CompositeOrStrategy implements SnapshotVersionStrategy {
  private strategies: SnapshotVersionStrategy[];

  constructor(strategies: SnapshotVersionStrategy[]) {
    this.strategies = strategies;
  }

  async shouldCreateMajorVersion(context: SnapshotVersionContext): Promise<boolean> {
    for (const strategy of this.strategies) {
      const result = await strategy.shouldCreateMajorVersion(context);
      if (result) {
        return true;
      }
    }
    return false;
  }
}

/**
 * 快照调度器
 * 负责定期创建文档快照，而不是每次保存都创建
 */
@injectable()
export class SnapshotScheduler {
  private editCounts: Map<string, number> = new Map(); // objectId -> editCount
  private lastSnapshotTimes: Map<string, number> = new Map(); // objectId -> lastSnapshotTime
  private lastSnapshotSizes: Map<string, number> = new Map(); // objectId -> lastSnapshotSize

  // 策略配置
  private readonly versionStrategy: SnapshotVersionStrategy;
  private readonly EDITS_THRESHOLD = parseInt(process.env.SNAPSHOT_EDITS_THRESHOLD || '10', 10);
  private readonly TIME_THRESHOLD = parseInt(process.env.SNAPSHOT_TIME_THRESHOLD || '300000', 10); // 5分钟

  constructor(
    @inject('DocumentDAO') private documentDAO: DocumentDAO,
    @inject('SnapshotService') private snapshotService: SnapshotService
  ) {
    // 初始化组合策略：时间间隔、内容变化、变更频次
    const timeStrategy = new TimeIntervalStrategy(this.TIME_THRESHOLD);
    const contentStrategy = new ContentChangeStrategy(
      parseInt(process.env.SNAPSHOT_CONTENT_CHANGE_THRESHOLD || '10000', 10)
    );
    const frequencyStrategy = new EditFrequencyStrategy(
      parseInt(process.env.SNAPSHOT_EDIT_FREQUENCY_THRESHOLD || '50', 10)
    );

    this.versionStrategy = new CompositeOrStrategy([
      timeStrategy,
      contentStrategy,
      frequencyStrategy,
    ]);
  }

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
  ): Promise<{ snapshot_id: string; created_at: number; version_type: 'major' | 'minor' } | null> {
    const key = objectId;
    const editCount = (this.editCounts.get(key) || 0) + 1;
    this.editCounts.set(key, editCount);

    const now = Date.now();
    let lastSnapshotTime = this.lastSnapshotTimes.get(key);
    let lastSnapshotSize = this.lastSnapshotSizes.get(key);

    // 如果内存中没有记录，从数据库查询最后一个快照的信息
    if (!lastSnapshotTime || lastSnapshotSize === undefined) {
      try {
        const latestSnapshot = await this.documentDAO.getLatestSnapshot(objectId);
        if (latestSnapshot) {
          lastSnapshotTime = latestSnapshot.created_at;
          lastSnapshotSize = latestSnapshot.doc_state?.length || 0;
          this.lastSnapshotTimes.set(key, lastSnapshotTime);
          this.lastSnapshotSizes.set(key, lastSnapshotSize);
        } else {
          // 如果没有快照，尝试使用文档的创建时间作为基准
          // 这样可以确保即使没有快照，也能正确计算时间间隔
          try {
            const document = await this.documentDAO.findById(objectId);
            if (document && document.created_at) {
              // 文档创建时间（转换为毫秒时间戳）
              const docCreatedAt =
                typeof document.created_at === 'string'
                  ? new Date(document.created_at).getTime()
                  : document.created_at instanceof Date
                  ? document.created_at.getTime()
                  : document.created_at;
              lastSnapshotTime = docCreatedAt;
              lastSnapshotSize = document.content_length || 0;
              console.log(
                `[SnapshotScheduler] No snapshot found, using document created_at: ${lastSnapshotTime}`
              );
            } else {
              // 如果连文档都找不到，设置为0
              lastSnapshotTime = 0;
              lastSnapshotSize = 0;
            }
          } catch (docError) {
            console.error(`Failed to get document for ${objectId}:`, docError);
            lastSnapshotTime = 0;
            lastSnapshotSize = 0;
          }
          this.lastSnapshotTimes.set(key, lastSnapshotTime);
          this.lastSnapshotSizes.set(key, lastSnapshotSize);
        }
      } catch (error) {
        console.error(`Failed to get latest snapshot for ${objectId}:`, error);
        lastSnapshotTime = 0;
        lastSnapshotSize = 0;
        this.lastSnapshotTimes.set(key, 0);
        this.lastSnapshotSizes.set(key, 0);
      }
    }

    const timeSinceLastSnapshot = now - lastSnapshotTime;

    // 判断是否需要创建快照
    // 如果时间间隔超过阈值，即使编辑次数不够，也应该创建快照
    // 这样可以确保长时间不编辑的文档也能定期创建快照
    const shouldCreateSnapshot =
      editCount >= this.EDITS_THRESHOLD || timeSinceLastSnapshot >= this.TIME_THRESHOLD;

    console.log(`[SnapshotScheduler] recordEdit for ${objectId}:`, {
      editCount,
      timeSinceLastSnapshot,
      timeSinceLastSnapshotMinutes: Math.round(timeSinceLastSnapshot / 60000),
      shouldCreateSnapshot,
      EDITS_THRESHOLD: this.EDITS_THRESHOLD,
      TIME_THRESHOLD: this.TIME_THRESHOLD,
    });

    if (shouldCreateSnapshot) {
      // 使用策略判断版本类型
      const context: SnapshotVersionContext = {
        objectId,
        workspaceId,
        currentDocState: docState,
        currentTime: now,
        editCount,
        timeSinceLastSnapshot,
        lastSnapshotDocStateSize: lastSnapshotSize,
        lastSnapshotTime,
      };

      const isMajor = await this.versionStrategy.shouldCreateMajorVersion(context);
      const versionType: 'major' | 'minor' = isMajor ? 'major' : 'minor';

      console.log(`[SnapshotScheduler] Creating ${versionType} snapshot for ${objectId}`);

      const result = await this.createSnapshot(
        objectId,
        workspaceId,
        docState,
        snapshot,
        versionType
      );

      // 重置计数和时间
      this.editCounts.set(key, 0);
      this.lastSnapshotTimes.set(key, now);
      this.lastSnapshotSizes.set(key, docState.length);

      console.log(`[SnapshotScheduler] Snapshot created:`, {
        snapshot_id: result.snapshot_id,
        version_type: versionType,
      });

      return {
        ...result,
        version_type: versionType,
      };
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
      console.log(`[SnapshotScheduler] Saving snapshot to database:`, {
        object_id: objectId,
        workspace_id: workspaceId,
        version_type: versionType,
        doc_state_length: docState.length,
        snapshot_length: snapshot?.length || 0,
      });

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

      console.log(`[SnapshotScheduler] Snapshot record saved to database:`, {
        snapshot_id: snapshotRecord.snapshot_id,
        object_id: objectId,
        version_type: versionType,
        created_at: snapshotRecord.created_at,
        db_created_at_type: typeof snapshotRecord.created_at,
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
   * 会根据策略判断创建大版本还是小版本
   * @param forceMajorVersion 是否强制创建大版本（用于初始快照等场景）
   */
  async createSnapshotManually(
    objectId: string,
    workspaceId: string,
    docState: Buffer,
    snapshot?: Buffer,
    forceMajorVersion: boolean = false
  ): Promise<{ snapshot_id: string; created_at: number; version_type: 'major' | 'minor' }> {
    const key = objectId;
    const editCount = this.editCounts.get(key) || 0;
    const now = Date.now();

    let lastSnapshotTime = this.lastSnapshotTimes.get(key);
    let lastSnapshotSize = this.lastSnapshotSizes.get(key);

    // 如果内存中没有记录，从数据库查询
    if (!lastSnapshotTime || lastSnapshotSize === undefined) {
      try {
        const latestSnapshot = await this.documentDAO.getLatestSnapshot(objectId);
        if (latestSnapshot) {
          lastSnapshotTime = latestSnapshot.created_at;
          lastSnapshotSize = latestSnapshot.doc_state?.length || 0;
        } else {
          // 如果没有快照，尝试使用文档的创建时间作为基准
          try {
            const document = await this.documentDAO.findById(objectId);
            if (document && document.created_at) {
              const docCreatedAt =
                typeof document.created_at === 'string'
                  ? new Date(document.created_at).getTime()
                  : document.created_at instanceof Date
                  ? document.created_at.getTime()
                  : document.created_at;
              lastSnapshotTime = docCreatedAt;
              lastSnapshotSize = document.content_length || 0;
              console.log(
                `[SnapshotScheduler] No snapshot found, using document created_at: ${lastSnapshotTime}`
              );
            } else {
              lastSnapshotTime = 0;
              lastSnapshotSize = 0;
            }
          } catch (docError) {
            console.error(`Failed to get document for ${objectId}:`, docError);
            lastSnapshotTime = 0;
            lastSnapshotSize = 0;
          }
        }
      } catch (error) {
        console.error(`Failed to get latest snapshot for ${objectId}:`, error);
        lastSnapshotTime = 0;
        lastSnapshotSize = 0;
      }
    }

    const timeSinceLastSnapshot = now - (lastSnapshotTime || 0);

    // 判断版本类型
    let versionType: 'major' | 'minor';

    if (forceMajorVersion) {
      // 强制创建大版本（用于初始快照等场景）
      versionType = 'major';
    } else {
      // 使用策略判断版本类型
      const context: SnapshotVersionContext = {
        objectId,
        workspaceId,
        currentDocState: docState,
        currentTime: now,
        editCount,
        timeSinceLastSnapshot,
        lastSnapshotDocStateSize: lastSnapshotSize,
        lastSnapshotTime,
      };

      const isMajor = await this.versionStrategy.shouldCreateMajorVersion(context);
      versionType = isMajor ? 'major' : 'minor';
    }

    const result = await this.createSnapshot(
      objectId,
      workspaceId,
      docState,
      snapshot,
      versionType
    );

    // 重置计数和时间
    this.editCounts.set(key, 0);
    this.lastSnapshotTimes.set(key, now);
    this.lastSnapshotSizes.set(key, docState.length);

    return {
      ...result,
      version_type: versionType,
    };
  }

  /**
   * 重置文档的编辑计数（用于文档关闭等场景）
   */
  reset(objectId: string): void {
    this.editCounts.delete(objectId);
    this.lastSnapshotTimes.delete(objectId);
    this.lastSnapshotSizes.delete(objectId);
  }
}
