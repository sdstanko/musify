/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ]
  },
};

module.exports = nextConfig;