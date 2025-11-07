import 'reflect-metadata';

/**
 * 可注入装饰器
 * 标记类可以被依赖注入容器管理
 */
export function Injectable(token?: string | symbol): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata('injectable', true, target);
    if (token) {
      Reflect.defineMetadata('injectionToken', token, target);
    }
  };
}

/**
 * 注入依赖装饰器
 */
export function Inject(token: string | symbol): ParameterDecorator {
  return function (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {
    const existingTokens = Reflect.getMetadata('injections', target) || [];
    existingTokens.push({ index: parameterIndex, token });
    Reflect.defineMetadata('injections', existingTokens, target);
  };
}




