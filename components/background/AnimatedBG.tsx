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

  /* 상단 왼쪽 */
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

  /* 우하단 */
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

  /* 중앙 */
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