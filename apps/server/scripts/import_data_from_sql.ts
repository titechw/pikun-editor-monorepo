import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// 加载环境变量
dotenv.config({ path: resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const pool = new Pool({ connectionString });

// 导入顺序（按依赖关系排序）
const importOrder = [
  'data_users.sql',
  'data_workspaces.sql',
  'data_ability_categories.sql',
  'data_ability_dimensions.sql',
  'data_ability_items.sql',
  'data_ability_item_level_configs.sql',
  'data_subject_categories.sql',
  'data_subjects.sql',
  'data_courses.sql',
  'data_course_contents.sql',
  'data_course_ability_bindings.sql',
  'data_assessments.sql',
  'data_user_ability_levels.sql',
  'data_user_ability_experience_logs.sql',
];

async function clearAllData() {
  const client = await pool.connect();
  try {
    await client.query('SET search_path TO pikun_db, public');
    console.log('开始清空所有数据...\n');

    // 按依赖顺序删除（从子表到父表）
    const tables = [
      'user_ability_experience_logs',
      'user_ability_levels',
      'ability_item_level_configs',
      'ability_items',
      'ability_dimensions',
      'ability_categories',
      'subject_categories',
      'subjects',
      'courses',
      'course_contents',
      'course_ability_bindings',
      'assessments',
      'workspaces',
      'users',
    ];

    for (const table of tables) {
      try {
        const result = await client.query(`DELETE FROM pikun_db.${table}`);
        console.log(`✓ 清空 ${table} (${result.rowCount} 条记录)`);
      } catch (error: any) {
        if (error.code === '42P01') {
          // 表不存在，跳过
          console.log(`⚠ 表 ${table} 不存在，跳过`);
        } else {
          throw error;
        }
      }
    }

    console.log('\n数据清空完成！\n');
  } catch (error) {
    console.error('清空数据过程中出错:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function importSqlFile(client: any, filePath: string, sortByLevel: boolean = false) {
  try {
    let sql = readFileSync(filePath, 'utf-8');
    
    // 移除文件中的 BEGIN/COMMIT，我们会在外层统一管理事务
    sql = sql.replace(/^\s*BEGIN\s*;?\s*$/gim, '');
    sql = sql.replace(/^\s*COMMIT\s*;?\s*$/gim, '');
    
    // 分割 SQL 语句（按分号）
    let statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => {
        // 过滤掉空语句和注释
        if (s.length === 0) return false;
        if (s.startsWith('--')) return false;
        // 过滤掉 SET search_path 等设置语句（已经在连接时设置）
        if (s.match(/^\s*SET\s+search_path/i)) return false;
        return true;
      });

    // 如果是 subject_categories，按 level 排序（先导入 level=1，再 level=2，最后 level=3）
    if (sortByLevel) {
      statements = statements.sort((a, b) => {
        const getLevel = (stmt: string): number => {
          const match = stmt.match(/,\s*(\d+)\s*,\s*'/);
          return match ? parseInt(match[1], 10) : 999;
        };
        return getLevel(a) - getLevel(b);
      });
    }

    // 使用事务，如果出错则回滚
    await client.query('BEGIN');
    try {
      for (const statement of statements) {
        if (statement.trim()) {
          // 确保语句以分号结尾（pg 需要）
          const finalStatement = statement.endsWith(';') ? statement : statement + ';';
          await client.query(finalStatement);
        }
      }
      await client.query('COMMIT');
    } catch (error: any) {
      await client.query('ROLLBACK');
      throw error;
    }
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log(`⚠ 文件 ${filePath} 不存在，跳过`);
      return;
    }
    throw error;
  }
}

async function checkTableExists(client: any, tableName: string): Promise<boolean> {
  const result = await client.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'pikun_db' 
      AND table_name = $1
    )
  `, [tableName]);
  return result.rows[0].exists;
}

async function createMissingTables() {
  const client = await pool.connect();
  try {
    await client.query('SET search_path TO pikun_db, public');
    console.log('检查并创建缺失的表...\n');

    const migrationsDir = resolve(__dirname, '../migrations');

    // 检查并创建学科分类系统表
    const subjectCategoriesExists = await checkTableExists(client, 'subject_categories');
    if (!subjectCategoriesExists) {
      console.log('创建学科分类系统表...');
      const sql = readFileSync(resolve(migrationsDir, '010_create_subject_classification_system_tables.sql'), 'utf-8');
      await client.query(sql);
      console.log('✓ 学科分类系统表创建完成');
      
      // 创建路径函数
      try {
        console.log('创建学科分类路径函数...');
        const pathFunctionSql = readFileSync(resolve(migrationsDir, '011_create_subject_category_path_function.sql'), 'utf-8');
        await client.query(pathFunctionSql);
        console.log('✓ 路径函数创建完成\n');
      } catch (error: any) {
        console.log('⚠ 路径函数可能已存在，跳过\n');
      }
    } else {
      console.log('✓ 学科分类系统表已存在\n');
    }

    // 检查并创建课程训练系统表
    const coursesExists = await checkTableExists(client, 'courses');
    if (!coursesExists) {
      console.log('创建课程训练系统表...');
      const sql = readFileSync(resolve(migrationsDir, '007_create_course_training_system_tables.sql'), 'utf-8');
      await client.query(sql);
      console.log('✓ 课程训练系统表创建完成\n');
    } else {
      console.log('✓ 课程训练系统表已存在\n');
    }

    // 检查并创建游戏场景系统表
    const gameScenariosExists = await checkTableExists(client, 'game_scenarios');
    if (!gameScenariosExists) {
      console.log('创建游戏场景系统表...');
      const sql = readFileSync(resolve(migrationsDir, '009_create_game_scenario_system_tables.sql'), 'utf-8');
      await client.query(sql);
      console.log('✓ 游戏场景系统表创建完成\n');
    } else {
      console.log('✓ 游戏场景系统表已存在\n');
    }
  } catch (error) {
    console.error('创建表过程中出错:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function importAllData() {
  const client = await pool.connect();
  try {
    await client.query('SET search_path TO pikun_db, public');
    console.log('开始导入数据...\n');

    const dataDir = resolve(__dirname, '../../../data');

    for (const fileName of importOrder) {
      const filePath = resolve(dataDir, fileName);
      console.log(`正在导入: ${fileName}...`);
      try {
        // subject_categories 需要按 level 排序导入
        const sortByLevel = fileName === 'data_subject_categories.sql';
        await importSqlFile(client, filePath, sortByLevel);
        console.log(`✓ ${fileName} 导入完成\n`);
      } catch (error: any) {
        // 如果是表不存在的错误，跳过
        if (error.message && error.message.includes('does not exist')) {
          console.log(`⚠ ${fileName} 导入跳过（相关表不存在）\n`);
        } else {
          console.error(`❌ ${fileName} 导入失败:`, error.message);
          // 继续导入其他文件
        }
      }
    }

    console.log('数据导入完成！');
  } catch (error) {
    console.error('导入过程中出错:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function main() {
  try {
    // 先创建缺失的表
    await createMissingTables();

    // 再清空所有数据
    await clearAllData();

    // 最后导入新数据
    await importAllData();

    console.log('\n所有操作完成！');
  } catch (error) {
    console.error('执行失败:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// 执行主函数
main();

