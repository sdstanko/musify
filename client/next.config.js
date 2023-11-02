/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/musify/album/:id',
        destination: '/album/:id',
      },
    ]
  },
};

module.exports = nextConfig;