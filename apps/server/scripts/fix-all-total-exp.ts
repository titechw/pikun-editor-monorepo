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

async function fixAllTotalExp() {
  const client = await pool.connect();
  try {
    // 设置 search_path
    await client.query('SET search_path TO pikun_db, public');

    // 查询所有用户能力等级记录
    const levelsResult = await client.query(
      'SELECT ual.user_level_id, ual.uid, ual.item_id, ual.current_level, ual.current_exp, ual.total_exp, ai.name as item_name FROM pikun_db.user_ability_levels ual JOIN pikun_db.ability_items ai ON ual.item_id = ai.item_id ORDER BY ual.uid, ai.name'
    );

    console.log(`找到 ${levelsResult.rows.length} 条用户等级记录\n`);

    let fixedCount = 0;
    let correctCount = 0;

    // 对每条记录，根据经验日志重新计算 total_exp
    for (const level of levelsResult.rows) {
      const { user_level_id, uid, item_id, current_level, current_exp, total_exp, item_name } = level;

      // 查询该用户该能力项的所有经验日志（只统计 exp_amount > 0 的记录）
      const logsResult = await client.query(
        'SELECT SUM(exp_amount) as total FROM pikun_db.user_ability_experience_logs WHERE uid = $1 AND item_id = $2 AND exp_amount > 0',
        [uid, item_id]
      );

      const calculatedTotalExp = logsResult.rows[0].total
        ? Number(logsResult.rows[0].total)
        : 0;

      const currentTotalExp = Number(total_exp);

      // 如果数据不一致，更新数据库
      if (currentTotalExp !== calculatedTotalExp) {
        console.log(
          `[修复] 用户 ${uid} - ${item_name} - 当前: ${currentTotalExp.toLocaleString()}, 计算: ${calculatedTotalExp.toLocaleString()}`
        );
        await client.query(
          'UPDATE pikun_db.user_ability_levels SET total_exp = $1 WHERE user_level_id = $2',
          [calculatedTotalExp, user_level_id]
        );
        fixedCount++;
      } else {
        correctCount++;
      }
    }

    console.log(`\n修复完成！`);
    console.log(`修复了 ${fixedCount} 条记录`);
    console.log(`${correctCount} 条记录数据正确`);
  } catch (error) {
    console.error('修复过程中出错:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

fixAllTotalExp()
  .then(() => {
    console.log('脚本执行完成');
    process.exit(0);
  })
  .catch((error) => {
    console.error('脚本执行失败:', error);
    process.exit(1);
  });

