const nodeExternals = require('webpack-node-externals')

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  experimental: {
    
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["lh3.googleusercontent.com", "i.pravatar.cc"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/image/upload/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = nodeExternals();
    }
    return config;
  },
};
