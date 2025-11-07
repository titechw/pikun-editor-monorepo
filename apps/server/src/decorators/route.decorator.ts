import { NextRequest, NextResponse } from 'next/server';

/**
 * HTTP 方法类型
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * 路由处理器类型
 */
export type RouteHandler = (
  req: NextRequest,
  context?: any
) => Promise<NextResponse> | NextResponse;

/**
 * 路由元数据接口
 */
export interface RouteMetadata {
  path: string;
  method: HttpMethod;
  handler: RouteHandler;
  middlewares?: Array<(req: NextRequest) => Promise<NextResponse | null>>;
}

/**
 * 控制器装饰器
 * 标记类为控制器
 */
export function Controller(basePath: string): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata('controller', true, target);
    Reflect.defineMetadata('basePath', basePath, target);
  };
}

/**
 * 路由装饰器
 * 标记方法为路由处理器
 */
export function Route(method: HttpMethod, path: string = '') {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const routes: RouteMetadata[] =
      Reflect.getMetadata('routes', target.constructor) || [];

    routes.push({
      path,
      method,
      handler: descriptor.value,
    });

    Reflect.defineMetadata('routes', routes, target.constructor);
  };
}

/**
 * GET 路由装饰器
 */
export function Get(path: string = '') {
  return Route('GET', path);
}

/**
 * POST 路由装饰器
 */
export function Post(path: string = '') {
  return Route('POST', path);
}

/**
 * PUT 路由装饰器
 */
export function Put(path: string = '') {
  return Route('PUT', path);
}

/**
 * DELETE 路由装饰器
 */
export function Delete(path: string = '') {
  return Route('DELETE', path);
}

/**
 * PATCH 路由装饰器
 */
export function Patch(path: string = '') {
  return Route('PATCH', path);
}




