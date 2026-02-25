"use client";

import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="bg-root">
      <div className="base-gradient" />

      <div className="blur-layer">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="bottom-gradient" />
      </div>

      <style jsx>{`
        .bg-root {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        /* =========================
           🌞 LIGHT MODE
        ==========================*/

        .base-gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(192, 154, 239, 0.28), transparent 45%),
            radial-gradient(circle at 80% 80%, rgba(255, 217, 168, 0.28), transparent 50%),
            linear-gradient(
              135deg,
              #fdfdff 0%,
              #f7f8ff 50%,
              #f3f4ff 100%
            );
        }

        .blur-layer {
          position: absolute;
          inset: 0;
          filter: blur(75px);
          opacity: 0.78;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
        }

        .blob-1 {
          width: 650px;
          height: 650px;
          background: radial-gradient(
            circle,
            #C09AEF 0%,
            #F19AC0 50%,
            #FFC4A1 75%,
            transparent 92%
          );
          top: -230px;
          left: -230px;
        }

        .blob-2 {
          width: 750px;
          height: 750px;
          background: radial-gradient(
            circle,
            #FFA3A3 0%,
            #FFD9A8 55%,
            #FFC4A1 80%,
            transparent 95%
          );
          bottom: -270px;
          right: -270px;
        }

        .blob-3 {
          width: 520px;
          height: 520px;
          background: radial-gradient(
            circle,
            #98B2FF 0%,
            #C09AEF 60%,
            #F19AC0 85%,
            transparent 98%
          );
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .bottom-gradient {
          position: absolute;
          bottom: -250px;
          left: 50%;
          transform: translateX(-50%);
          width: 130%;
          height: 450px;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 163, 163, 0.5) 0%,
            rgba(255, 217, 168, 0.45) 50%,
            rgba(192, 154, 239, 0.4) 80%,
            transparent 100%
          );
        }

        /* =========================
            🌙 DARK MODE (더 어둡게)
          ==========================*/

          :global(html.dark) .base-gradient {
            background:
              radial-gradient(circle at 20% 20%, rgba(90, 40, 140, 0.35), transparent 55%),
              radial-gradient(circle at 80% 80%, rgba(120, 20, 60, 0.3), transparent 60%),
              linear-gradient(
                135deg,
                #070814 0%,
                #0d1022 50%,
                #12142a 100%
              );
          }

          :global(html.dark) .blur-layer {
            opacity: 0.85;
            filter: blur(90px);
          }

          /* 🌙 왼쪽 위 – 더 진한 퍼플/핑크 */
          :global(html.dark) .blob-1 {
            background: radial-gradient(
              circle,
              #5B1F8C 0%,
              #8F2458 55%,
              transparent 92%
            );
          }

          /* 🌙 오른쪽 아래 – 더 진한 레드/오렌지 */
          :global(html.dark) .blob-2 {
            background: radial-gradient(
              circle,
              #7A1414 0%,
              #A86220 60%,
              transparent 92%
            );
          }

          /* 더 깊은 블루/퍼플 */
          :global(html.dark) .blob-3 {
            background: radial-gradient(
              circle,
              #243C8F 0%,
              #5B2E91 65%,
              transparent 95%
            );
          }

          :global(html.dark) .bottom-gradient {
            background: radial-gradient(
              ellipse at center,
              rgba(158, 28, 28, 0.6) 0%,
              rgba(90, 40, 140, 0.55) 65%,
              transparent 100%
            );
          }

        /* ========================= */

        @media (max-width: 768px) {
          .blur-layer {
            filter: blur(60px);
          }

          .blob-1,
          .blob-2,
          .blob-3 {
            width: 420px;
            height: 420px;
          }
        }

        @media (max-width: 480px) {
          .blur-layer {
            filter: blur(50px);
          }

          .blob-3 {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}