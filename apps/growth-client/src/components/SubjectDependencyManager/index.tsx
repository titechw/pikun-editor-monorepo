import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Modal,
  Form,
  Select,
  Radio,
  Button,
  Table,
  Tag,
  Space,
  message,
  Popconfirm,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminKnowledgeMapApi, type SubjectDependency } from '@/api/admin-subject.api';
import { adminSubjectApi, type Subject } from '@/api/admin-subject.api';
import './SubjectDependencyManager.less';

const { Option } = Select;

interface SubjectDependencyManagerProps {
  subjectId: string;
  subjectName: string;
  visible: boolean;
  onClose: () => void;
}

/**
 * 学科依赖关系管理组件
 */
export const SubjectDependencyManager = observer(
  ({ subjectId, subjectName, visible, onClose }: SubjectDependencyManagerProps): React.JSX.Element => {
    const [form] = Form.useForm();
    const [dependencies, setDependencies] = useState<SubjectDependency[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
      if (visible && subjectId) {
        loadDependencies();
        loadSubjects();
      }
    }, [visible, subjectId]);

    const loadDependencies = async () => {
      setLoading(true);
      try {
        const data = await adminKnowledgeMapApi.getSubjectDependencies(subjectId);
        setDependencies(data);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : '加载依赖关系失败';
        message.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    const loadSubjects = async () => {
      try {
        const result = await adminSubjectApi.getSubjects(null, {
          current: 1,
          pageSize: 10000,
        });
        // 过滤掉当前学科
        setSubjects(result.data.filter((s) => s.subject_id !== subjectId));
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : '加载学科列表失败';
        message.error(errorMessage);
      }
    };

    const handleAdd = async () => {
      try {
        const values = await form.validateFields();
        setAdding(true);
        await adminKnowledgeMapApi.createDependency({
          subject_id: subjectId,
          prerequisite_subject_id: values.prerequisite_subject_id,
          dependency_type: values.dependency_type,
        });
        message.success('添加依赖关系成功');
        form.resetFields();
        await loadDependencies();
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : '添加依赖关系失败';
        message.error(errorMessage);
      } finally {
        setAdding(false);
      }
    };

    const handleDelete = async (dependencyId: string) => {
      try {
        await adminKnowledgeMapApi.deleteDependency(dependencyId);
        message.success('删除依赖关系成功');
        await loadDependencies();
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : '删除依赖关系失败';
        message.error(errorMessage);
      }
    };

    const getSubjectName = (id: string): string => {
      const subject = subjects.find((s) => s.subject_id === id);
      return subject?.name || id;
    };

    const columns = [
      {
        title: '前置学科',
        dataIndex: 'prerequisite_subject_id',
        key: 'prerequisite_subject_id',
        render: (id: string) => getSubjectName(id),
      },
      {
        title: '依赖类型',
        dataIndex: 'dependency_type',
        key: 'dependency_type',
        render: (type: string) => (
          <Tag color={type === 'required' ? 'red' : 'blue'}>
            {type === 'required' ? '必需依赖' : '推荐依赖'}
          </Tag>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (_: unknown, record: SubjectDependency) => (
          <Popconfirm
            title="确定要删除这个依赖关系吗？"
            onConfirm={() => handleDelete(record.dependency_id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger size="small" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        ),
      },
    ];

    return (
      <Modal
        title={`管理依赖关系 - ${subjectName}`}
        open={visible}
        onCancel={onClose}
        footer={null}
        width={800}
        className="subject-dependency-manager"
      >
        <div className="dependency-form">
          <Form form={form} layout="inline" onFinish={handleAdd}>
            <Form.Item
              name="prerequisite_subject_id"
              label="前置学科"
              rules={[{ required: true, message: '请选择前置学科' }]}
            >
              <Select
                placeholder="选择前置学科"
                showSearch
                style={{ width: 300 }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {subjects.map((subject) => (
                  <Option key={subject.subject_id} value={subject.subject_id}>
                    {subject.name} ({subject.code})
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="dependency_type"
              label="依赖类型"
              initialValue="required"
              rules={[{ required: true, message: '请选择依赖类型' }]}
            >
              <Radio.Group>
                <Radio value="required">必需依赖</Radio>
                <Radio value="recommended">推荐依赖</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={adding}>
                添加
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="dependency-list">
          <Table
            columns={columns}
            dataSource={dependencies}
            rowKey="dependency_id"
            loading={loading}
            pagination={false}
            size="small"
          />
        </div>
      </Modal>
    );
  }
);



