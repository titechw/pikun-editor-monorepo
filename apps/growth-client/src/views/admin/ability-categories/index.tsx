import React, { useEffect, useState } from 'react';
import { Button, Modal, Drawer, Form, Input, InputNumber, message, Space, Spin, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminAbilityApi } from '@/api/admin-ability.api';
import type { AbilityCategory } from '@/api/ability.api';
import './AbilityCategories.less';

/**
 * 能力类别管理页面
 */
export const AbilityCategories = (): React.JSX.Element => {
  const [categories, setCategories] = useState<AbilityCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AbilityCategory | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await adminAbilityApi.getCategories();
      setCategories(data);
    } catch (error: any) {
      message.error(error.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCategory(null);
    form.resetFields();
    setDrawerVisible(true);
  };

  const handleEdit = (category: AbilityCategory) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setDrawerVisible(true);
  };

  const handleDelete = async (categoryId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个能力类别吗？',
      onOk: async () => {
        try {
          await adminAbilityApi.deleteCategory(categoryId);
          message.success('删除成功');
          loadCategories();
        } catch (error: any) {
          message.error(error.message || '删除失败');
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await adminAbilityApi.updateCategory(editingCategory.category_id, values);
        message.success('更新成功');
      } else {
        await adminAbilityApi.createCategory(values);
        message.success('创建成功');
      }
      setDrawerVisible(false);
      setEditingCategory(null);
      form.resetFields();
      loadCategories();
    } catch (error: any) {
      message.error(error.message || '操作失败');
    }
  };

  if (loading && categories.length === 0) {
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
        {categories.map((category) => (
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
};

