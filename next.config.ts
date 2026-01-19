import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'export', 삭제 (Vercel은 서버 지원)
  // basePath: '/proj_FollowSync', 삭제 (루트 도메인 사용)
  images: {
    unoptimized: true,
  },
}

export default nextConfig