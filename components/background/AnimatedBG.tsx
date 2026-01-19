"use client";

import React from "react";

export default function AnimatedBackground() {
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {/* SVG 그라데이션 정의 */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#405DE6" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#833AB4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E1306C" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#FD1D1D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FCAF45" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* 인스타그램 그라데이션 흐름 */}
      <div className="gradient-flow flow-1" />
      <div className="gradient-flow flow-2" />
      <div className="gradient-flow flow-3" />
      
      {/* 물결 효과 */}
      <div className="wave-container">
        <svg className="wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path className="wave-path wave-1" d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="url(#instagram-gradient)" />
        </svg>
        <svg className="wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path className="wave-path wave-2" d="M0,70 Q300,20 600,70 T1200,70 L1200,120 L0,120 Z" fill="url(#instagram-gradient)" />
        </svg>
        <svg className="wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path className="wave-path wave-3" d="M0,90 Q300,40 600,90 T1200,90 L1200,120 L0,120 Z" fill="url(#instagram-gradient)" />
        </svg>
      </div>

      <style jsx>{`
        /* ✅ 모바일 최적화: 하드웨어 가속 활성화 */
        .gradient-flow,
        .wave-container,
        .wave {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          perspective: 1000;
          transform: translate3d(0, 0, 0);
        }

        /* 그라데이션 흐름 */
        .gradient-flow {
          position: absolute;
          border-radius: 50%;
          /* ✅ blur 값 감소 (120px → 80px) */
          filter: blur(80px);
          opacity: 0.3;
          /* ✅ 애니메이션 속도 느리게 (25s → 35s) */
          animation: flow 35s ease-in-out infinite;
          mix-blend-mode: screen;
          /* ✅ will-change 제거 (모바일 성능 개선) */
        }

        .flow-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle,
            #833AB4 0%,
            #FD1D1D 50%,
            #F77737 100%
          );
          top: -10%;
          left: -10%;
          animation-delay: 0s;
        }

        .flow-2 {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle,
            #E1306C 0%,
            #FD1D1D 50%,
            #FCAF45 100%
          );
          bottom: -15%;
          right: -15%;
          animation-delay: -12s;
        }

        .flow-3 {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle,
            #405DE6 0%,
            #833AB4 50%,
            #E1306C 100%
          );
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -24s;
        }

        /* ✅ 애니메이션 단순화 (rotate 제거, transform 최소화) */
        @keyframes flow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            border-radius: 50% 40% 60% 50%;
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
            border-radius: 60% 50% 40% 60%;
          }
          66% {
            transform: translate(-30px, 40px) scale(0.95);
            border-radius: 40% 60% 50% 40%;
          }
        }

        /* 물결 효과 */
        .wave-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          opacity: 0.1;
        }

        .wave {
          position: absolute;
          bottom: 0;
          width: 200%;
          height: 100%;
        }

        /* ✅ 물결 애니메이션 속도 느리게 (15s → 20s) */
        .wave-path {
          animation: wave-flow 20s linear infinite;
        }

        .wave-1 {
          animation-delay: 0s;
          opacity: 0.7;
        }

        .wave-2 {
          animation-delay: -7s;
          opacity: 0.5;
        }

        .wave-3 {
          animation-delay: -14s;
          opacity: 0.3;
        }

        @keyframes wave-flow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* ✅ 모바일 최적화 */
        @media (max-width: 768px) {
          .gradient-flow {
            /* blur 더 감소 */
            filter: blur(60px);
            /* 애니메이션 더 느리게 */
            animation-duration: 45s;
          }
          
          .flow-1, .flow-2, .flow-3 {
            /* 크기 축소 */
            width: 350px;
            height: 350px;
          }
          
          .wave-container {
            height: 20%;
            /* 물결 opacity 감소 */
            opacity: 0.08;
          }

          .wave-path {
            /* 물결 애니메이션 더 느리게 */
            animation-duration: 25s;
          }

          /* ✅ flow-3 단순화 */
          .flow-3 {
            transform: translate(-50%, -50%);
            animation: none; /* 모바일에서는 애니메이션 비활성화 */
          }
        }

        /* ✅ 저사양 기기 대응 */
        @media (max-width: 480px) {
          .gradient-flow {
            filter: blur(40px);
            opacity: 0.25;
          }
          
          .wave-container {
            display: none; /* 저사양에서는 물결 제거 */
          }
        }

        /* ✅ 사용자가 애니메이션 줄이기를 설정한 경우 */
        @media (prefers-reduced-motion: reduce) {
          .gradient-flow,
          .wave-path {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}