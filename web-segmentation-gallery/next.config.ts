import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    relay: {
      // This should match relay.config.js
      src: './src/',      
      language: 'typescript',
      eagerEsModules: true,
    },
  },
  webpack: (config, { isServer }) => {
    // add raw-loader for glsl, frag, and vert files
    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      use: ['raw-loader'],
    });

    return config;
  },
};

export default nextConfig;
