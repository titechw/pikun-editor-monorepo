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
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  abilityItemListStore,
  AbilityItemOperationType,
  type AbilityItemListItem,
} from '@/stores/admin-ability-items';
import './AbilityItems.less';

/**
 * 能力项管理页面
 */
export const AbilityItems = observer((): React.JSX.Element => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<AbilityItemListItem | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    abilityItemListStore.loadCategories();
    abilityItemListStore.loadDimensions();
    abilityItemListStore.fetchData();
  }, []);

  useEffect(() => {
    if (abilityItemListStore.categories.length > 0 && !abilityItemListStore.activeTab) {
      abilityItemListStore.setActiveTab(abilityItemListStore.categories[0].category_id);
    }
  }, [abilityItemListStore.categories]);

  const handleCreate = (): void => {
    setEditingItem(null);
    form.resetFields();
    // 如果当前有选中的分类，找到该分类下的第一个维度作为默认值
    if (abilityItemListStore.activeTab) {
      const categoryDimensions = abilityItemListStore.dimensions
        .filter((dim) => {
          const category = abilityItemListStore.categories.find((c) => c.category_id === abilityItemListStore.activeTab);
          return category && dim.category_id === category.category_id;
        })
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order);
      
      if (categoryDimensions.length > 0) {
        form.setFieldsValue({ dimension_id: categoryDimensions[0].dimension_id });
      }
    }
    setDrawerVisible(true);
  };

  const handleEdit = (item: AbilityItemListItem): void => {
    setEditingItem(item);
    form.setFieldsValue({
      ...item,
      talent_ratio: item.talent_ratio ?? 50,
      acquired_training_ratio: item.acquired_training_ratio ?? 50,
    });
    setDrawerVisible(true);
  };

  const handleDelete = (itemId: string): void => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个能力项吗？',
      onOk: async () => {
        const item = abilityItemListStore.data.find((i) => i.item_id === itemId);
        if (item) {
          await abilityItemListStore.handleOperation(
            AbilityItemOperationType.Delete,
            item
          );
        }
      },
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      if (editingItem) {
        await abilityItemListStore.updateItem(editingItem.item_id, values);
      } else {
        await abilityItemListStore.createItem(values);
      }
      setDrawerVisible(false);
      setEditingItem(null);
      form.resetFields();
    } catch (error) {
      // 错误已在 Store 中处理
    }
  };

  // 渲染能力项卡片
  const renderItemCard = (item: AbilityItemListItem) => {
    const dimension = abilityItemListStore.dimensions.find((d) => d.dimension_id === item.dimension_id);

    return (
      <div key={item.item_id} className="item-card">
        <div className="card-header">
          <div className="item-info">
            <div className="item-name">{item.name}</div>
            <div className="item-code">{item.code}</div>
          </div>
          <div className="item-actions">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(item)}
              title="编辑"
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(item.item_id)}
              title="删除"
            />
          </div>
        </div>
        <div className="card-body">
          {item.description && (
            <Tooltip title={item.description} placement="top">
              <div className="item-description">{item.description}</div>
            </Tooltip>
          )}
          <div className="item-stats">
            {dimension && (
              <div className="stat-item">
                <span className="stat-label">维度:</span>
                <span className="stat-value">{dimension.name}</span>
              </div>
            )}
            {item.talent_ratio !== null && item.talent_ratio !== undefined && (
              <div className="stat-item">
                <span className="stat-label">天赋:</span>
                <span className="stat-value">{item.talent_ratio}%</span>
              </div>
            )}
            {item.acquired_training_ratio !== null && item.acquired_training_ratio !== undefined && (
              <div className="stat-item">
                <span className="stat-label">训练:</span>
                <span className="stat-value">{item.acquired_training_ratio}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 准备 Tab 数据
  const tabItems = abilityItemListStore.categories.map((category) => {
    const categoryDimensions = abilityItemListStore.dimensions
      .filter((d) => d.category_id === category.category_id)
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order);

    return {
      key: category.category_id,
      label: category.name,
      children: (
        <div className="content-container">
          <div className="category-content">
            {categoryDimensions.map((dimension) => {
              const dimensionItems = abilityItemListStore.data
                .filter((item) => item.dimension_id === dimension.dimension_id)
                .slice()
                .sort((a, b) => a.sort_order - b.sort_order);

              if (dimensionItems.length === 0) return null;

              return (
                <div key={dimension.dimension_id} className="dimension-section">
                  <h3 className="dimension-title">{dimension.name}</h3>
                  <div className="items-grid">
                    {dimensionItems.map((item) => renderItemCard(item))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
    };
  });

  if (abilityItemListStore.loading && abilityItemListStore.data.length === 0) {
    return (
      <div className="ability-items">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="ability-items">
      <div className="header">
        <h1>能力项管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新增能力项
        </Button>
      </div>
      <Tabs
        activeKey={abilityItemListStore.activeTab}
        onChange={abilityItemListStore.setActiveTab}
        items={tabItems}
        className="category-tabs"
      />
      <Drawer
        title={editingItem ? '编辑能力项' : '新增能力项'}
        open={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setEditingItem(null);
          form.resetFields();
        }}
        width={800}
        className="admin-drawer"
        rootClassName="admin-drawer-root"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="dimension_id"
            label="所属维度"
            rules={[{ required: true, message: '请选择维度' }]}
          >
            <Select placeholder="选择维度">
              {abilityItemListStore.dimensions.map((dimension) => (
                <Select.Option key={dimension.dimension_id} value={dimension.dimension_id}>
                  {dimension.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="code"
            label="代码"
            rules={[{ required: true, message: '请输入代码' }]}
          >
            <Input placeholder="如：logical_thinking" />
          </Form.Item>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="如：逻辑思维" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} placeholder="能力项描述" />
          </Form.Item>
          <Form.Item name="definition" label="定义">
            <Input.TextArea rows={3} placeholder="能力项定义" />
          </Form.Item>
          <Form.Item name="performance_description" label="具体表现">
            <Input.TextArea rows={3} placeholder="具体表现描述" />
          </Form.Item>
          <Form.Item name="evaluation_points" label="评估要点">
            <Input.TextArea rows={3} placeholder="评估要点" />
          </Form.Item>
          <Form.Item name="training_strategies" label="锻炼策略">
            <Input.TextArea rows={3} placeholder="锻炼策略" />
          </Form.Item>
          <Form.Item name="theoretical_basis" label="理论依据">
            <Input.TextArea rows={3} placeholder="理论依据" />
          </Form.Item>
          <Form.Item
            name="talent_ratio"
            label="天赋占比 (%)"
            initialValue={50}
            rules={[
              { required: true, message: '请输入天赋占比' },
              { type: 'number', min: 0, max: 100, message: '天赋占比必须在 0-100 之间' },
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              precision={2}
              step={1}
              placeholder="0-100"
              onChange={(value) => {
                if (value !== null && value !== undefined) {
                  form.setFieldsValue({
                    acquired_training_ratio: Number((100 - value).toFixed(2)),
                  });
                }
              }}
            />
          </Form.Item>
          <Form.Item
            name="acquired_training_ratio"
            label="后天训练占比 (%)"
            initialValue={50}
            rules={[
              { required: true, message: '请输入后天训练占比' },
              { type: 'number', min: 0, max: 100, message: '后天训练占比必须在 0-100 之间' },
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              precision={2}
              step={1}
              placeholder="0-100"
              onChange={(value) => {
                if (value !== null && value !== undefined) {
                  form.setFieldsValue({
                    talent_ratio: Number((100 - value).toFixed(2)),
                  });
                }
              }}
            />
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
                setEditingItem(null);
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

