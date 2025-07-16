/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  turbopack: {
    rules: {
      '*.scss': {
        loaders: ['sass-loader'],
        as: '*.css',
      },
    },
  },
};

module.exports = nextConfig;
