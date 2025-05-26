import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // acepta cualquier dominio HTTPS
      },
    ],
  },
  output: 'export', 
};

export default nextConfig;
