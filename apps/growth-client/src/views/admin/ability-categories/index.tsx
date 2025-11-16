import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Drawer, Form, Input, InputNumber, Space, Spin, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  abilityCategoryListStore,
  AbilityCategoryOperationType,
  type AbilityCategoryListItem,
} from '@/stores/admin-ability-categories';
import './AbilityCategories.less';

/**
 * 能力类别管理页面
 */
export const AbilityCategories = observer((): React.JSX.Element => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AbilityCategoryListItem | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    abilityCategoryListStore.fetchData();
  }, []);

  const handleCreate = (): void => {
    setEditingCategory(null);
    form.resetFields();
    setDrawerVisible(true);
  };

  const handleEdit = (category: AbilityCategoryListItem): void => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setDrawerVisible(true);
  };

  const handleDelete = (categoryId: string): void => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个能力类别吗？',
      onOk: async () => {
        const category = abilityCategoryListStore.data.find((item) => item.category_id === categoryId);
        if (category) {
          await abilityCategoryListStore.handleOperation(
            AbilityCategoryOperationType.Delete,
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
        await abilityCategoryListStore.updateCategory(editingCategory.category_id, values);
      } else {
        await abilityCategoryListStore.createCategory(values);
      }
      setDrawerVisible(false);
      setEditingCategory(null);
      form.resetFields();
    } catch (error) {
      // 错误已在 Store 中处理
    }
  };

  if (abilityCategoryListStore.loading && abilityCategoryListStore.data.length === 0) {
    return (
      <div className="ability-categories">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="ability-categories">
      <div className="header">
        <h1>能力类别管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新增类别
        </Button>
      </div>
      <div className="categories-grid">
        {abilityCategoryListStore.data.map((category) => (
          <div key={category.category_id} className="category-card">
            <div className="card-header">
              <div className="category-info">
                <div className="category-name">{category.name}</div>
                <div className="category-code">{category.code}</div>
              </div>
              <div className="category-actions">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(category)}
                  title="编辑"
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(category.category_id)}
                  title="删除"
                />
              </div>
            </div>
            <div className="card-body">
              {category.description && (
                <Tooltip title={category.description} placement="top">
                  <div className="category-description">{category.description}</div>
                </Tooltip>
              )}
              <div className="category-stats">
                <div className="stat-item">
                  <span className="stat-label">排序:</span>
                  <span className="stat-value">{category.sort_order}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Drawer
        title={editingCategory ? '编辑能力类别' : '新增能力类别'}
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
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="code"
            label="代码"
            rules={[{ required: true, message: '请输入代码' }]}
          >
            <Input placeholder="如：core" />
          </Form.Item>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="如：核心底层能力" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} placeholder="类别描述" />
          </Form.Item>
          <Form.Item name="sort_order" label="排序" initialValue={0}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button onClick={() => {
                setDrawerVisible(false);
                setEditingCategory(null);
                form.resetFields();
              }}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
});

