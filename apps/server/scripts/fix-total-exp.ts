import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// 加载环境变量
dotenv.config({ path: resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function fixTotalExp() {
  const client = await pool.connect();
  try {
    // 设置 search_path
    await client.query('SET search_path TO pikun_db, public');

    // 1. 找到"情商"这个能力项
    const itemResult = await client.query(
      "SELECT item_id, name FROM pikun_db.ability_items WHERE name = '情商'"
    );

    if (itemResult.rows.length === 0) {
      console.log('未找到"情商"能力项');
      return;
    }

    const itemId = itemResult.rows[0].item_id;
    console.log(`找到"情商"能力项: ${itemId}`);

    // 2. 查询所有用户的"情商"能力等级数据
    const levelsResult = await client.query(
      'SELECT user_level_id, uid, current_level, current_exp, total_exp FROM pikun_db.user_ability_levels WHERE item_id = $1',
      [itemId]
    );

    console.log(`找到 ${levelsResult.rows.length} 条用户等级记录`);

    // 3. 对每条记录，根据经验日志重新计算 total_exp
    for (const level of levelsResult.rows) {
      const { user_level_id, uid, current_level, current_exp, total_exp } = level;

      // 查询该用户该能力项的所有经验日志（只统计 exp_amount > 0 的记录）
      const logsResult = await client.query(
        'SELECT SUM(exp_amount) as total FROM pikun_db.user_ability_experience_logs WHERE uid = $1 AND item_id = $2 AND exp_amount > 0',
        [uid, itemId]
      );

      const calculatedTotalExp = logsResult.rows[0].total
        ? Number(logsResult.rows[0].total)
        : 0;

      const currentTotalExp = Number(total_exp);

      console.log(
        `用户 ${uid} - 当前 total_exp: ${currentTotalExp.toLocaleString()}, 计算出的 total_exp: ${calculatedTotalExp.toLocaleString()}`
      );

      // 如果数据不一致，更新数据库
      if (currentTotalExp !== calculatedTotalExp) {
        console.log(`  -> 需要修复，更新 total_exp 为 ${calculatedTotalExp.toLocaleString()}`);
        await client.query(
          'UPDATE pikun_db.user_ability_levels SET total_exp = $1 WHERE user_level_id = $2',
          [calculatedTotalExp, user_level_id]
        );
        console.log(`  -> 已修复`);
      } else {
        console.log(`  -> 数据正确，无需修复`);
      }
    }

    console.log('\n修复完成！');
  } catch (error) {
    console.error('修复过程中出错:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

fixTotalExp()
  .then(() => {
    console.log('脚本执行完成');
    process.exit(0);
  })
  .catch((error) => {
    console.error('脚本执行失败:', error);
    process.exit(1);
  });

