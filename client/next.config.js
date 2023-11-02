const BASE_PREFIX_FOR_APP = '/musify'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // basePath: '/musify'

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'musify'
  },
};

module.exports = nextConfig;