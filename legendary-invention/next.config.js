/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  transpilePackages: ['three'],
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    // Polyfill Node.js modules that Uniswap's dependencies require
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      path: false,
      stream: false,
      zlib: false,
      http: false,
      https: false,
      crypto: false,
      os: false,
    };
    return config;
  },
  eslint: {
    // Exclude web3-contracts during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore type checking during build
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
