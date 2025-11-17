import React, { useState, useCallback } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './SearchInput.less';

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 通用搜索输入框组件
 * 解决 Ant Design Input 在深色主题下的样式问题（双重边框、placeholder 不可见等）
 */
export const SearchInput = React.memo<SearchInputProps>(({
  placeholder = '搜索...',
  value: controlledValue,
  onChange,
  onSearch,
  allowClear = true,
  className = '',
  style,
}): React.JSX.Element => {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  }, [controlledValue, onChange]);

  const handleBlur = useCallback((): void => {
    if (onSearch) {
      onSearch(value);
    }
  }, [value, onSearch]);

  const handlePressEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  }, [value, onSearch]);

  return (
    <div className={`search-input-wrapper ${className}`} style={style}>
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        allowClear={allowClear}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onPressEnter={handlePressEnter}
        className="search-input"
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

