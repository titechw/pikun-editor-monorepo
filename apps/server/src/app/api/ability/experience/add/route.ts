import { NextRequest } from 'next/server';
import { z } from 'zod';
import '@/core/init';
import { Container } from '@/core/container';
import { ExperienceService } from '@/services/experience.service';
import { getCurrentUserId } from '@/utils/auth';

/**
 * POST /api/ability/experience/add - 增加经验值
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const schema = z.object({
      item_id: z.string().uuid(),
      exp_amount: z.number().int().min(1),
      exp_type: z.string().optional(),
      source_id: z.string().optional(),
      source_type: z.string().optional(),
      notes: z.string().optional(),
      metadata: z.record(z.any()).optional(),
    });

    const validatedData = schema.parse(body);
    
    const uid = await getCurrentUserId(req);

    const experienceService = Container.resolve<ExperienceService>(ExperienceService);
    const result = await experienceService.addExperience(
      uid,
      validatedData.item_id,
      validatedData.exp_amount,
      {
        expType: validatedData.exp_type,
        sourceId: validatedData.source_id,
        sourceType: validatedData.source_type,
        notes: validatedData.notes,
        metadata: validatedData.metadata,
      }
    );

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: false,
        message: error.message || 'Failed to add experience',
      },
      { status: 400 }
    );
  }
}

