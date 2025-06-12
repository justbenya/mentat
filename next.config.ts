import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const base = process.env.PAGES_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: './dist',
  basePath: isProd && base ? base : '',
};

export default nextConfig;
