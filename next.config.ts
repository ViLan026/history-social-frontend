/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
      // {
      //   protocol: 'http',
      //   hostname: 'example.com',
      // },

      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'localhost',
      // },

      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },

  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;