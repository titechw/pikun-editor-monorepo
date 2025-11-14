import React, { useState } from 'react';
import { Button, ButtonProps } from 'antd';

export interface AsyncButtonProps extends Omit<ButtonProps, 'onClick' | 'loading'> {
  /**
   * 异步点击处理函数，返回 Promise
   */
  onClick: () => Promise<void>;
}

/**
 * 异步按钮组件
 * 自动处理 loading 状态：点击后显示 loading，Promise 完成后取消 loading
 */
export const AsyncButton = ({ onClick, children, ...props }: AsyncButtonProps): React.JSX.Element => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button {...props} loading={loading} onClick={handleClick}>
      {children}
    </Button>
  );
};

