import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { UserDAO } from '@/dao/user.dao';
import { WorkspaceDAO } from '@/dao/workspace.dao';
import type { User } from '@/entities';
import { Redis } from '@/core/redis';

/**
 * 认证服务
 */
@injectable()
export class AuthService {
  constructor(
    @inject('UserDAO') private userDAO: UserDAO,
    @inject('WorkspaceDAO') private workspaceDAO: WorkspaceDAO,
    private redis: Redis
  ) {
    this.redis = Redis.getInstance();
  }

  /**
   * 用户注册
   */
  async register(data: { email: string; password: string; name: string }): Promise<{
    user: Omit<User, 'password'>;
    token: string;
    refreshToken: string;
    defaultWorkspaceId: string;
  }> {
    // 检查邮箱是否已存在
    const existingUser = await this.userDAO.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 创建用户
    const user = await this.userDAO.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
    });

    // 创建默认工作空间
    const defaultWorkspace = await this.workspaceDAO.create({
      name: '我的工作空间',
      owner_uid: user.uid,
    });

    // 生成 token
    const token = this.generateToken(user.uid, user.uuid);
    const refreshToken = this.generateRefreshToken(user.uid);

    // 保存刷新令牌到数据库（这里简化处理，实际应该保存到数据库）
    await this.redis.set(`refresh_token:${refreshToken}`, user.uid.toString(), 30 * 24 * 60 * 60); // 30天

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
      refreshToken,
      defaultWorkspaceId: defaultWorkspace.workspace_id,
    };
  }

  /**
   * 用户登录
   */
  async login(
    email: string,
    password: string
  ): Promise<{
    user: Omit<User, 'password'>;
    token: string;
    refreshToken: string;
    defaultWorkspaceId: string;
  }> {
    const user = await this.userDAO.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    // 获取或创建默认工作空间
    const defaultWorkspace = await this.workspaceDAO.getOrCreateDefault(user.uid);

    // 生成 token
    const token = this.generateToken(user.uid, user.uuid);
    const refreshToken = this.generateRefreshToken(user.uid);

    // 保存刷新令牌
    await this.redis.set(`refresh_token:${refreshToken}`, user.uid.toString(), 30 * 24 * 60 * 60);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
      refreshToken,
      defaultWorkspaceId: defaultWorkspace.workspace_id,
    };
  }

  /**
   * 刷新 token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    const uidStr = await this.redis.get(`refresh_token:${refreshToken}`);
    if (!uidStr) {
      throw new Error('Invalid refresh token');
    }

    const uid = parseInt(uidStr, 10);
    const user = await this.userDAO.findByUid(uid);
    if (!user) {
      throw new Error('User not found');
    }

    // 生成新 token
    const token = this.generateToken(user.uid, user.uuid);
    const newRefreshToken = this.generateRefreshToken(user.uid);

    // 更新刷新令牌
    await this.redis.del(`refresh_token:${refreshToken}`);
    await this.redis.set(
      `refresh_token:${newRefreshToken}`,
      user.uid.toString(),
      30 * 24 * 60 * 60
    );

    return {
      token,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * 验证 token
   */
  async verifyToken(token: string): Promise<{ uid: number; uuid: string }> {
    try {
      const secret = process.env.JWT_SECRET || 'your-secret-key';
      const decoded = jwt.verify(token, secret) as { uid: number; uuid: string };
      return decoded;
    } catch {
      throw new Error('Invalid token');
    }
  }

  /**
   * 生成 JWT token
   */
  private generateToken(uid: number, uuid: string): string {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jwt.sign({ uid, uuid }, secret, { expiresIn } as SignOptions);
  }

  /**
   * 生成刷新 token
   */
  private generateRefreshToken(uid: number): string {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
    return jwt.sign({ uid, type: 'refresh' }, secret, { expiresIn } as SignOptions);
  }
}
