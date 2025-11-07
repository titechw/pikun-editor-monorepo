import { NextRequest, NextResponse } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { DocumentService } from '@/services/document.service';
import { AuthService } from '@/services/auth.service';

/**
 * 获取两个快照之间的变更
 * GET /api/workspace/{workspace_id}/documents/{object_id}/changes/between/{from_snapshot_id}/{to_snapshot_id}
 */
export async function GET(
  req: NextRequest,
  context: { params: { workspace_id: string; object_id: string; from_snapshot_id: string; to_snapshot_id: string } }
): Promise<NextResponse> {
  try {
    const authService = Container.resolve<AuthService>(AuthService);
    const documentService = Container.resolve<DocumentService>(DocumentService);

    // 验证用户身份
    await authService.getCurrentUser(req);

    const { object_id, from_snapshot_id, to_snapshot_id } = context.params;

    const changes = await documentService.getChangesBetweenSnapshots(
      object_id,
      from_snapshot_id,
      to_snapshot_id
    );

    return NextResponse.json({
      success: true,
      data: changes,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to get changes between snapshots',
      },
      { status: 500 }
    );
  }
}

