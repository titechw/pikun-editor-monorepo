import React, { useState } from 'react';
import { Form, Input, Button, Card, Space, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { adminAuthStore } from '@/stores/admin-auth';
import './Login.less';

interface LoginFormValues {
  email: string;
  password: string;
}

/**
 * 管理端登录页面
 */
export const AdminLogin = observer((): React.JSX.Element => {
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginFormValues): Promise<void> => {
    try {
      setLoading(true);
      await adminAuthStore.login(values.email, values.password);
      message.success('登录成功');
      navigate('/');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '登录失败，请稍后重试';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-content">
        <Card className="admin-login-card" bordered={false}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div className="admin-login-header">
              <h1>管理后台登录</h1>
              <p>请输入管理员账号和密码</p>
            </div>

            <Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="请输入邮箱" />
              </Form.Item>

              <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Card>
      </div>
    </div>
  );
});

