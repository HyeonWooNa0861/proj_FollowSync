/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/proj_FollowSync',
  images: {
    unoptimized: true,
  },
  // 빌드 후 .nojekyll 자동 생성
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const fs = require('fs');
      const path = require('path');
      fs.writeFileSync(path.join(__dirname, 'out', '.nojekyll'), '');
    }
    return config;
  },
}

module.exports = nextConfig