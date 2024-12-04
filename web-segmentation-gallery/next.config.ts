import type { NextConfig } from "next";

//ToDo: switch to using turbo: https://nextjs.org/docs/app/api-reference/next-config-js/turbo#webpack-loaders

const nextConfig: NextConfig = {
  module: {
    rules: [
      {
        test: /\.glsl$|\.frag$|\.vert$/i, //ToDo: try to test for ?raw instead like vite does
        use: ["raw-loader"],
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
