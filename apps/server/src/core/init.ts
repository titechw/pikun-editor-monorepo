import 'reflect-metadata';
import { Container } from './container';
import { UserDAO } from '@/dao/user.dao';
import { DocumentDAO } from '@/dao/document.dao';
import { WorkspaceDAO } from '@/dao/workspace.dao';
import { AuthService } from '@/services/auth.service';
import { DocumentService } from '@/services/document.service';
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

  // 注册 Service
  Container.register(AuthService, () => {
    const userDAO = Container.resolve<UserDAO>('UserDAO');
    const workspaceDAO = Container.resolve<WorkspaceDAO>('WorkspaceDAO');
    return new AuthService(userDAO, workspaceDAO, null as any);
  });

  Container.register(DocumentService, () => {
    const documentDAO = Container.resolve<DocumentDAO>('DocumentDAO');
    return new DocumentService(documentDAO, null as any);
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




