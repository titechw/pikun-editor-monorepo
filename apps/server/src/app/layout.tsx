import React from 'react';

/**
 * Next.js App Router 根布局
 * 这是必需的，否则 API 路由无法正常工作
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}






