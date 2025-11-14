import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Space,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminAbilityApi } from '@/api/admin-ability.api';
import type { AbilityItem, AbilityDimension } from '@/api/ability.api';
import './AbilityItems.less';

/**
 * 能力项管理页面
 */
export const AbilityItems = (): React.JSX.Element => {
  const [items, setItems] = useState<AbilityItem[]>([]);
  const [dimensions, setDimensions] = useState<AbilityDimension[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<AbilityItem | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadDimensions();
    loadItems();
  }, []);

  const loadDimensions = async () => {
    try {
      const data = await adminAbilityApi.getDimensions();
      setDimensions(data);
    } catch (error: any) {
      message.error(error.message || '加载维度失败');
    }
  };

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await adminAbilityApi.getItems();
      setItems(data);
    } catch (error: any) {
      message.error(error.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    setDrawerVisible(true);
  };

  const handleEdit = (item: AbilityItem) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setDrawerVisible(true);
  };

  const handleDelete = async (itemId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个能力项吗？',
      onOk: async () => {
        try {
          await adminAbilityApi.deleteItem(itemId);
          message.success('删除成功');
          loadItems();
        } catch (error: any) {
          message.error(error.message || '删除失败');
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingItem) {
        await adminAbilityApi.updateItem(editingItem.item_id, values);
        message.success('更新成功');
      } else {
        await adminAbilityApi.createItem(values);
        message.success('创建成功');
      }
      setDrawerVisible(false);
      setEditingItem(null);
      form.resetFields();
      loadItems();
    } catch (error: any) {
      message.error(error.message || '操作失败');
    }
  };

  const columns = [
    {
      title: '维度',
      key: 'dimension',
      render: (_: any, record: AbilityItem) => {
        const dimension = dimensions.find((d) => d.dimension_id === record.dimension_id);
        return dimension?.name || record.dimension_id;
      },
    },
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '排序',
      dataIndex: 'sort_order',
      key: 'sort_order',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AbilityItem) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.item_id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="ability-items">
      <div className="header">
        <h1>能力项管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新增能力项
        </Button>
      </div>
      <Table columns={columns} dataSource={items} loading={loading} rowKey="item_id" />
      <Drawer
        title={editingItem ? '编辑能力项' : '新增能力项'}
        open={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setEditingItem(null);
          form.resetFields();
        }}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="dimension_id"
            label="所属维度"
            rules={[{ required: true, message: '请选择维度' }]}
          >
            <Select placeholder="选择维度">
              {dimensions.map((dimension) => (
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
};

