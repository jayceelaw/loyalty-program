module.exports = {
  reactStrictMode: true,
  // experimental: { appDir: true },
  async rewrites() {
    return [{
      source: '/:path*',
      destination: 'http://localhost:4000/:path*', // backend
    }];
  }
};
