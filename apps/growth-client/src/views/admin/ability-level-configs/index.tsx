import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Modal,
  Drawer,
  Form,
  Input,
  InputNumber,
  Switch,
  Select,
  Space,
  Tabs,
  Alert,
  Spin,
  Tooltip,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CopyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { abilityLevelConfigStore } from '@/stores/admin-ability-level-configs';
import type { AbilityItemLevelConfig } from '@/api/ability.api';
import './AbilityLevelConfigs.less';

/**
 * 能力项等级配置管理页面
 */
export const AbilityLevelConfigs = observer((): React.JSX.Element => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingConfig, setEditingConfig] = useState<AbilityItemLevelConfig | null>(null);
  const [copyModalVisible, setCopyModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    abilityLevelConfigStore.loadItems();
    abilityLevelConfigStore.loadTemplateConfigs();
  }, []);

  useEffect(() => {
    if (abilityLevelConfigStore.activeTab === 'item' && abilityLevelConfigStore.selectedItemId) {
      abilityLevelConfigStore.loadConfigs(abilityLevelConfigStore.selectedItemId);
    }
  }, [abilityLevelConfigStore.activeTab, abilityLevelConfigStore.selectedItemId]);

  const handleCreate = (): void => {
    if (abilityLevelConfigStore.activeTab === 'item' && !abilityLevelConfigStore.selectedItemId) {
      return;
    }
    setEditingConfig(null);
    form.resetFields();
    form.setFieldsValue({
      is_template: abilityLevelConfigStore.activeTab === 'template',
      item_id: abilityLevelConfigStore.activeTab === 'item' ? abilityLevelConfigStore.selectedItemId : null,
    });
    setDrawerVisible(true);
  };

  const handleEdit = (config: AbilityItemLevelConfig): void => {
    setEditingConfig(config);
    form.setFieldsValue(config);
    setDrawerVisible(true);
  };

  const handleDelete = (configId: string): void => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个等级配置吗？',
      onOk: async () => {
        await abilityLevelConfigStore.deleteConfig(configId);
      },
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      if (editingConfig) {
        await abilityLevelConfigStore.updateConfig(editingConfig.config_id, values);
      } else {
        // 确保正确传递 item_id 和 is_template
        const submitData = {
          ...values,
          item_id: abilityLevelConfigStore.activeTab === 'item' ? abilityLevelConfigStore.selectedItemId : null,
          is_template: abilityLevelConfigStore.activeTab === 'template',
        };
        await abilityLevelConfigStore.createConfig(submitData);
      }
      setDrawerVisible(false);
      setEditingConfig(null);
      form.resetFields();
    } catch {
      // 错误已在 Store 中处理
    }
  };

  const handleCopyToItem = (): void => {
    if (!abilityLevelConfigStore.selectedItemId) {
      return;
    }
    setCopyModalVisible(true);
  };

  const handleConfirmCopy = async (): Promise<void> => {
    try {
      await abilityLevelConfigStore.copyTemplateToItem(abilityLevelConfigStore.selectedItemId);
      setCopyModalVisible(false);
    } catch {
      // 错误已在 Store 中处理
    }
  };

  // 渲染配置卡片
  const renderConfigCard = (config: AbilityItemLevelConfig): React.JSX.Element => {
    return (
      <div key={config.config_id} className="config-card">
        <div className="card-header">
          <div className="config-info">
            <div className="config-level">Lv.{config.level}</div>
            {config.level_name && (
              <div className="config-level-name">{config.level_name}</div>
            )}
          </div>
          <div className="config-actions">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(config)}
              title="编辑"
            />
          <Button
              type="text"
            danger
            icon={<DeleteOutlined />}
              onClick={() => handleDelete(config.config_id)}
              title="删除"
            />
          </div>
        </div>
        <div className="card-body">
          <div className="config-stats">
            <div className="stat-item">
              <span className="stat-label">所需经验:</span>
              <span className="stat-value">{config.required_exp?.toLocaleString() || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">需要考核:</span>
              <span className={`stat-value ${config.requires_assessment ? 'yes' : 'no'}`}>
                {config.requires_assessment ? '是' : '否'}
              </span>
            </div>
          </div>
          {config.level_description && (
            <Tooltip title={config.level_description} placement="top">
              <div className="config-description">{config.level_description}</div>
            </Tooltip>
          )}
        </div>
      </div>
    );
  };

  if (abilityLevelConfigStore.loading && abilityLevelConfigStore.templateConfigs.length === 0 && abilityLevelConfigStore.configs.length === 0) {
    return (
      <div className="ability-level-configs">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="ability-level-configs">
      <div className="header">
        <h1>能力项等级配置管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新增配置
        </Button>
      </div>
      <Tabs
        activeKey={abilityLevelConfigStore.activeTab}
        onChange={abilityLevelConfigStore.setActiveTab}
        items={[
          {
            key: 'template',
            label: '全局模板',
            children: (
              <div className="configs-container">
                {abilityLevelConfigStore.loading && abilityLevelConfigStore.templateConfigs.length === 0 ? (
                  <div className="loading-container">
                    <Spin size="large" />
                  </div>
                ) : abilityLevelConfigStore.templateConfigs.length === 0 ? (
                  <div className="empty-container">
                    <div className="empty-text">暂无全局模板配置</div>
                  </div>
                ) : (
                  <div className="configs-grid">
                    {abilityLevelConfigStore.templateConfigs
                      .slice()
                      .sort((a, b) => (a.level || 0) - (b.level || 0))
                      .map((config) => renderConfigCard(config))}
                  </div>
                )}
              </div>
            ),
          },
          {
            key: 'item',
            label: '能力项配置',
            children: (
              <div className="item-config-container">
                <Alert
                  message="能力项等级配置说明"
                  description={
                    <div>
                      <p style={{ marginBottom: 8 }}>
                        <strong>从模板复制：</strong>将全局模板的所有等级配置（1-10级）复制到该能力项，创建独立的配置记录。复制后可以单独编辑，不会影响全局模板。
                      </p>
                      <p style={{ marginBottom: 0 }}>
                        <strong>新增等级：</strong>可以为该能力项新增任意等级配置（如11级、12级等），不受模板限制。每个能力项可以拥有自己独特的等级体系。
                      </p>
                    </div>
                  }
                  type="info"
                  icon={<InfoCircleOutlined />}
                  showIcon
                  className="info-alert"
                />
                <div className="item-selector">
                  <Select
                    className="item-select"
                    placeholder="选择能力项"
                    value={abilityLevelConfigStore.selectedItemId}
                    onChange={(val) => {
                      abilityLevelConfigStore.setSelectedItemId(val);
                      abilityLevelConfigStore.loadConfigs(val);
                    }}
                  >
                    {abilityLevelConfigStore.items.map((item) => (
                      <Select.Option key={item.item_id} value={item.item_id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                  <Button
                    type="default"
                    icon={<CopyOutlined />}
                    onClick={handleCopyToItem}
                    disabled={!abilityLevelConfigStore.selectedItemId}
                  >
                    从模板复制
                  </Button>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreate}
                    disabled={!abilityLevelConfigStore.selectedItemId}
                  >
                    新增等级
                  </Button>
                </div>
                <div className="configs-container">
                  {abilityLevelConfigStore.loading && abilityLevelConfigStore.configs.length === 0 ? (
                    <div className="loading-container">
                      <Spin size="large" />
                    </div>
                  ) : !abilityLevelConfigStore.selectedItemId ? (
                    <div className="empty-container">
                      <div className="empty-text">请先选择能力项</div>
                    </div>
                  ) : abilityLevelConfigStore.configs.length === 0 ? (
                    <div className="empty-container">
                      <div className="empty-text">暂无配置，可以"从模板复制"或"新增等级"</div>
                    </div>
                  ) : (
                    <div className="configs-grid">
                      {abilityLevelConfigStore.configs
                        .slice()
                        .sort((a, b) => (a.level || 0) - (b.level || 0))
                        .map((config) => renderConfigCard(config))}
                    </div>
                  )}
                </div>
              </div>
            ),
          },
        ]}
        className="config-tabs"
      />
      <Drawer
        title={editingConfig ? '编辑等级配置' : abilityLevelConfigStore.activeTab === 'template' ? '新增全局模板等级' : '新增能力项等级'}
        open={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setEditingConfig(null);
          form.resetFields();
        }}
        width={600}
        className="admin-drawer"
        rootClassName="admin-drawer-root"
      >
        {abilityLevelConfigStore.activeTab === 'item' && !editingConfig && (
          <Alert
            message="提示"
            description="为当前能力项新增独立等级配置。可以创建任意等级（如11级、12级等），不受全局模板限制。"
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="level"
            label="等级"
            rules={[{ required: true, message: '请输入等级' }]}
            extra={abilityLevelConfigStore.activeTab === 'item' ? '可以设置任意等级数字，不受模板限制（如11、12、13等）' : '全局模板的等级编号'}
          >
            <InputNumber min={1} max={1000} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="required_exp"
            label="所需经验"
            rules={[{ required: true, message: '请输入所需经验' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="requires_assessment"
            label="需要考核"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
          <Form.Item name="level_name" label="等级名称">
            <Input placeholder="如：初级、中级、高级" />
          </Form.Item>
          <Form.Item name="level_description" label="等级描述">
            <Input.TextArea rows={3} placeholder="等级描述" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button onClick={() => {
                setDrawerVisible(false);
                setEditingConfig(null);
                form.resetFields();
              }}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        title="从模板复制"
        open={copyModalVisible}
        onOk={handleConfirmCopy}
        onCancel={() => setCopyModalVisible(false)}
        okText="确定"
        cancelText="取消"
        confirmLoading={abilityLevelConfigStore.loading}
      >
        <p>确定要将全局模板的所有等级配置复制到该能力项吗？</p>
        <p>复制后，该能力项将拥有独立的等级配置，可以单独编辑。如果该能力项已有配置，将不会覆盖现有配置。</p>
      </Modal>
    </div>
  );
});

