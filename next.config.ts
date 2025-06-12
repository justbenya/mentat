import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  basePath: isProd ? basePath : '',
  assetPrefix: isProd ? assetPrefix : '',
};

export default nextConfig;
