import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'divergentes.local' },
      { protocol: 'https', hostname: 'divergentes.com' },
    ],
  },
};

export default nextConfig;
