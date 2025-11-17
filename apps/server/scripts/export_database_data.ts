import 'dotenv/config';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 导出数据库所有表的数据为 SQL 文件
 */
async function exportDatabaseData() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const pool = new Pool({ connectionString });
  // 输出到项目根目录的 data 目录
  const outputDir = path.join(__dirname, '../../../data');

  // 创建 data 目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // 获取所有表名
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'pikun_db' 
        AND table_type = 'BASE TABLE' 
      ORDER BY table_name;
    `);

    const tables = tablesResult.rows.map((row) => row.table_name);

    console.log(`找到 ${tables.length} 个表，开始导出...`);

    // 为每个表导出数据
    for (const tableName of tables) {
      try {
        console.log(`正在导出表: ${tableName}...`);

        // 获取表的所有数据
        const dataResult = await pool.query(`
          SELECT * FROM pikun_db.${tableName}
          ORDER BY 
            CASE 
              WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'pikun_db' AND table_name = '${tableName}' AND column_name = 'created_at') 
              THEN 'created_at' 
              ELSE NULL 
            END,
            CASE 
              WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'pikun_db' AND table_name = '${tableName}' AND column_name = 'id') 
              THEN 'id' 
              ELSE NULL 
            END;
        `);

        // 获取表的列信息
        const columnsResult = await pool.query(`
          SELECT column_name, data_type, udt_name
          FROM information_schema.columns
          WHERE table_schema = 'pikun_db' AND table_name = $1
          ORDER BY ordinal_position;
        `, [tableName]);

        const columns = columnsResult.rows.map((row) => row.column_name);
        const rows = dataResult.rows;

        if (rows.length === 0) {
          console.log(`  表 ${tableName} 没有数据，跳过`);
          continue;
        }

        // 生成 SQL INSERT 语句
        const sqlLines: string[] = [];
        sqlLines.push(`-- 导出表: ${tableName}`);
        sqlLines.push(`-- 数据行数: ${rows.length}`);
        sqlLines.push(`-- 导出时间: ${new Date().toISOString()}`);
        sqlLines.push('');
        sqlLines.push(`SET search_path TO pikun_db, public;`);
        sqlLines.push('');

        // 批量生成 INSERT 语句（每1000条一个事务）
        const batchSize = 1000;
        for (let i = 0; i < rows.length; i += batchSize) {
          const batch = rows.slice(i, i + batchSize);
          
          sqlLines.push('BEGIN;');
          sqlLines.push('');

          for (const row of batch) {
            const values = columns.map((col) => {
              const value = row[col];
              if (value === null || value === undefined) {
                return 'NULL';
              }

              // 处理不同的数据类型
              const columnInfo = columnsResult.rows.find((c) => c.column_name === col);
              const dataType = columnInfo?.data_type;
              const udtName = columnInfo?.udt_name;

              // JSON/JSONB 类型
              if (dataType === 'json' || dataType === 'jsonb' || udtName === 'json' || udtName === 'jsonb') {
                return `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`;
              }

              // 数组类型
              if (dataType === 'ARRAY' || (Array.isArray(value) && udtName)) {
                const arrayStr = JSON.stringify(value).replace(/'/g, "''");
                return `'${arrayStr}'::${udtName}`;
              }

              // 字符串类型
              if (typeof value === 'string') {
                return `'${value.replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
              }

              // 日期类型
              if (value instanceof Date) {
                return `'${value.toISOString()}'`;
              }

              // 布尔类型
              if (typeof value === 'boolean') {
                return value ? 'TRUE' : 'FALSE';
              }

              // 数字类型
              if (typeof value === 'number') {
                return value.toString();
              }

              // Buffer 类型（BYTEA）
              if (Buffer.isBuffer(value)) {
                return `'\\x${value.toString('hex')}'`;
              }

              // 默认转字符串
              return `'${String(value).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
            });

            sqlLines.push(
              `INSERT INTO pikun_db.${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')}) ON CONFLICT DO NOTHING;`
            );
          }

          sqlLines.push('');
          sqlLines.push('COMMIT;');
          sqlLines.push('');
        }

        // 写入文件
        const fileName = `data_${tableName}.sql`;
        const filePath = path.join(outputDir, fileName);
        fs.writeFileSync(filePath, sqlLines.join('\n'), 'utf-8');

        console.log(`  ✓ 已导出 ${rows.length} 行数据到 ${fileName}`);
      } catch (error: any) {
        console.error(`  ✗ 导出表 ${tableName} 失败:`, error.message);
      }
    }

    // 生成一个汇总文件，包含所有表的导入顺序
    const summaryLines: string[] = [];
    summaryLines.push('-- 数据库数据导出汇总');
    summaryLines.push(`-- 导出时间: ${new Date().toISOString()}`);
    summaryLines.push(`-- 表数量: ${tables.length}`);
    summaryLines.push('');
    summaryLines.push('-- 导入顺序（按依赖关系排序）:');
    summaryLines.push('');

    // 按照依赖关系排序（先导入没有外键依赖的表）
    const orderedTables = [
      'users',
      'workspaces',
      'ability_categories',
      'ability_dimensions',
      'ability_items',
      'ability_item_level_configs',
      'subject_categories',
      'subjects',
      'subject_details',
      'subject_ability_bindings',
      'courses',
      'course_contents',
      'course_ability_bindings',
      'assessments',
      'game_scenarios',
      'scenario_course_bindings',
      'npcs',
      'quests',
      'documents',
      'document_snapshots',
      'document_changes',
      'document_embeddings',
      'workspace_members',
      'refresh_tokens',
      'user_ability_levels',
      'user_ability_experience_logs',
      'user_course_progress',
      'user_training_records',
      'user_assessment_records',
      'game_sessions',
      'user_quest_records',
    ];

    // 只包含实际存在的表
    const existingOrderedTables = orderedTables.filter((t) => tables.includes(t));
    // 添加未在排序列表中的表
    const remainingTables = tables.filter((t) => !existingOrderedTables.includes(t));
    const finalOrderedTables = [...existingOrderedTables, ...remainingTables];

    for (const tableName of finalOrderedTables) {
      summaryLines.push(`\\i data_${tableName}.sql`);
    }

    const summaryPath = path.join(outputDir, '00_import_all_data.sql');
    fs.writeFileSync(summaryPath, summaryLines.join('\n'), 'utf-8');

    console.log('');
    console.log(`✓ 导出完成！所有文件已保存到: ${outputDir}`);
    console.log(`✓ 汇总文件: 00_import_all_data.sql`);
    console.log(`✓ 共导出 ${tables.length} 个表的数据`);
  } catch (error: any) {
    console.error('导出失败:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// 执行导出
exportDatabaseData()
  .then(() => {
    console.log('导出脚本执行完成');
    process.exit(0);
  })
  .catch((error) => {
    console.error('导出脚本执行失败:', error);
    process.exit(1);
  });

