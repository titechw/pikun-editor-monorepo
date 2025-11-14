import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Drawer, Form, Input, InputNumber, Select, message, Space } from 'antd';
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
  const [form] = Form.useForm();

  useEffect(() => {
    loadCategories();
    loadDimensions();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await adminAbilityApi.getCategories();
      setCategories(data);
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

  const columns = [
    {
      title: '类别',
      key: 'category',
      render: (_: any, record: AbilityDimension) => {
        const category = categories.find((c) => c.category_id === record.category_id);
        return category?.name || record.category_id;
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
      render: (_: any, record: AbilityDimension) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.dimension_id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="ability-dimensions">
      <div className="header">
        <h1>能力维度管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新增维度
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dimensions}
        loading={loading}
        rowKey="dimension_id"
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

