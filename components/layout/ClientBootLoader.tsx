"use client";

import { useEffect, useState, type ReactNode } from "react";

type ClientBootLoaderProps = {
  children: ReactNode;
};

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

const twoFrames = () =>
  new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });

export default function ClientBootLoader({ children }: ClientBootLoaderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fontsReady =
      "fonts" in document
        ? Promise.race([document.fonts.ready.then(() => undefined), delay(1200)])
        : Promise.resolve();

    Promise.all([fontsReady, twoFrames(), delay(700)]).then(() => {
      if (!cancelled) {
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="boot-shell">
      <div className={`boot-content ${ready ? "is-ready" : ""}`}>
        {ready ? children : null}
      </div>

      <div
        aria-hidden={ready}
        aria-label="Loading FollowSync"
        className={`boot-loader ${ready ? "is-hidden" : ""}`}
        role="status"
      >
        <div className="boot-mark">
          <div className="boot-spinner" />
          <div className="boot-title">FollowSync</div>
        </div>
      </div>

      <style jsx>{`
        .boot-shell {
          min-height: 100dvh;
        }

        .boot-content {
          min-height: 100dvh;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 420ms ease, transform 420ms ease;
        }

        .boot-content.is-ready {
          opacity: 1;
          transform: translateY(0);
        }

        .boot-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          color: var(--fg);
          background: var(--bg-gradient);
          transition: opacity 360ms ease, visibility 360ms ease;
        }

        .boot-loader.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .boot-mark {
          display: grid;
          justify-items: center;
          gap: 14px;
        }

        .boot-spinner {
          width: 34px;
          height: 34px;
          border: 3px solid rgba(15, 23, 42, 0.14);
          border-top-color: var(--fg);
          border-radius: 999px;
          animation: boot-spin 800ms linear infinite;
        }

        .boot-title {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0;
        }

        @keyframes boot-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .boot-content,
          .boot-loader {
            transition: none;
          }

          .boot-spinner {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
