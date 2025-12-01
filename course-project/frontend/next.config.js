const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

module.exports = {
  reactStrictMode: true,
  // experimental: { appDir: true },
//   async rewrites() {
//     return [{
//       source: '/:path*',
//       destination: `${BACKEND_URL}/:path*`, // backend
//     }];
//   }
};
