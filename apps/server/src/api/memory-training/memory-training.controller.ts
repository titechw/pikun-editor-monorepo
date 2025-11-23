import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { injectable, inject } from 'tsyringe';
import { MemoryTrainingService } from '@/services/memory-training.service';
import { getCurrentUserId } from '@/utils/auth';

/**
 * 记忆训练控制器
 */
@injectable()
export class MemoryTrainingController {
  constructor(
    @inject(MemoryTrainingService) private memoryTrainingService: MemoryTrainingService
  ) {}

  /**
   * 获取游戏列表
   */
  async getGames(req: NextRequest): Promise<NextResponse> {
    try {
      const games = await this.memoryTrainingService.getPublishedGames();
      return NextResponse.json({
        success: true,
        data: games,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '获取游戏列表失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取游戏详情
   */
  async getGame(req: NextRequest, { gameId }: { gameId: string }): Promise<NextResponse> {
    try {
      const game = await this.memoryTrainingService.getGame(gameId);
      if (!game) {
        return NextResponse.json(
          {
            success: false,
            message: '游戏不存在',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: game,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '获取游戏详情失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取游戏关卡列表（包含用户进度）
   */
  async getLevels(req: NextRequest, { gameId }: { gameId: string }): Promise<NextResponse> {
    try {
      const uid = await getCurrentUserId(req);
      const levels = await this.memoryTrainingService.getLevelsWithProgress(gameId, uid);
      return NextResponse.json({
        success: true,
        data: levels,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '获取关卡列表失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取关卡详情
   */
  async getLevel(req: NextRequest, { levelId }: { levelId: string }): Promise<NextResponse> {
    try {
      const level = await this.memoryTrainingService.getLevel(levelId);
      if (!level) {
        return NextResponse.json(
          {
            success: false,
            message: '关卡不存在',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: level,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '获取关卡详情失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 提交游戏结果
   */
  async submitResult(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        levelId: z.string().uuid(),
        resultData: z.object({
          correct: z.boolean(),
          correctRate: z.number().min(0).max(1),
          score: z.number().min(0),
          timeSpent: z.number().min(0),
          userAnswer: z.any(),
        }),
      });

      const validatedData = schema.parse(body);
      const uid = await getCurrentUserId(req);

      const result = await this.memoryTrainingService.submitResult(
        uid,
        validatedData.levelId,
        validatedData.resultData
      );

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: '参数验证失败',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || '提交结果失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取用户所有关卡进度
   */
  async getProgress(req: NextRequest): Promise<NextResponse> {
    try {
      const uid = await getCurrentUserId(req);
      const progress = await this.memoryTrainingService.getUserProgress(uid);
      return NextResponse.json({
        success: true,
        data: progress,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '获取进度失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取用户在指定游戏的进度
   */
  async getGameProgress(
    req: NextRequest,
    { gameId }: { gameId: string }
  ): Promise<NextResponse> {
    try {
      const uid = await getCurrentUserId(req);
      const progress = await this.memoryTrainingService.getUserGameProgress(uid, gameId);
      return NextResponse.json({
        success: true,
        data: progress,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '获取进度失败',
        },
        { status: 500 }
      );
    }
  }
}





