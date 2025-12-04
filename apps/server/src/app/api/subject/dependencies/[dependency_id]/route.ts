import { NextRequest, NextResponse } from 'next/server';
import '@/core/init';

/**
 * DELETE /api/subject/dependencies/[dependency_id] - 删除学科依赖关系（C端）
 * TODO: 需要实现依赖关系的删除逻辑
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { dependency_id: string } }
) {
  try {
    const { dependency_id } = params;

    // TODO: 实现依赖关系删除逻辑
    return NextResponse.json({
      success: true,
      message: 'Dependency deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to delete dependency',
      },
      { status: 400 }
    );
  }
}


