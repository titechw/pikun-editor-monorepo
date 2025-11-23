import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Table,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
  Switch,
  Modal,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { courseListStore, CourseOperationType, type CourseListItem } from '@/stores/admin-courses';
import { SearchInput } from '@/components/SearchInput';
import { growthStore } from '@/stores/growth';
import { adminCourseApi } from '@/api/admin-course.api';
import './Courses.less';

const { Option } = Select;
const { TextArea } = Input;

/**
 * 课程管理页面
 */
export const Courses = observer((): React.JSX.Element => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseListItem | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    courseListStore.fetchData();
    if (growthStore.items.length === 0) {
      growthStore.loadData();
    }
  }, []);

  const handleCreate = (): void => {
    setEditingCourse(null);
    form.resetFields();
    form.setFieldsValue({
      course_source: 'official',
      course_type: 'ability_training',
      difficulty_level: 1,
      is_published: false,
      sort_order: 0,
    });
    setDrawerVisible(true);
  };

  const handleEdit = (course: CourseListItem): void => {
    setEditingCourse(course);
    form.setFieldsValue(course);
    setDrawerVisible(true);
  };

  const handleDelete = (courseId: string): void => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个课程吗？',
      onOk: async () => {
        const course = courseListStore.data.find((item) => item.course_id === courseId);
        if (course) {
          await courseListStore.handleOperation(CourseOperationType.Delete, course);
        }
      },
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      
      // 处理 secret_id：空字符串转换为 null（创建时自动生成，编辑时保持不变）
      if (values.secret_id === '') {
        values.secret_id = null;
      }
      
      if (editingCourse) {
        // 编辑时，如果 secret_id 为 null，则不传递该字段（保持原值）
        const updateData = { ...values };
        if (updateData.secret_id === null) {
          delete updateData.secret_id;
        }
        await adminCourseApi.updateCourse(editingCourse.course_id, updateData);
        message.success('更新成功');
      } else {
        await adminCourseApi.createCourse(values);
        message.success('创建成功');
      }
      setDrawerVisible(false);
      await courseListStore.fetchData();
    } catch (error: any) {
      if (error?.errorFields) {
        return; // 表单验证错误
      }
      const errorMessage = error instanceof Error ? error.message : '操作失败';
      message.error(errorMessage);
    }
  };

  const handleSearch = (keyword: string): void => {
    courseListStore.setFilter({ keyword });
    courseListStore.fetchData({ current: 1 });
  };

  const columns = [
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '课程代码',
      dataIndex: 'code',
      key: 'code',
      width: 150,
    },
    {
      title: '课程类型',
      dataIndex: 'course_type',
      key: 'course_type',
      width: 120,
      render: (type: string) => {
        const typeMap: Record<string, string> = {
          ability_training: '能力训练',
          skill_knowledge: '技能知识',
          learning: '学习型',
          training: '训练型',
          mixed: '混合型',
        };
        return typeMap[type] || type;
      },
    },
    {
      title: '课程来源',
      dataIndex: 'course_source',
      key: 'course_source',
      width: 100,
      render: (source: string) => (source === 'official' ? '官方' : '三方'),
    },
    {
      title: '作者',
      dataIndex: 'author_name',
      key: 'author_name',
      width: 120,
    },
    {
      title: '游戏URL',
      dataIndex: 'course_url',
      key: 'course_url',
      width: 200,
      ellipsis: true,
    },
    {
      title: '是否发布',
      dataIndex: 'is_published',
      key: 'is_published',
      width: 100,
      render: (published: boolean) => (published ? '是' : '否'),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: CourseListItem) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.course_id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="courses-page">
      <div className="page-header">
        <h2>课程管理</h2>
        <Space>
          <SearchInput
            placeholder="搜索课程名称、代码"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新建课程
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={courseListStore.data}
        loading={courseListStore.loading}
        rowKey="course_id"
        pagination={{
          current: courseListStore.pagination.current,
          pageSize: courseListStore.pagination.pageSize,
          total: courseListStore.pagination.total,
          onChange: (page, pageSize) => {
            courseListStore.setPagination({ current: page, pageSize });
            courseListStore.fetchData();
          },
        }}
      />

      <Drawer
        title={editingCourse ? '编辑课程' : '新建课程'}
        open={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          form.resetFields();
        }}
        width={600}
        footer={
          <Space>
            <Button onClick={() => setDrawerVisible(false)}>取消</Button>
            <Button type="primary" onClick={handleSubmit}>
              提交
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="code"
            label="课程代码"
            rules={[{ required: true, message: '请输入课程代码' }]}
          >
            <Input disabled={!!editingCourse} />
          </Form.Item>
          <Form.Item
            name="name"
            label="课程名称"
            rules={[{ required: true, message: '请输入课程名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="课程描述">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="course_type"
            label="课程类型"
            rules={[{ required: true, message: '请选择课程类型' }]}
          >
            <Select>
              <Option value="ability_training">能力训练</Option>
              <Option value="skill_knowledge">技能知识</Option>
              <Option value="learning">学习型</Option>
              <Option value="training">训练型</Option>
              <Option value="mixed">混合型</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="course_source"
            label="课程来源"
            rules={[{ required: true, message: '请选择课程来源' }]}
          >
            <Select>
              <Option value="official">官方课程</Option>
              <Option value="third_party">三方作者</Option>
            </Select>
          </Form.Item>
          <Form.Item name="author_name" label="作者名">
            <Input placeholder="官方课程默认为官方" />
          </Form.Item>
          <Form.Item name="course_url" label="游戏URL">
            <Input placeholder="http://localhost:3002/?secretId=xxx&courseId=xxx" />
          </Form.Item>
          <Form.Item
            name="secret_id"
            label="Secret ID (私钥)"
            tooltip="用于游戏调用经验增加接口的验证密钥，防止未授权调用。如果不填写，系统将自动生成（创建时）或保持不变（编辑时）。如果填写，至少需要 32 个字符（字母或数字）。"
            rules={[
              {
                validator: (_: any, value: string) => {
                  if (!value || value.trim() === '') {
                    return Promise.resolve(); // 允许为空
                  }
                  if (!/^[a-zA-Z0-9]{32,}$/.test(value)) {
                    return Promise.reject(new Error('Secret ID 至少需要 32 个字符（字母或数字）'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              placeholder={editingCourse ? '留空则不修改当前值' : '留空则自动生成'}
            />
          </Form.Item>
          <Form.Item
            name="primary_item_id"
            label="关联能力项"
            tooltip="选择该课程主要训练的能力"
          >
            <Select
              showSearch
              placeholder="选择能力项"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as string)?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {growthStore.items.map((item) => (
                <Option key={item.item_id} value={item.item_id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="difficulty_level" label="难度等级">
            <InputNumber min={1} max={10} />
          </Form.Item>
          <Form.Item name="estimated_duration" label="预计时长（分钟）">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="cover_image_url" label="封面图片URL">
            <Input />
          </Form.Item>
          <Form.Item name="sort_order" label="排序">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="is_published" label="是否发布" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
});

