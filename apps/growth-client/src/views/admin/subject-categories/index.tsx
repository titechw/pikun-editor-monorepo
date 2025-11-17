import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Drawer, Form, Input, InputNumber, Space, Spin, Tree, Tooltip, Select, Pagination } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import {
  subjectCategoryListStore,
  SubjectCategoryOperationType,
  type SubjectCategoryListItem,
} from '@/stores/admin-subject-categories';
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
    subjectCategoryListStore.loadCategoryTree();
    subjectCategoryListStore.fetchData();
  }, []);

  // 处理树节点展开（懒加载）
  const handleTreeExpand = async (expandedKeys: React.Key[], info: any) => {
    if (info.expanded) {
      const nodeKey = info.node.key as string;
      // 如果节点还没有加载过子节点，则加载
      if (!subjectCategoryListStore.loadedNodes.has(nodeKey)) {
        await subjectCategoryListStore.loadCategoryChildren(nodeKey);
      }
    }
  };

  // 处理搜索
  const handleSearch = (value: string): void => {
    subjectCategoryListStore.setSearchKeyword(value);
    subjectCategoryListStore.fetchData();
  };

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
    } catch (error) {
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

  // 构建树形数据
  const buildTreeData = (categories: SubjectCategoryListItem[]): any[] => {
    return categories.map((cat) => ({
      title: (
        <div className="tree-node">
          <Tooltip title={cat.name} placement="right">
            <span className="tree-node-name">{cat.name}</span>
          </Tooltip>
          <span className="tree-node-code">({cat.code})</span>
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
      key: cat.category_id,
      children: cat.children ? buildTreeData(cat.children) : undefined,
    }));
  };

  const treeData = buildTreeData(subjectCategoryListStore.categoryTree);

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
            <Input
              placeholder="搜索分类..."
              prefix={<SearchOutlined />}
              allowClear
              onChange={(e) => handleSearch(e.target.value)}
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#fff' }}
            />
          </div>
          <div className="tree-content">
            <Spin spinning={subjectCategoryListStore.loading}>
              <Tree
                treeData={treeData}
                selectedKeys={selectedKeys}
                onSelect={handleTreeSelect}
                onExpand={handleTreeExpand}
                showLine
                blockNode
                loadData={async (node: any) => {
                  const nodeKey = node.key as string;
                  if (!subjectCategoryListStore.loadedNodes.has(nodeKey)) {
                    await subjectCategoryListStore.loadCategoryChildren(nodeKey);
                  }
                }}
              />
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

