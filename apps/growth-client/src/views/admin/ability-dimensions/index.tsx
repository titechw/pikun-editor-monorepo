import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Drawer, Form, Input, InputNumber, Select, Space, Spin, Tabs, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  abilityDimensionListStore,
  AbilityDimensionOperationType,
  type AbilityDimensionListItem,
} from '@/stores/admin-ability-dimensions';
import './AbilityDimensions.less';

/**
 * 能力维度管理页面
 */
export const AbilityDimensions = observer((): React.JSX.Element => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingDimension, setEditingDimension] = useState<AbilityDimensionListItem | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    abilityDimensionListStore.loadCategories();
    abilityDimensionListStore.fetchData();
  }, []);

  useEffect(() => {
    if (abilityDimensionListStore.categories.length > 0 && !abilityDimensionListStore.activeTab) {
      abilityDimensionListStore.setActiveTab(abilityDimensionListStore.categories[0].category_id);
    }
  }, [abilityDimensionListStore.categories]);

  const handleCreate = (): void => {
    setEditingDimension(null);
    form.resetFields();
    // 如果当前有选中的分类，设置为默认值
    if (abilityDimensionListStore.activeTab) {
      form.setFieldsValue({ category_id: abilityDimensionListStore.activeTab });
    }
    setDrawerVisible(true);
  };

  const handleEdit = (dimension: AbilityDimensionListItem): void => {
    setEditingDimension(dimension);
    form.setFieldsValue(dimension);
    setDrawerVisible(true);
  };

  const handleDelete = (dimensionId: string): void => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个能力维度吗？',
      onOk: async () => {
        const dimension = abilityDimensionListStore.data.find((item) => item.dimension_id === dimensionId);
        if (dimension) {
          await abilityDimensionListStore.handleOperation(
            AbilityDimensionOperationType.Delete,
            dimension
          );
        }
      },
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      if (editingDimension) {
        await abilityDimensionListStore.updateDimension(editingDimension.dimension_id, values);
      } else {
        await abilityDimensionListStore.createDimension(values);
      }
      setDrawerVisible(false);
      setEditingDimension(null);
      form.resetFields();
    } catch (error) {
      // 错误已在 Store 中处理
    }
  };

  // 渲染维度卡片
  const renderDimensionCard = (dimension: AbilityDimensionListItem) => {
    const category = abilityDimensionListStore.categories.find((c) => c.category_id === dimension.category_id);

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
  const tabItems = abilityDimensionListStore.categories.map((category) => {
    const categoryDimensions = abilityDimensionListStore.data
      .filter((d) => d.category_id === category.category_id)
      .slice()
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

  if (abilityDimensionListStore.loading && abilityDimensionListStore.data.length === 0) {
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
        activeKey={abilityDimensionListStore.activeTab}
        onChange={abilityDimensionListStore.setActiveTab}
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
              {abilityDimensionListStore.categories.map((category) => (
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
});

