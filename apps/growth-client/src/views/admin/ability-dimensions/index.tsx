import React, { useEffect, useState } from 'react';
import { Button, Modal, Drawer, Form, Input, InputNumber, Select, message, Space, Spin, Tabs, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminAbilityApi } from '@/api/admin-ability.api';
import type { AbilityDimension, AbilityCategory } from '@/api/ability.api';
import './AbilityDimensions.less';

/**
 * 能力维度管理页面
 */
export const AbilityDimensions = (): React.JSX.Element => {
  const [dimensions, setDimensions] = useState<AbilityDimension[]>([]);
  const [categories, setCategories] = useState<AbilityCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingDimension, setEditingDimension] = useState<AbilityDimension | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const [form] = Form.useForm();

  useEffect(() => {
    loadCategories();
    loadDimensions();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].category_id);
    }
  }, [categories]);

  const loadCategories = async () => {
    try {
      const data = await adminAbilityApi.getCategories();
      const sorted = data.sort((a, b) => a.sort_order - b.sort_order);
      setCategories(sorted);
      if (sorted.length > 0 && !activeTab) {
        setActiveTab(sorted[0].category_id);
      }
    } catch (error: any) {
      message.error(error.message || '加载类别失败');
    }
  };

  const loadDimensions = async () => {
    setLoading(true);
    try {
      const data = await adminAbilityApi.getDimensions();
      setDimensions(data);
    } catch (error: any) {
      message.error(error.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingDimension(null);
    form.resetFields();
    // 如果当前有选中的分类，设置为默认值
    if (activeTab) {
      form.setFieldsValue({ category_id: activeTab });
    }
    setDrawerVisible(true);
  };

  const handleEdit = (dimension: AbilityDimension) => {
    setEditingDimension(dimension);
    form.setFieldsValue(dimension);
    setDrawerVisible(true);
  };

  const handleDelete = async (dimensionId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个能力维度吗？',
      onOk: async () => {
        try {
          await adminAbilityApi.deleteDimension(dimensionId);
          message.success('删除成功');
          loadDimensions();
        } catch (error: any) {
          message.error(error.message || '删除失败');
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingDimension) {
        await adminAbilityApi.updateDimension(editingDimension.dimension_id, values);
        message.success('更新成功');
      } else {
        await adminAbilityApi.createDimension(values);
        message.success('创建成功');
      }
      setDrawerVisible(false);
      setEditingDimension(null);
      form.resetFields();
      loadDimensions();
    } catch (error: any) {
      message.error(error.message || '操作失败');
    }
  };

  // 渲染维度卡片
  const renderDimensionCard = (dimension: AbilityDimension) => {
    const category = categories.find((c) => c.category_id === dimension.category_id);

    return (
      <div key={dimension.dimension_id} className="dimension-card">
        <div className="card-header">
          <div className="dimension-info">
            <div className="dimension-name">{dimension.name}</div>
            <div className="dimension-code">{dimension.code}</div>
          </div>
          <div className="dimension-actions">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(dimension)}
              title="编辑"
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(dimension.dimension_id)}
              title="删除"
            />
          </div>
        </div>
        <div className="card-body">
          {dimension.description && (
            <Tooltip title={dimension.description} placement="top">
              <div className="dimension-description">{dimension.description}</div>
            </Tooltip>
          )}
          <div className="dimension-stats">
            {category && (
              <div className="stat-item">
                <span className="stat-label">类别:</span>
                <span className="stat-value">{category.name}</span>
              </div>
            )}
            <div className="stat-item">
              <span className="stat-label">排序:</span>
              <span className="stat-value">{dimension.sort_order}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 准备 Tab 数据
  const tabItems = categories.map((category) => {
    const categoryDimensions = dimensions
      .filter((d) => d.category_id === category.category_id)
      .sort((a, b) => a.sort_order - b.sort_order);

    if (categoryDimensions.length === 0) return null;

    return {
      key: category.category_id,
      label: category.name,
      children: (
        <div className="dimensions-grid">
          {categoryDimensions.map((dimension) => renderDimensionCard(dimension))}
        </div>
      ),
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  if (loading && dimensions.length === 0) {
    return (
      <div className="ability-dimensions">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="ability-dimensions">
      <div className="header">
        <h1>能力维度管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新增维度
        </Button>
      </div>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="category-tabs"
      />
      <Drawer
        title={editingDimension ? '编辑能力维度' : '新增能力维度'}
        open={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setEditingDimension(null);
          form.resetFields();
        }}
        width={600}
        className="admin-drawer"
        rootClassName="admin-drawer-root"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="category_id"
            label="所属类别"
            rules={[{ required: true, message: '请选择类别' }]}
          >
            <Select placeholder="选择类别">
              {categories.map((category) => (
                <Select.Option key={category.category_id} value={category.category_id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="code"
            label="代码"
            rules={[{ required: true, message: '请输入代码' }]}
          >
            <Input placeholder="如：cognitive" />
          </Form.Item>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="如：认知能力" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} placeholder="维度描述" />
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
                setEditingDimension(null);
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

