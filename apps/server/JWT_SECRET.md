# 生成 JWT_SECRET 的方法

## 方法 1: 使用 Node.js（推荐）

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

这会生成一个 64 字符的十六进制字符串（32 字节）。

## 方法 2: 使用 OpenSSL

```bash
openssl rand -hex 32
```

## 方法 3: 使用 Node.js Base64 格式

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

这会生成一个 Base64 编码的字符串。

## 方法 4: 使用在线工具

访问 https://generate-secret.vercel.app/32 生成随机密钥。

## 推荐配置

- **长度**: 至少 32 字节（64 个十六进制字符）
- **格式**: 十六进制（hex）或 Base64
- **安全性**: 使用加密安全的随机数生成器

## 已生成的密钥

我已经为你生成了一个密钥并更新到 `.env` 文件中：
```
JWT_SECRET=ef217e004bfb6ce72899d87b36166a48268747313d7dd1c9be293b3fd7ad557d
```

## 注意事项

1. **不要分享密钥**: JWT_SECRET 应该保密，不要提交到 Git
2. **生产环境**: 生产环境必须使用不同的强密钥
3. **定期更换**: 建议定期更换密钥（更换后所有已签发的 token 会失效）

