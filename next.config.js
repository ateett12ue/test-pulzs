const nodeExternals = require('webpack-node-externals')

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  experimental: {
    
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SECRET_KEY: process.env.SECRET_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    BACKEND_IP_ADDRESS: process.env.BACKEND_IP_ADDRESS
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
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.externals = nodeExternals();
  //   }
  //   return config;
  // },
};
