import { NextRequest, NextResponse } from 'next/server';
import '@/core/init';

/**
 * GET /api/subject/subjects/[subject_id]/dependencies - 获取学科的依赖关系（C端）
 * TODO: 需要实现依赖关系的查询逻辑
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { subject_id: string } }
) {
  try {
    const { subject_id } = params;

    // TODO: 实现依赖关系查询逻辑
    // 目前返回空数组
    return NextResponse.json({
      success: true,
      data: [],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to get dependencies',
      },
      { status: 500 }
    );
  }
}


