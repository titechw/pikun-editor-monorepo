import 'reflect-metadata';
import { Container } from './container';
import { UserDAO } from '@/dao/user.dao';
import { DocumentDAO } from '@/dao/document.dao';
import { DocumentChangeDAO } from '@/dao/document-change.dao';
import { WorkspaceDAO } from '@/dao/workspace.dao';
import { AbilityCategoryDAO } from '@/dao/ability-category.dao';
import { AbilityDimensionDAO } from '@/dao/ability-dimension.dao';
import { AbilityItemDAO } from '@/dao/ability-item.dao';
import { AbilityItemLevelConfigDAO } from '@/dao/ability-item-level-config.dao';
import { UserAbilityLevelDAO } from '@/dao/user-ability-level.dao';
import { UserAbilityExperienceLogDAO } from '@/dao/user-ability-experience-log.dao';
import { SubjectCategoryDAO } from '@/dao/subject-category.dao';
import { SubjectDAO } from '@/dao/subject.dao';
import { AuthService } from '@/services/auth.service';
import { DocumentService } from '@/services/document.service';
import { SnapshotService } from '@/services/snapshot.service';
import { SnapshotScheduler } from '@/services/snapshot-scheduler.service';
import { AbilityModelService } from '@/services/ability-model.service';
import { AbilityLevelConfigService } from '@/services/ability-level-config.service';
import { UserAbilityService } from '@/services/user-ability.service';
import { ExperienceService } from '@/services/experience.service';
import { AuthController } from '@/api/auth/auth.controller';
import { DocumentController } from '@/api/documents/document.controller';
import { WorkspaceController } from '@/api/workspace/workspace.controller';
import { AbilityModelController } from '@/api/ability/ability-model.controller';
import { AbilityLevelConfigController } from '@/api/ability/ability-level-config.controller';
import { SubjectService } from '@/services/subject.service';
import { SubjectController } from '@/api/subject/subject.controller';
import { MemoryTrainingGameDAO } from '@/dao/memory-training-game.dao';
import { MemoryTrainingLevelDAO } from '@/dao/memory-training-level.dao';
import { UserMemoryLevelProgressDAO } from '@/dao/user-memory-level-progress.dao';
import { CourseDAO } from '@/dao/course.dao';
import { MemoryTrainingService } from '@/services/memory-training.service';
import { CourseService } from '@/services/course.service';
import { MemoryTrainingController } from '@/api/memory-training/memory-training.controller';
import { CourseController } from '@/api/course/course.controller';
import { Redis } from '@/core/redis';

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
  Container.register('AbilityCategoryDAO', () => new AbilityCategoryDAO());
  Container.register('AbilityDimensionDAO', () => new AbilityDimensionDAO());
  Container.register('AbilityItemDAO', () => new AbilityItemDAO());
  Container.register('AbilityItemLevelConfigDAO', () => new AbilityItemLevelConfigDAO());
  Container.register('UserAbilityLevelDAO', () => new UserAbilityLevelDAO());
  Container.register('UserAbilityExperienceLogDAO', () => new UserAbilityExperienceLogDAO());
  Container.register('SubjectCategoryDAO', () => new SubjectCategoryDAO());
  Container.register('SubjectDAO', () => new SubjectDAO());
  Container.register('MemoryTrainingGameDAO', () => new MemoryTrainingGameDAO());
  Container.register('MemoryTrainingLevelDAO', () => new MemoryTrainingLevelDAO());
  Container.register('UserMemoryLevelProgressDAO', () => new UserMemoryLevelProgressDAO());
  Container.register('CourseDAO', () => new CourseDAO());

  // 注册 Service
  Container.register(AuthService, () => {
    const userDAO = Container.resolve<UserDAO>('UserDAO');
    const workspaceDAO = Container.resolve<WorkspaceDAO>('WorkspaceDAO');
    const redis = Redis.getInstance();
    return new AuthService(userDAO, workspaceDAO, redis);
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
    const workspaceDAO = Container.resolve<WorkspaceDAO>('WorkspaceDAO');
    return new DocumentController(documentService, authService, workspaceDAO);
  });

  Container.register(WorkspaceController, () => {
    const workspaceDAO = Container.resolve<WorkspaceDAO>('WorkspaceDAO');
    const authService = Container.resolve<AuthService>(AuthService);
    return new WorkspaceController(workspaceDAO, authService);
  });

  // 注册能力模型相关 Service
  Container.register(AbilityModelService, () => {
    const categoryDAO = Container.resolve<AbilityCategoryDAO>('AbilityCategoryDAO');
    const dimensionDAO = Container.resolve<AbilityDimensionDAO>('AbilityDimensionDAO');
    const itemDAO = Container.resolve<AbilityItemDAO>('AbilityItemDAO');
    return new AbilityModelService(categoryDAO, dimensionDAO, itemDAO);
  });

  Container.register(AbilityLevelConfigService, () => {
    const levelConfigDAO = Container.resolve<AbilityItemLevelConfigDAO>('AbilityItemLevelConfigDAO');
    return new AbilityLevelConfigService(levelConfigDAO);
  });

  Container.register(UserAbilityService, () => {
    const userLevelDAO = Container.resolve<UserAbilityLevelDAO>('UserAbilityLevelDAO');
    const experienceLogDAO = Container.resolve<UserAbilityExperienceLogDAO>('UserAbilityExperienceLogDAO');
    const levelConfigDAO = Container.resolve<AbilityItemLevelConfigDAO>('AbilityItemLevelConfigDAO');
    return new UserAbilityService(userLevelDAO, experienceLogDAO, levelConfigDAO);
  });

  Container.register(ExperienceService, () => {
    const userLevelDAO = Container.resolve<UserAbilityLevelDAO>('UserAbilityLevelDAO');
    const experienceLogDAO = Container.resolve<UserAbilityExperienceLogDAO>('UserAbilityExperienceLogDAO');
    const levelConfigDAO = Container.resolve<AbilityItemLevelConfigDAO>('AbilityItemLevelConfigDAO');
    return new ExperienceService(userLevelDAO, experienceLogDAO, levelConfigDAO);
  });

  // 注册能力模型 Controller
  Container.register(AbilityModelController, () => {
    const abilityModelService = Container.resolve<AbilityModelService>(AbilityModelService);
    return new AbilityModelController(abilityModelService);
  });

  Container.register(AbilityLevelConfigController, () => {
    const levelConfigService = Container.resolve<AbilityLevelConfigService>(
      AbilityLevelConfigService
    );
    return new AbilityLevelConfigController(levelConfigService);
  });

  // 注册学科相关 Service
  Container.register(SubjectService, () => {
    const categoryDAO = Container.resolve<SubjectCategoryDAO>('SubjectCategoryDAO');
    const subjectDAO = Container.resolve<SubjectDAO>('SubjectDAO');
    return new SubjectService(categoryDAO, subjectDAO);
  });

  // 注册学科 Controller
  Container.register(SubjectController, () => {
    const subjectService = Container.resolve<SubjectService>(SubjectService);
    return new SubjectController(subjectService);
  });

  // 注册记忆训练相关 Service
  Container.register(MemoryTrainingService, () => {
    const gameDAO = Container.resolve<MemoryTrainingGameDAO>('MemoryTrainingGameDAO');
    const levelDAO = Container.resolve<MemoryTrainingLevelDAO>('MemoryTrainingLevelDAO');
    const progressDAO = Container.resolve<UserMemoryLevelProgressDAO>('UserMemoryLevelProgressDAO');
    const experienceService = Container.resolve<ExperienceService>(ExperienceService);
    const userAbilityService = Container.resolve<UserAbilityService>(UserAbilityService);
    return new MemoryTrainingService(
      gameDAO,
      levelDAO,
      progressDAO,
      experienceService,
      userAbilityService
    );
  });

  // 注册记忆训练 Controller
  Container.register(MemoryTrainingController, () => {
    const memoryTrainingService = Container.resolve<MemoryTrainingService>(MemoryTrainingService);
    return new MemoryTrainingController(memoryTrainingService);
  });

  // 注册课程相关 Service
  Container.register(CourseService, () => {
    const courseDAO = Container.resolve<CourseDAO>('CourseDAO');
    const experienceService = Container.resolve<ExperienceService>(ExperienceService);
    return new CourseService(courseDAO, experienceService);
  });

  // 注册课程 Controller
  Container.register(CourseController, () => {
    const courseService = Container.resolve<CourseService>(CourseService);
    return new CourseController(courseService);
  });
}

// 自动初始化
initializeContainer();
