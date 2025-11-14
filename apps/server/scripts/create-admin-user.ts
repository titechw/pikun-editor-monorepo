/**
 * 创建测试管理员账号脚本
 * 使用方法: npx tsx scripts/create-admin-user.ts
 */

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { Database } from '../src/core/database';

async function createAdminUser() {
  const db = Database.getInstance();

  // 测试管理员账号信息
  const email = 'admin@test.com';
  const password = 'admin123'; // 测试密码
  const name = '测试管理员';

  try {
    // 检查是否已存在
    const existing = await db.query(
      'SELECT uid FROM pikun_db.users WHERE email = $1 AND deleted_at IS NULL',
      [email]
    );

    if (existing.rows.length > 0) {
      console.log(`管理员账号已存在: ${email}`);
      console.log('如需重置密码，请先删除该账号或更新密码');
      return;
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 插入管理员账号
    const result = await db.query(
      `INSERT INTO pikun_db.users (email, password, name, type, metadata)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING uid, email, name, type`,
      [email, hashedPassword, name, 'admin', JSON.stringify({})]
    );

    console.log('✅ 管理员账号创建成功！');
    console.log('📧 邮箱:', email);
    console.log('🔑 密码:', password);
    console.log('👤 用户ID:', result.rows[0].uid);
    console.log('🔐 用户类型:', result.rows[0].type);
    console.log('\n⚠️  请妥善保管密码，生产环境请及时修改！');
  } catch (error) {
    console.error('❌ 创建失败:', error);
    process.exit(1);
  } finally {
    await db.close();
  }
}

createAdminUser();

