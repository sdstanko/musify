const BASE_PREFIX_FOR_APP = '/musify'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // assetPrefix: BASE_PREFIX_FOR_APP,
  // async rewrites(){
  //   return [
  //     {
  //       /** ASSET PREFIX */
  //       source: `${BASE_PREFIX_FOR_APP}/_next/:path*`,
  //       destination: '/_next/:path*'
  //     },
  //     {
  //       /** IMAGE PREFIX */
  //       source: `${BASE_PREFIX_FOR_APP}/images/:query*`,
  //       destination: '/_next/image/:query*'
  //     },
  //     /** API PREFIX */
  //     {
  //       source: `${BASE_PREFIX_FOR_APP}/api/:path*`,
  //       destination: '/api/:path*'
  //     }
  //   ]
  // }
};

module.exports = nextConfig;