import 'reflect-metadata';
import { Container } from './container';
import { UserDAO } from '@/dao/user.dao';
import { DocumentDAO } from '@/dao/document.dao';
import { DocumentChangeDAO } from '@/dao/document-change.dao';
import { WorkspaceDAO } from '@/dao/workspace.dao';
import { AuthService } from '@/services/auth.service';
import { DocumentService } from '@/services/document.service';
import { SnapshotService } from '@/services/snapshot.service';
import { SnapshotScheduler } from '@/services/snapshot-scheduler.service';
import { AuthController } from '@/api/auth/auth.controller';
import { DocumentController } from '@/api/documents/document.controller';
import { WorkspaceController } from '@/api/workspace/workspace.controller';

/**
 * 初始化依赖注入容器
 * 注册所有服务和控制器
 */
export function initializeContainer() {
  // 注册 DAO
  Container.register('UserDAO', () => new UserDAO());
  Container.register('DocumentDAO', () => new DocumentDAO());
  Container.register('WorkspaceDAO', () => new WorkspaceDAO());
  Container.register('DocumentChangeDAO', () => new DocumentChangeDAO());

  // 注册 Service
  Container.register(AuthService, () => {
    const userDAO = Container.resolve<UserDAO>('UserDAO');
    const workspaceDAO = Container.resolve<WorkspaceDAO>('WorkspaceDAO');
    return new AuthService(userDAO, workspaceDAO, null as any);
  });

  // 注册 SnapshotService
  Container.register('SnapshotService', () => new SnapshotService());

  // 注册 SnapshotScheduler（需要在 DocumentService 之前注册）
  Container.register('SnapshotScheduler', () => {
    const documentDAO = Container.resolve<DocumentDAO>('DocumentDAO');
    const snapshotService = Container.resolve<SnapshotService>('SnapshotService');
    return new SnapshotScheduler(documentDAO, snapshotService);
  });

  Container.register(DocumentService, () => {
    const documentDAO = Container.resolve<DocumentDAO>('DocumentDAO');
    const snapshotScheduler = Container.resolve<SnapshotScheduler>('SnapshotScheduler');
    const changeDAO = Container.resolve<DocumentChangeDAO>('DocumentChangeDAO');
    return new DocumentService(documentDAO, null as any, snapshotScheduler, changeDAO);
  });

  // 注册 Controller
  Container.register(AuthController, () => {
    const authService = Container.resolve<AuthService>(AuthService);
    return new AuthController(authService);
  });

  Container.register(DocumentController, () => {
    const documentService = Container.resolve<DocumentService>(DocumentService);
    const authService = Container.resolve<AuthService>(AuthService);
    return new DocumentController(documentService, authService);
  });

  Container.register(WorkspaceController, () => {
    const workspaceDAO = Container.resolve<WorkspaceDAO>('WorkspaceDAO');
    const authService = Container.resolve<AuthService>(AuthService);
    return new WorkspaceController(workspaceDAO, authService);
  });
}

// 自动初始化
initializeContainer();
