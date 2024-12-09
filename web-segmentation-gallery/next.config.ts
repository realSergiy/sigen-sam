import type { NextConfig } from 'next';

//ToDo: switch to using turbo: https://nextjs.org/docs/app/api-reference/next-config-js/turbo#webpack-loaders

const __dirname = new URL('.', import.meta.url).pathname;

const nextConfig: NextConfig = {
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
