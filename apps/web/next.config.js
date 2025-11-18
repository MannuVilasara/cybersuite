/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui', '@repo/utils', '@repo/types'],
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
