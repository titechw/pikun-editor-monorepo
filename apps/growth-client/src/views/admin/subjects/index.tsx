import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Modal,
  Drawer,
  Form,
  Input,
  InputNumber,
  Space,
  Spin,
  Tooltip,
  Switch,
  Pagination,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  subjectListStore,
  SubjectOperationType,
  type SubjectListItem,
} from '@/stores/admin-subjects';
import { CustomTree, type TreeNodeData } from '@/components/CustomTree';
import { SearchInput } from '@/components/SearchInput';
import { CategoryTreeSelect } from '@/components/CategoryTreeSelect';
import type { SubjectCategoryListItem } from '@/stores/admin-subject-categories';
import './Subjects.less';

/**
 * 学科管理页面
 */
export const Subjects = observer((): React.JSX.Element => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectListItem | null>(null);
  const [form] = Form.useForm();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState(''); // 学科搜索关键词

  useEffect(() => {
    const loadData = async () => {
      await subjectListStore.loadCategoryTree();
      await subjectListStore.fetchData();
    };
    loadData();
  }, []);

  // 处理树节点展开
  const handleTreeExpand = useCallback((_expandedKeys: React.Key[], _info: { node: TreeNodeData<SubjectCategoryListItem>; expanded: boolean }): void => {
    // CustomTree 会自动处理懒加载
  }, []);

  // 处理分类树搜索（搜索左侧分类树）
  const [categorySearchValue, setCategorySearchValue] = useState('');
  
  const handleCategorySearch = useCallback((value: string): void => {
    subjectListStore.setCategorySearchKeyword(value);
  }, []);

  // 处理学科搜索（搜索右侧学科列表）
  const handleSubjectSearch = useCallback((value: string): void => {
    subjectListStore.setSubjectSearchKeyword(value);
    subjectListStore.fetchData();
  }, []);

  const handleCreate = (): void => {
    setEditingSubject(null);
    form.resetFields();
    // 如果当前有选中的分类，设置为默认值
    if (subjectListStore.selectedCategoryId) {
      form.setFieldsValue({ category_id: subjectListStore.selectedCategoryId });
    }
    setDrawerVisible(true);
  };

  const handleEdit = async (subject: SubjectListItem): Promise<void> => {
    setEditingSubject(subject);
    form.setFieldsValue(subject);
    
    // 如果有关联的分类，加载完整的分类路径以便正确显示
    if (subject.category_id) {
      await loadCategoryPath(subject.category_id);
    }
    
    setDrawerVisible(true);
  };

  const handleDelete = (subjectId: string): void => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个学科吗？',
      onOk: async () => {
        const subject = subjectListStore.data.find((item) => item.subject_id === subjectId);
        if (subject) {
          await subjectListStore.handleOperation(SubjectOperationType.Delete, subject);
        }
      },
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      if (editingSubject) {
        await subjectListStore.updateSubject(editingSubject.subject_id, values);
      } else {
        await subjectListStore.createSubject(values);
      }
      setDrawerVisible(false);
      setEditingSubject(null);
      form.resetFields();
    } catch (error) {
      // 错误已在 Store 中处理
    }
  };

  const handleTreeSelect = (selectedKeys: React.Key[]): void => {
    setSelectedKeys(selectedKeys);
    if (selectedKeys.length > 0) {
      const categoryId = selectedKeys[0] as string;
      subjectListStore.setSelectedCategoryId(categoryId);
      subjectListStore.fetchData();
    } else {
      subjectListStore.setSelectedCategoryId(null);
      subjectListStore.fetchData();
    }
  };

  // 构建树形数据
  const treeData = useMemo((): TreeNodeData<SubjectCategoryListItem>[] => {
    const categories = subjectListStore.filteredCategoryTree || subjectListStore.categoryTree || [];
    
    const buildTreeData = (cats: SubjectCategoryListItem[]): TreeNodeData<SubjectCategoryListItem>[] => {
      return cats.map((cat) => {
        const hasLoadedChildren = cat.children && cat.children.length > 0;
        const hasChildrenCount = cat.children_count && cat.children_count > 0;
        const children = hasLoadedChildren && cat.children
          ? buildTreeData(cat.children) 
          : undefined;
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
            </div>
          ),
          children,
          isLeaf,
          data: cat,
        };
      });
    };
    
    return buildTreeData(categories);
  }, [subjectListStore.filteredCategoryTree, subjectListStore.categoryTree]);

  // 处理分类树懒加载（用于 CategoryTreeSelect）
  const handleLoadCategoryData = useCallback(async (categoryId: string): Promise<void> => {
    await subjectListStore.loadCategoryChildren(categoryId);
  }, []);

  // 根据 category_id 加载完整的分类路径（用于编辑时回填）
  const loadCategoryPath = useCallback(async (categoryId: string): Promise<void> => {
    await subjectListStore.loadCategoryPath(categoryId);
  }, []);

  return (
    <div className="subjects">
      <div className="header">
        <h2>学科管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新增学科
        </Button>
      </div>

      <div className="content">
        {/* 左侧分类树 */}
        <div className="tree-container">
          <div className="tree-search">
            <SearchInput
              placeholder="搜索分类..."
              value={categorySearchValue}
              onChange={setCategorySearchValue}
              onSearch={handleCategorySearch}
            />
          </div>
          <Spin spinning={subjectListStore.loading}>
            {!subjectListStore.loading && treeData.length === 0 ? (
              <div className="empty-state">暂无数据</div>
            ) : (
              <CustomTree
                treeData={treeData}
                selectedKeys={selectedKeys}
                onSelect={handleTreeSelect}
                onExpand={handleTreeExpand}
                loadData={async (node) => {
                  const nodeKey = node.key as string;
                  if (!subjectListStore.loadedNodes.has(nodeKey)) {
                    await subjectListStore.loadCategoryChildren(nodeKey);
                  }
                }}
                loadingKeys={subjectListStore.loadingChildren}
                showLine
                blockNode
                className="subject-category-tree"
              />
            )}
          </Spin>
        </div>

        {/* 右侧学科列表 */}
        <div className="subjects-panel">
          <div className="panel-header">
            <SearchInput
              placeholder="搜索学科名称..."
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSubjectSearch}
              style={{ width: 300 }}
            />
          </div>

          <Spin spinning={subjectListStore.loading}>
            <div className="subjects-grid">
              {subjectListStore.data.length === 0 ? (
                <div className="empty-state">暂无学科数据</div>
              ) : (
                subjectListStore.data.map((subject) => (
                  <div key={subject.subject_id} className="subject-card">
                    <div className="card-header">
                      <div className="subject-info">
                        <h3 className="subject-name">{subject.name}</h3>
                        <span className="subject-code">{subject.code}</span>
                      </div>
                      <Space className="subject-actions">
                        <Button
                          type="link"
                          size="small"
                          icon={<EditOutlined />}
                          onClick={() => handleEdit(subject)}
                        >
                          编辑
                        </Button>
                        <Button
                          type="link"
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(subject.subject_id)}
                        >
                          删除
                        </Button>
                      </Space>
                    </div>
                    <div className="card-body">
                      {subject.short_name && (
                        <div className="subject-short-name">简称: {subject.short_name}</div>
                      )}
                      <div className="subject-stats">
                        <div className="stat-item">
                          <span className="stat-label">排序:</span>
                          <span className="stat-value">{subject.sort_order}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">状态:</span>
                          <span className={`stat-value ${subject.is_published ? 'published' : 'draft'}`}>
                            {subject.is_published ? '已发布' : '草稿'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="pagination-container">
              <Pagination
                current={subjectListStore.pagination.current}
                pageSize={subjectListStore.pagination.pageSize}
                total={subjectListStore.pagination.total}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条`}
                onChange={(page, pageSize) => {
                  subjectListStore.setPagination({ current: page, pageSize });
                  subjectListStore.fetchData();
                }}
                onShowSizeChange={(_current, size) => {
                  subjectListStore.setPagination({ current: 1, pageSize: size });
                  subjectListStore.fetchData();
                }}
              />
            </div>
          </Spin>
        </div>
      </div>

      <Drawer
        title={editingSubject ? '编辑学科' : '新增学科'}
        open={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setEditingSubject(null);
          form.resetFields();
        }}
        width={600}
        className="admin-drawer"
        rootClassName="admin-drawer-root"
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="category_id"
            label="所属分类"
            rules={[{ required: true, message: '请选择所属分类' }]}
          >
            <CategoryTreeSelect
              placeholder="请选择分类"
              treeData={subjectListStore.categoryTree}
              loadData={handleLoadCategoryData}
              loadCategoryPath={loadCategoryPath}
            />
          </Form.Item>
          <Form.Item name="code" label="代码" rules={[{ required: true, message: '请输入代码' }]}>
            <Input placeholder="如：subject_1101410" />
          </Form.Item>
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]}>
            <Input placeholder="如：演绎逻辑学" />
          </Form.Item>
          <Form.Item name="short_name" label="简称">
            <Input placeholder="简称" />
          </Form.Item>
          <Form.Item name="icon_url" label="图标URL">
            <Input placeholder="图标URL" />
          </Form.Item>
          <Form.Item name="cover_image_url" label="封面图URL">
            <Input placeholder="封面图URL" />
          </Form.Item>
          <Form.Item name="sort_order" label="排序">
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item name="is_published" label="是否发布" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button
                onClick={() => {
                  setDrawerVisible(false);
                  setEditingSubject(null);
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
