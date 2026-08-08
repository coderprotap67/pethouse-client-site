/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://pethouse-server-site.vercel.app/api/auth/:path*',
      },
    ];
  },
};

export default nextConfig;