/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  // Next.js 会自动加载 .env 文件，这里显式配置环境变量
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_POOL_MIN: process.env.DATABASE_POOL_MIN,
    DATABASE_POOL_MAX: process.env.DATABASE_POOL_MAX,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_DB: process.env.REDIS_DB,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};

module.exports = nextConfig;
