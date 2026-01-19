import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/proj_FollowSync',
  images: {
    unoptimized: true,
  },
}

export default nextConfig