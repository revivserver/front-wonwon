/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      '*',
      'localhost',
      'http://localhost:1337',
      '167.71.206.157',
      'http://167.71.206.157:1337',
      'https://api.chainauth.dev',
      'api.chainauth.dev',
      'api.wonwonbyreviv.com',
      'https://api.wonwonbyreviv.com',
      'wonwon-files.sgp1.digitaloceanspaces.com',
      'https://wonwon-files.sgp1.digitaloceanspaces.com'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'api.chainauth.dev'
      },
      {
        protocol: 'https',
        hostname: 'api.wonwonbyreviv.com'
      },
      {
        protocol: 'https',
        hostname: 'wonwon-files.sgp1.digitaloceanspaces.com'
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 // 60 seconds - this cannot be invalidated
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true
      }
    ];
  }
};
