import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * 请求验证装饰器
 * 使用 Zod schema 验证请求体
 */
export function ValidateBody(schema: z.ZodSchema) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextRequest, ...args: any[]) {
      try {
        const body = await req.json();
        const validatedData = schema.parse(body);
        return originalMethod.call(this, req, { ...args, body: validatedData });
      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json(
            {
              success: false,
              message: 'Validation error',
              errors: error.errors,
            },
            { status: 400 }
          );
        }
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * 请求查询参数验证装饰器
 */
export function ValidateQuery(schema: z.ZodSchema) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextRequest, ...args: any[]) {
      try {
        const { searchParams } = new URL(req.url);
        const query: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          query[key] = value;
        });
        const validatedData = schema.parse(query);
        return originalMethod.call(this, req, { ...args, query: validatedData });
      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json(
            {
              success: false,
              message: 'Validation error',
              errors: error.errors,
            },
            { status: 400 }
          );
        }
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * 路径参数验证装饰器
 */
export function ValidateParams(schema: z.ZodSchema) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextRequest, context: any, ...args: any[]) {
      try {
        const validatedData = schema.parse(context.params);
        return originalMethod.call(this, req, { ...context, params: validatedData }, ...args);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json(
            {
              success: false,
              message: 'Validation error',
              errors: error.errors,
            },
            { status: 400 }
          );
        }
        throw error;
      }
    };

    return descriptor;
  };
}




