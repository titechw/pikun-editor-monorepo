import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Modal,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
  Tabs,
  Tooltip,
  Switch,
  Pagination,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import {
  subjectListStore,
  SubjectOperationType,
  type SubjectListItem,
} from '@/stores/admin-subjects';
import './Subjects.less';

/**
 * 学科管理页面
 */
export const Subjects = observer((): React.JSX.Element => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectListItem | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    subjectListStore.loadCategories();
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

  const handleEdit = (subject: SubjectListItem): void => {
    setEditingSubject(subject);
    form.setFieldsValue(subject);
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

  const handleTabChange = (categoryId: string): void => {
    subjectListStore.setSelectedCategoryId(categoryId);
    subjectListStore.fetchData();
  };

  // 处理搜索
  const handleSearch = (value: string): void => {
    subjectListStore.setSearchKeyword(value);
    subjectListStore.fetchData();
  };

  // 按分类分组学科
  const categories = subjectListStore.categories.slice().sort((a, b) => a.sort_order - b.sort_order);
  const categoryGroups = categories.reduce((acc, category) => {
    const subjects = subjectListStore.data.filter((s) => s.category_id === category.category_id);
    if (subjects.length > 0 || category.category_id === subjectListStore.selectedCategoryId) {
      acc.push({ category, subjects });
    }
    return acc;
  }, [] as Array<{ category: typeof categories[0]; subjects: SubjectListItem[] }>);

  const tabItems = categories.map((category) => ({
    key: category.category_id,
    label: category.name,
  }));

  return (
    <div className="subjects">
      <div className="header">
        <h2>学科管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新增学科
        </Button>
      </div>

      <div className="content">
        <div className="header-actions">
          <Tabs
            activeKey={subjectListStore.selectedCategoryId || undefined}
            onChange={handleTabChange}
            items={tabItems}
            className="category-tabs"
          />
          <Input
            placeholder="搜索学科名称..."
            prefix={<SearchOutlined />}
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300, background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#fff' }}
          />
        </div>

        <Spin spinning={subjectListStore.loading}>
          <div className="subjects-grid">
            {subjectListStore.data.map((subject) => (
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
            ))}
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
              onShowSizeChange={(current, size) => {
                subjectListStore.setPagination({ current: 1, pageSize: size });
                subjectListStore.fetchData();
              }}
            />
          </div>
        </Spin>
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
            <Select placeholder="请选择分类">
              {categories.map((cat) => (
                <Select.Option key={cat.category_id} value={cat.category_id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
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

