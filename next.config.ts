/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Cho phép domain test (example.com) - đang gây lỗi
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'http',
        hostname: 'example.com',
      },

      // Cho phép localhost (khi backend chạy local)
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },

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