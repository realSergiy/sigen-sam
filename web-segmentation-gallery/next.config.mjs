// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
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
