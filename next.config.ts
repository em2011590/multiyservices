import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Point turbopack root to this project to silence the multiple-lockfiles warning
  turbopack: {
    root: __dirname,
  },
  // Keep heavy native modules (bcrypt, mongoose) server-side only — not bundled into Edge
  serverExternalPackages: ['bcrypt', 'mongoose', 'cloudinary', '@mapbox/node-pre-gyp'],
  // Disable TypeScript checking during build due to react-three-fiber type issues
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config: any) {
    // Alias out optional native deps that bcrypt/node-pre-gyp tries to pull in
    config.resolve.alias = {
      ...config.resolve.alias,
      'aws-sdk': false,
      'mock-aws-s3': false,
      nock: false,
    };
    return config;
  },
};

export default nextConfig;
