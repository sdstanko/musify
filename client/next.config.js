/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {appDir: true},
  async rewrites() {
    return [
      {
        source: '/musify/album/:id',
        destination: '/album/:id',
      },
      {
        source: '/musify/auth/:action',
        destination: '/auth/:action',
      },
      {
        source: '/musify',
        destination: '/',
      },
      {
        source: '/musify/upload',
        destination: '/upload',
      },
      {
        source: '/musify/search',
        destination: '/search',
      },
    ]
  },
};

module.exports = nextConfig;