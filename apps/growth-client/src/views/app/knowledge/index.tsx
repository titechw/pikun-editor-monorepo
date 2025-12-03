import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Typography, Select, Button, Modal, Form, Radio, message, Space, Tag } from 'antd';
import { BookOutlined, PlusOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { knowledgeMapStore } from '@/stores/knowledge-map';
import { KnowledgeMap } from '@/components/KnowledgeMap';
import type { KnowledgeMapNode, KnowledgeMapEdge } from '@/api/subject.api';
import './Knowledge.less';

// Connection类型定义（临时方案，等reactflow安装后可以删除）
interface Connection {
  source: string | null;
  target: string | null;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * 技能知识页面
 * 展示知识地图和学习路径
 */
export const Knowledge = observer((): React.JSX.Element => {
  const [form] = Form.useForm();
  const [addDependencyModalVisible, setAddDependencyModalVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState<KnowledgeMapNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<KnowledgeMapEdge | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    // 加载分类列表
    knowledgeMapStore.loadCategories();
  }, []);

  useEffect(() => {
    // 加载知识地图数据
    knowledgeMapStore.loadKnowledgeMap(categoryId);
    // 加载学科列表（用于添加依赖关系）
    knowledgeMapStore.loadSubjects(categoryId);
  }, [categoryId]);

  // 处理节点点击
  const handleNodeClick = useCallback((node: KnowledgeMapNode) => {
    setSelectedNode(node);
    // 可以在这里显示节点详情或跳转到学科详情页
  }, []);

  // 处理边点击
  const handleEdgeClick = useCallback((edge: KnowledgeMapEdge) => {
    setSelectedEdge(edge);
  }, []);

  // 处理连接（创建新的依赖关系）
  const handleConnect = useCallback(
    async (connection: Connection) => {
      if (!connection.source || !connection.target) {
        return;
      }

      // 找到对应的学科ID
      const sourceNode = knowledgeMapStore.nodes.find(
        (n) => (n.id || n.subject_id) === connection.source,
      );
      const targetNode = knowledgeMapStore.nodes.find(
        (n) => (n.id || n.subject_id) === connection.target,
      );

      if (!sourceNode || !targetNode) {
        message.error('无法找到对应的学科');
        return;
      }

      // 打开添加依赖关系的弹窗
      form.setFieldsValue({
        subject_id: targetNode.subject_id,
        prerequisite_subject_id: sourceNode.subject_id,
        dependency_type: 'required',
      });
      setAddDependencyModalVisible(true);
    },
    [form],
  );

  // 提交添加依赖关系
  const handleAddDependency = async () => {
    try {
      const values = await form.validateFields();
      await knowledgeMapStore.addDependency(
        values.subject_id,
        values.prerequisite_subject_id,
        values.dependency_type,
      );
      setAddDependencyModalVisible(false);
      form.resetFields();
    } catch (error) {
      // 表单验证失败或API调用失败
      if (error && typeof error === 'object' && 'errorFields' in error) {
        // 表单验证错误，不需要额外处理
        return;
      }
    }
  };

  // 删除依赖关系
  const handleDeleteDependency = async () => {
    if (!selectedEdge) {
      return;
    }

    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个依赖关系吗？',
      onOk: async () => {
        try {
          await knowledgeMapStore.removeDependency(selectedEdge.id);
          setSelectedEdge(null);
        } catch (error) {
          // 错误已在store中处理
        }
      },
    });
  };

  // 获取学科选项
  const getSubjectOptions = () => {
    return knowledgeMapStore.subjects.map((subject) => (
      <Option key={subject.subject_id} value={subject.subject_id}>
        {subject.name} ({subject.code})
      </Option>
    ));
  };

  return (
    <div className="knowledge-page">
      <div className="knowledge-header">
        <div className="header-left">
          <Title level={2}>
            <BookOutlined /> 知识地图
          </Title>
          <Text type="secondary">探索学科之间的学习路径和依赖关系</Text>
        </div>
        <div className="header-right">
          <Space>
            <Select
              placeholder="选择分类筛选"
              allowClear
              showSearch
              style={{ width: 200 }}
              value={categoryId}
              onChange={setCategoryId}
              filterOption={(input: string, option: any) => {
                const label =
                  typeof option?.label === 'string' ? option.label : String(option?.label || '');
                return label.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {knowledgeMapStore.categories.map((category) => (
                <Option
                  key={category.category_id}
                  value={category.category_id}
                  label={category.name}
                >
                  {category.name} ({category.code})
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setAddDependencyModalVisible(true)}
            >
              添加依赖关系
            </Button>
          </Space>
        </div>
      </div>

      <div className="knowledge-content">
        {knowledgeMapStore.loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : knowledgeMapStore.nodes.length === 0 ? (
          <div className="empty-container">
            <Text type="secondary">暂无知识地图数据</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              请先在管理端创建学科和依赖关系
            </Text>
          </div>
        ) : (
          <div className="knowledge-map-wrapper">
            <KnowledgeMap
              nodes={knowledgeMapStore.nodes}
              edges={knowledgeMapStore.edges}
              onNodeClick={handleNodeClick}
              onEdgeClick={handleEdgeClick}
              onConnect={handleConnect}
            />
          </div>
        )}
      </div>

      {/* 节点信息面板 */}
      {selectedNode && (
        <div className="node-info-panel">
          <div className="panel-header">
            <Title level={4}>学科信息</Title>
            <Button type="text" size="small" onClick={() => setSelectedNode(null)}>
              关闭
            </Button>
          </div>
          <div className="panel-content">
            <div className="info-item">
              <Text strong>学科名称：</Text>
              <Text>{selectedNode.name}</Text>
            </div>
            <div className="info-item">
              <Text strong>学科代码：</Text>
              <Text>{selectedNode.code}</Text>
            </div>
            {selectedNode.category_name && (
              <div className="info-item">
                <Text strong>分类：</Text>
                <Text>{selectedNode.category_name}</Text>
              </div>
            )}
            <div className="info-section">
              <Text strong>前置学科：</Text>
              <div className="dependencies-list">
                {knowledgeMapStore.getPrerequisites(selectedNode.subject_id).length === 0 ? (
                  <Text type="secondary">无</Text>
                ) : (
                  knowledgeMapStore.getPrerequisites(selectedNode.subject_id).map((node) => (
                    <Tag key={node.subject_id} color="blue">
                      {node.name}
                    </Tag>
                  ))
                )}
              </div>
            </div>
            <div className="info-section">
              <Text strong>后续学科：</Text>
              <div className="dependencies-list">
                {knowledgeMapStore.getDependents(selectedNode.subject_id).length === 0 ? (
                  <Text type="secondary">无</Text>
                ) : (
                  knowledgeMapStore.getDependents(selectedNode.subject_id).map((node) => (
                    <Tag key={node.subject_id} color="green">
                      {node.name}
                    </Tag>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 添加依赖关系弹窗 */}
      <Modal
        title="添加依赖关系"
        open={addDependencyModalVisible}
        onOk={handleAddDependency}
        onCancel={() => {
          setAddDependencyModalVisible(false);
          form.resetFields();
        }}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="subject_id"
            label="当前学科"
            rules={[{ required: true, message: '请选择当前学科' }]}
          >
            <Select placeholder="选择学科" showSearch optionFilterProp="children">
              {getSubjectOptions()}
            </Select>
          </Form.Item>
          <Form.Item
            name="prerequisite_subject_id"
            label="前置学科"
            rules={[{ required: true, message: '请选择前置学科' }]}
          >
            <Select placeholder="选择前置学科" showSearch optionFilterProp="children">
              {getSubjectOptions()}
            </Select>
          </Form.Item>
          <Form.Item
            name="dependency_type"
            label="依赖类型"
            rules={[{ required: true, message: '请选择依赖类型' }]}
          >
            <Radio.Group>
              <Radio value="required">必需依赖</Radio>
              <Radio value="recommended">推荐依赖</Radio>
            </Radio.Group>
          </Form.Item>
          <div style={{ marginTop: 16, padding: 12, background: '#f5f5f5', borderRadius: 4 }}>
            <InfoCircleOutlined style={{ marginRight: 8 }} />
            <Text type="secondary" style={{ fontSize: 12 }}>
              必需依赖：必须掌握前置学科才能学习当前学科
              <br />
              推荐依赖：建议先学习前置学科，但不是必须的
            </Text>
          </div>
        </Form>
      </Modal>

      {/* 删除依赖关系确认 */}
      {selectedEdge && (
        <Modal
          title="依赖关系信息"
          open={!!selectedEdge}
          onOk={handleDeleteDependency}
          onCancel={() => setSelectedEdge(null)}
          okText="删除"
          cancelText="关闭"
          okButtonProps={{ danger: true }}
        >
          <div>
            <Text>
              依赖类型：
              <Tag color={selectedEdge.dependency_type === 'required' ? 'red' : 'blue'}>
                {selectedEdge.dependency_type === 'required' ? '必需依赖' : '推荐依赖'}
              </Tag>
            </Text>
          </div>
        </Modal>
      )}
    </div>
  );
});
