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

      {/* 흐르는 파티클 */}
      {/* <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div> */}

      <style jsx>{`
        /* 그라데이션 흐름 */
        .gradient-flow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.3;
          animation: flow 25s ease-in-out infinite;
          mix-blend-mode: screen;
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
          animation-delay: -8s;
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
          animation-delay: -16s;
        }

        @keyframes flow {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 50% 40% 60% 50%;
          }
          25% {
            transform: translate(50px, -80px) scale(1.15) rotate(90deg);
            border-radius: 60% 50% 40% 60%;
          }
          50% {
            transform: translate(-40px, 60px) scale(0.9) rotate(180deg);
            border-radius: 40% 60% 50% 40%;
          }
          75% {
            transform: translate(70px, 30px) scale(1.1) rotate(270deg);
            border-radius: 50% 40% 60% 50%;
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

        .wave-path {
          animation: wave-flow 15s ease-in-out infinite;
        }

        .wave-1 {
          animation-delay: 0s;
          opacity: 0.7;
        }

        .wave-2 {
          animation-delay: -5s;
          opacity: 0.5;
        }

        .wave-3 {
          animation-delay: -10s;
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

        /* 흐르는 파티클 */
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: linear-gradient(45deg, 
            #833AB4, 
            #E1306C, 
            #FD1D1D, 
            #F77737, 
            #FCAF45
          );
          box-shadow: 0 0 10px rgba(131, 58, 180, 0.5);
          animation: particle-stream 12s linear infinite;
          opacity: 0;
        }

        @keyframes particle-stream {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-50vw, -100vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* 반응형 */
        @media (max-width: 768px) {
          .gradient-flow {
            filter: blur(80px);
          }
          .flow-1, .flow-2, .flow-3 {
            width: 400px;
            height: 400px;
          }
          .particle {
            width: 2px;
            height: 2px;
          }
          .wave-container {
            height: 20%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gradient-flow,
          .wave-path,
          .particle {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}