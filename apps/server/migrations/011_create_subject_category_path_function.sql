-- 创建学科分类路径更新函数
-- 用于自动计算和更新分类的 path 字段

SET search_path TO pikun_db, public;

-- 创建函数：更新分类路径
CREATE OR REPLACE FUNCTION pikun_db.update_subject_category_path()
RETURNS TRIGGER AS $$
DECLARE
  parent_path TEXT;
  new_path TEXT;
BEGIN
  -- 如果是顶级分类（parent_id 为 NULL）
  IF NEW.parent_id IS NULL THEN
    NEW.path := '/' || NEW.category_id::TEXT;
  ELSE
    -- 获取父分类的路径
    SELECT path INTO parent_path
    FROM pikun_db.subject_categories
    WHERE category_id = NEW.parent_id;
    
    -- 构建新路径
    NEW.path := parent_path || '/' || NEW.category_id::TEXT;
    
    -- 计算层级
    NEW.level := (SELECT level FROM pikun_db.subject_categories WHERE category_id = NEW.parent_id) + 1;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器：插入或更新时自动计算路径
CREATE TRIGGER trigger_update_subject_category_path
  BEFORE INSERT OR UPDATE OF parent_id ON pikun_db.subject_categories
  FOR EACH ROW
  EXECUTE FUNCTION pikun_db.update_subject_category_path();

-- 创建函数：递归更新所有子分类的路径
CREATE OR REPLACE FUNCTION pikun_db.update_subject_category_children_path(parent_cat_id UUID)
RETURNS void AS $$
DECLARE
  child_record RECORD;
  parent_path TEXT;
BEGIN
  -- 获取父分类路径
  SELECT path INTO parent_path
  FROM pikun_db.subject_categories
  WHERE category_id = parent_cat_id;
  
  -- 更新所有子分类的路径和层级
  FOR child_record IN
    SELECT category_id, level
    FROM pikun_db.subject_categories
    WHERE parent_id = parent_cat_id
      AND deleted_at IS NULL
  LOOP
    UPDATE pikun_db.subject_categories
    SET 
      path = parent_path || '/' || child_record.category_id::TEXT,
      level = (SELECT level FROM pikun_db.subject_categories WHERE category_id = parent_cat_id) + 1
    WHERE category_id = child_record.category_id;
    
    -- 递归更新子分类的子分类
    PERFORM pikun_db.update_subject_category_children_path(child_record.category_id);
  END LOOP;
END;
$$ LANGUAGE plpgsql;

