import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Drawer, Form, Input, InputNumber, Space, Spin, Tooltip, Select, Pagination } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  subjectCategoryListStore,
  SubjectCategoryOperationType,
  type SubjectCategoryListItem,
} from '@/stores/admin-subject-categories';
import { CustomTree, type TreeNodeData } from '@/components/CustomTree';
import { SearchInput } from '@/components/SearchInput';
import './SubjectCategories.less';

/**
 * 学科分类管理页面
 */
export const SubjectCategories = observer((): React.JSX.Element => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SubjectCategoryListItem | null>(null);
  const [form] = Form.useForm();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const loadData = async () => {
      await subjectCategoryListStore.loadCategoryTree();
      await subjectCategoryListStore.fetchData();
    };
    loadData();
  }, []);

  // 处理树节点展开
  const handleTreeExpand = useCallback((_expandedKeys: React.Key[], _info: { node: TreeNodeData<SubjectCategoryListItem>; expanded: boolean }): void => {
    // CustomTree 会自动处理懒加载
  }, []);

  // 处理搜索（搜索左侧树）- 只在失焦或按 Enter 时搜索
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearch = useCallback((value: string): void => {
    subjectCategoryListStore.setSearchKeyword(value);
    // 搜索只影响左侧树，不影响右侧列表
  }, []);

  const handleCreate = (parentId?: string | null): void => {
    setEditingCategory(null);
    form.resetFields();
    form.setFieldsValue({ parent_id: parentId || undefined, sort_order: 0 });
    setDrawerVisible(true);
  };

  const handleEdit = (category: SubjectCategoryListItem): void => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setDrawerVisible(true);
  };

  const handleDelete = (categoryId: string): void => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个学科分类吗？删除后其子分类也会被删除。',
      onOk: async () => {
        const category = subjectCategoryListStore.data.find((item) => item.category_id === categoryId);
        if (category) {
          await subjectCategoryListStore.handleOperation(
            SubjectCategoryOperationType.Delete,
            category
          );
        }
      },
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await subjectCategoryListStore.updateCategory(editingCategory.category_id, values);
      } else {
        await subjectCategoryListStore.createCategory(values);
      }
      setDrawerVisible(false);
      setEditingCategory(null);
      form.resetFields();
    } catch {
      // 错误已在 Store 中处理
    }
  };

  const handleTreeSelect = (selectedKeys: React.Key[]): void => {
    setSelectedKeys(selectedKeys);
    if (selectedKeys.length > 0) {
      const categoryId = selectedKeys[0] as string;
      subjectCategoryListStore.setSelectedParentId(categoryId);
      // setSelectedParentId 已经重置了 current 为 1，直接 fetchData 即可
      subjectCategoryListStore.fetchData();
    } else {
      subjectCategoryListStore.setSelectedParentId(null);
      // setSelectedParentId 已经重置了 current 为 1，直接 fetchData 即可
      subjectCategoryListStore.fetchData();
    }
  };

  // 构建树形数据（使用 useMemo 缓存，避免每次渲染都重新构建）
  const treeData = useMemo((): TreeNodeData<SubjectCategoryListItem>[] => {
    const categories = subjectCategoryListStore.filteredCategoryTree || subjectCategoryListStore.categoryTree || [];
    
    const buildTreeData = (cats: SubjectCategoryListItem[]): TreeNodeData<SubjectCategoryListItem>[] => {
      return cats.map((cat) => {
        // 如果已经有子节点数据，直接使用
        const hasLoadedChildren = cat.children && cat.children.length > 0;
        // 如果有子节点数量，则认为有子节点（用于懒加载）
        const hasChildrenCount = cat.children_count && cat.children_count > 0;
        // 如果已经有子节点数据，直接使用；否则根据 children_count 判断是否需要懒加载
        const children = hasLoadedChildren && cat.children
          ? buildTreeData(cat.children) 
          : undefined; // 不设置 children，让 Tree 组件通过 loadData 懒加载
        
        // 判断是否是叶子节点：没有已加载的子节点，也没有子节点数量
        const isLeaf = !hasLoadedChildren && !hasChildrenCount;
        
        return {
          key: cat.category_id,
          title: (
            <div className="tree-node">
              <Tooltip title={cat.name} placement="right">
                <span className="tree-node-name">{cat.name}</span>
              </Tooltip>
              <span className="tree-node-code">({cat.code})</span>
              {cat.children_count !== undefined && cat.children_count > 0 && (
                <span className="tree-node-count">({cat.children_count})</span>
              )}
              <div className="tree-node-actions">
                <Tooltip title="添加子分类">
                  <Button
                    type="text"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreate(cat.category_id);
                    }}
                  />
                </Tooltip>
                <Tooltip title="编辑">
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(cat);
                    }}
                  />
                </Tooltip>
                <Tooltip title="删除">
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(cat.category_id);
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          ),
          children,
          isLeaf,
          data: cat,
        };
      });
    };
    
    return buildTreeData(categories);
  }, [subjectCategoryListStore.filteredCategoryTree, subjectCategoryListStore.categoryTree]);

  return (
    <div className="subject-categories">
      <div className="header">
        <h2>学科分类管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleCreate(null)}>
          新增顶级分类
        </Button>
      </div>

      <div className="content">
        <div className="tree-container">
          <div className="tree-search">
            <SearchInput
              placeholder="搜索分类..."
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSearch}
            />
          </div>
          <div className="tree-content">
            <Spin spinning={subjectCategoryListStore.loading}>
              {!subjectCategoryListStore.loading && treeData.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
                  暂无数据
                </div>
              ) : (
                <CustomTree<SubjectCategoryListItem>
                  treeData={treeData}
                  selectedKeys={selectedKeys}
                  onSelect={handleTreeSelect}
                  onExpand={handleTreeExpand}
                  showLine
                  blockNode
                  loadingKeys={subjectCategoryListStore.loadingChildren}
                  loadData={async (node) => {
                    const nodeKey = node.key as string;
                    if (!subjectCategoryListStore.loadedNodes.has(nodeKey)) {
                      await subjectCategoryListStore.loadCategoryChildren(nodeKey);
                    }
                  }}
                />
              )}
            </Spin>
          </div>
        </div>

        <div className="list-container">
          <Spin spinning={subjectCategoryListStore.loading}>
            <div className="categories-grid">
              {subjectCategoryListStore.data.map((category) => (
                <div key={category.category_id} className="category-card">
                  <div className="card-header">
                    <div className="category-info">
                      <h3 className="category-name">{category.name}</h3>
                      <span className="category-code">{category.code}</span>
                    </div>
                    <Space className="category-actions">
                      <Button
                        type="link"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(category)}
                      >
                        编辑
                      </Button>
                      <Button
                        type="link"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(category.category_id)}
                      >
                        删除
                      </Button>
                    </Space>
                  </div>
                  <div className="card-body">
                    {category.description && (
                      <Tooltip title={category.description}>
                        <p className="category-description">{category.description}</p>
                      </Tooltip>
                    )}
                    <div className="category-stats">
                      <div className="stat-item">
                        <span className="stat-label">层级:</span>
                        <span className="stat-value">{category.level}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">排序:</span>
                        <span className="stat-value">{category.sort_order}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-container">
              <Pagination
                current={subjectCategoryListStore.pagination.current}
                pageSize={subjectCategoryListStore.pagination.pageSize}
                total={subjectCategoryListStore.pagination.total}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条`}
                onChange={(page, pageSize) => {
                  subjectCategoryListStore.setPagination({ current: page, pageSize });
                  subjectCategoryListStore.fetchData();
                }}
                onShowSizeChange={(current, size) => {
                  subjectCategoryListStore.setPagination({ current: 1, pageSize: size });
                  subjectCategoryListStore.fetchData();
                }}
              />
            </div>
          </Spin>
        </div>
      </div>

      <Drawer
        title={editingCategory ? '编辑学科分类' : '新增学科分类'}
        open={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setEditingCategory(null);
          form.resetFields();
        }}
        width={600}
        className="admin-drawer"
        rootClassName="admin-drawer-root"
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="parent_id" label="父分类">
            <Select
              placeholder="选择父分类（留空为顶级分类）"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={(() => {
                const buildOptions = (
                  categories: SubjectCategoryListItem[],
                  prefix = ''
                ): Array<{ label: string; value: string }> => {
                  const options: Array<{ label: string; value: string }> = [];
                  categories.forEach((cat) => {
                    const label = prefix ? `${prefix} > ${cat.name}` : cat.name;
                    options.push({ label, value: cat.category_id });
                    if (cat.children && cat.children.length > 0) {
                      options.push(...buildOptions(cat.children, label));
                    }
                  });
                  return options;
                };
                return buildOptions(subjectCategoryListStore.categoryTree);
              })()}
            />
          </Form.Item>
          <Form.Item name="code" label="代码" rules={[{ required: true, message: '请输入代码' }]}>
            <Input placeholder="如：110" />
          </Form.Item>
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]}>
            <Input placeholder="如：数学" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} placeholder="分类描述" />
          </Form.Item>
          <Form.Item name="icon_url" label="图标URL">
            <Input placeholder="图标URL" />
          </Form.Item>
          <Form.Item name="sort_order" label="排序">
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button
                onClick={() => {
                  setDrawerVisible(false);
                  setEditingCategory(null);
                  form.resetFields();
                }}
              >
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
});

