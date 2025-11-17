import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Input, Card, message } from 'antd';
import { authStore } from '../../stores/auth.store';
import { useNavigate } from 'react-router-dom';
import './Login.less';

export const LoginPage = observer(() => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (values: { email: string; password: string; name?: string }) => {
    try {
      if (isLogin) {
        await authStore.login(values.email, values.password);
      } else {
        await authStore.register(values.email, values.password, values.name || '');
      }
      message.success(isLogin ? '登录成功' : '注册成功');
      navigate('/documents');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : (isLogin ? '登录失败' : '注册失败');
      message.error(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card" title={isLogin ? '登录' : '注册'}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {!isLogin && (
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={authStore.isLoading}>
              {isLogin ? '登录' : '注册'}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="link"
              block
              onClick={() => {
                setIsLogin(!isLogin);
                form.resetFields();
              }}
            >
              {isLogin ? '还没有账号？去注册' : '已有账号？去登录'}
            </Button>
          </Form.Item>
        </Form>
        {authStore.error && (
          <div className="error-message" style={{ color: 'red', marginTop: 10 }}>
            {authStore.error}
          </div>
        )}
      </Card>
    </div>
  );
});




