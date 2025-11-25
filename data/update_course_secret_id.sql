-- 为现有课程生成 secret_id
-- 课程 ID: 05f7be01-7a71-414b-981d-a460201c9628

SET search_path TO pikun_db, public;

UPDATE pikun_db.courses
SET secret_id = '946ef157af341617dc809a8dc6c2df91de60d0697b0a958bfab530ae5ac28743',
    updated_at = CURRENT_TIMESTAMP
WHERE course_id = '05f7be01-7a71-414b-981d-a460201c9628'
  AND deleted_at IS NULL;

-- 验证更新结果
SELECT course_id, name, secret_id, updated_at
FROM pikun_db.courses
WHERE course_id = '05f7be01-7a71-414b-981d-a460201c9628';

