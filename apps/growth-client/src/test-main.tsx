import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { TestApp } from './views/test';
import 'antd/dist/reset.css';
import './styles/index.css';
import './styles/theme.less';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
);

