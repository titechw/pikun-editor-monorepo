import 'reflect-metadata';
import { container, DependencyContainer, InjectionToken } from 'tsyringe';

/**
 * 依赖注入容器单例
 */
export class Container {
  private static instance: DependencyContainer;

  public static getInstance(): DependencyContainer {
    if (!Container.instance) {
      Container.instance = container;
    }
    return Container.instance;
  }

  /**
   * 注册服务
   */
  public static register<T>(
    token: InjectionToken<T>,
    factory: () => T
  ): void {
    container.register(token, { useFactory: factory });
  }

  /**
   * 解析服务
   */
  public static resolve<T>(token: InjectionToken<T>): T {
    return container.resolve<T>(token);
  }
}




