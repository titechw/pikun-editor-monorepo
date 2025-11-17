import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { TreeSelect, Spin } from 'antd';
import type { TreeNodeData } from '@/components/CustomTree';
import type { SubjectCategoryListItem } from '@/stores/admin-subject-categories';
import './CategoryTreeSelect.less';

export interface CategoryTreeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  treeData: SubjectCategoryListItem[];
  loadData?: (categoryId: string) => Promise<void>;
  loadCategoryPath?: (categoryId: string) => Promise<void>; // 加载分类路径（用于回填）
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 分类树形选择器组件
 * 用于在表单中选择学科分类
 */
export const CategoryTreeSelect = React.memo<CategoryTreeSelectProps>(({
  value,
  onChange,
  treeData,
  loadData,
  loadCategoryPath,
  placeholder = '请选择分类',
  allowClear = true,
  disabled = false,
  className = '',
  style,
}): React.JSX.Element => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [loadingKeys, setLoadingKeys] = useState<Set<string>>(new Set());
  const [searchValue, setSearchValue] = useState('');
  const [valueLoaded, setValueLoaded] = useState(false);

  // 将 SubjectCategoryListItem[] 转换为 TreeSelect 需要的格式
  const convertToTreeSelectData = useCallback((categories: SubjectCategoryListItem[]): any[] => {
    return categories.map((cat) => {
      const hasChildren = (cat.children && cat.children.length > 0) || (cat.children_count && cat.children_count > 0);
      const isLoading = loadingKeys.has(cat.category_id);
      
      return {
        title: `${cat.name} (${cat.code})`,
        value: cat.category_id,
        key: cat.category_id,
        children: cat.children ? convertToTreeSelectData(cat.children) : undefined,
        isLeaf: !hasChildren,
        data: cat,
        // 添加 loading 状态
        loading: isLoading,
      };
    });
  }, [loadingKeys]);

  const treeSelectData = useMemo(() => {
    return convertToTreeSelectData(treeData);
  }, [treeData, convertToTreeSelectData]);

  // 检查 value 是否在原始 treeData 中（使用原始数据，避免循环依赖）
  const findNodeInTreeData = useCallback((categories: SubjectCategoryListItem[], targetValue: string): SubjectCategoryListItem | null => {
    for (const cat of categories) {
      if (cat.category_id === targetValue) {
        return cat;
      }
      if (cat.children) {
        const found = findNodeInTreeData(cat.children, targetValue);
        if (found) return found;
      }
    }
    return null;
  }, []);

  // 当 value 变化时，如果 treeData 中没有对应的节点，加载分类路径
  useEffect(() => {
    if (value && loadCategoryPath) {
      const node = findNodeInTreeData(treeData, value);
      if (!node && !valueLoaded) {
        // 如果 treeData 中没有对应的节点，加载分类路径
        setValueLoaded(true); // 先标记为已加载，避免重复请求
        loadCategoryPath(value).catch((error) => {
          console.error('加载分类路径失败:', error);
        });
      }
    } else if (!value) {
      setValueLoaded(false);
    }
  }, [value, treeData, valueLoaded, loadCategoryPath, findNodeInTreeData]);

  // 处理树节点展开
  const handleTreeExpand = useCallback((expandedKeys: React.Key[]): void => {
    setExpandedKeys(expandedKeys.map((key) => String(key)));
  }, []);

  // 处理树节点加载
  const handleLoadData = useCallback(async (node: any): Promise<void> => {
    const categoryId = node.value || node.key;
    if (!categoryId || loadingKeys.has(categoryId)) {
      return Promise.resolve();
    }

    // 如果节点已经有子节点数据，不需要加载
    if (node.children && node.children.length > 0) {
      return Promise.resolve();
    }

    // 如果是叶子节点，不需要加载
    if (node.isLeaf) {
      return Promise.resolve();
    }

    setLoadingKeys((prev) => new Set(prev).add(categoryId));
    try {
      if (loadData) {
        await loadData(categoryId);
      }
      return Promise.resolve();
    } catch (error) {
      console.error('加载分类数据失败:', error);
      return Promise.reject(error);
    } finally {
      setLoadingKeys((prev) => {
        const next = new Set(prev);
        next.delete(categoryId);
        return next;
      });
    }
  }, [loadData, loadingKeys]);

  // 处理值变化
  const handleChange = useCallback((newValue: string): void => {
    if (onChange) {
      onChange(newValue);
    }
  }, [onChange]);

  // 自定义搜索过滤函数
  const filterTreeNode = useCallback((inputValue: string, node: any): boolean => {
    if (!inputValue) {
      return true;
    }
    const searchText = inputValue.toLowerCase();
    const title = node.title || '';
    const code = node.data?.code || '';
    const name = node.data?.name || '';
    
    // 搜索名称或代码
    return (
      title.toLowerCase().includes(searchText) ||
      code.toLowerCase().includes(searchText) ||
      name.toLowerCase().includes(searchText)
    );
  }, []);

  // 处理搜索值变化
  const handleSearch = useCallback((value: string): void => {
    setSearchValue(value);
  }, []);

  return (
    <TreeSelect
      value={value}
      onChange={handleChange}
      treeData={treeSelectData}
      placeholder={placeholder}
      allowClear={allowClear}
      disabled={disabled}
      showSearch
      searchValue={searchValue}
      onSearch={handleSearch}
      filterTreeNode={filterTreeNode}
      treeDefaultExpandAll={false}
      treeExpandedKeys={expandedKeys}
      onTreeExpand={handleTreeExpand}
      loadData={handleLoadData}
      treeNodeFilterProp="title"
      className={`category-tree-select ${className}`}
      style={style}
      // 自定义树节点渲染，显示 loading 状态
      treeNodeLabelProp="title"
    />
  );
});

CategoryTreeSelect.displayName = 'CategoryTreeSelect';
