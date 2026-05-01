/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '';

const nextConfig = {
  output: 'export',
  // Automatically sets basePath for GitHub Pages deployments
  basePath: isProd ? repo : '',
  assetPrefix: isProd ? repo : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
