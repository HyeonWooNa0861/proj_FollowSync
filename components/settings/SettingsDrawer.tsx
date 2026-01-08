"use client";

import React, { useEffect } from "react";
import { useSettings } from "./SettingsContext";

type Props = { open: boolean; onClose: () => void };

export default function SettingsDrawer({ open, onClose }: Props) {
  const { settings, setLanguage, toggleTheme } = useSettings();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <button
        aria-label="Close"
        className="absolute inset-0"
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.35)" }}
      />

      {/* drawer */}
      <aside className="drawer absolute right-0 top-0 h-full w-[82vw] max-w-sm shadow-xl">
        <div className="drawerHeader flex items-center justify-between border-b px-5 py-4">
          <div className="text-base font-semibold">
            {settings.language === "ko" ? "설정" : "Settings"}  
          </div>
          <button onClick={onClose} className="closeBtn rounded-lg px-2 py-1 text-sm">
            {settings.language === "ko" ? "닫기" : "Close"}
          </button>
        </div>

        <div className="space-y-6 px-5 py-5">
          {/* 언어 */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              {/* globe */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M2 12h20" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 2c3 3 3 17 0 20"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Language
            </div>

            <div className="mt-3 space-y-2">
              <label className="row flex items-center justify-between rounded-xl border px-4 py-3">
                <span className="text-sm">한국어</span>
                <input
                  type="radio"
                  name="lang"
                  checked={settings.language === "ko"}
                  onChange={() => setLanguage("ko")}
                />
              </label>

              <label className="row flex items-center justify-between rounded-xl border px-4 py-3">
                <span className="text-sm">English</span>
                <input
                  type="radio"
                  name="lang"
                  checked={settings.language === "en"}
                  onChange={() => setLanguage("en")}
                />
              </label>
            </div>
          </div>

          {/* 테마 토글 */}
          <div>
            <div className="text-sm font-semibold">Theme</div>
            <button
              onClick={toggleTheme}
              className="row mt-3 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm"
            >
              <span>
                {settings.theme === "light" ? "Light mode" : "Dark mode"}
              </span>

              {/* sun / moon icon */}
              {settings.theme === "light" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 2v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 20v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.93 4.93l1.41 1.41"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17.66 17.66l1.41 1.41"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 12h2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 12h2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.93 19.07l1.41-1.41"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17.66 6.34l1.41-1.41"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="notice rounded-xl px-4 py-3 text-xs">
            {settings.language === "ko" ? "로그인/비밀번호 없이, 인스타 공식 내보내기 파일만 사용합니다." : "No login or password required. We only use official Instagram export files."}
          </div>
        </div>
      </aside>

      {/* 전역변수(var) 기반 스타일 */}
      <style jsx>{`
        .drawer {
          background: var(--bg);
          color: var(--fg);
          border-left: 1px solid var(--card-border);
        }

        .drawerHeader {
          border-color: var(--card-border);
        }

        .closeBtn {
          color: var(--muted-fg);
        }
        .closeBtn:hover {
          background: var(--muted);
          color: var(--fg);
        }

        .row {
          border-color: var(--card-border);
          background: transparent;
        }
        .row:hover {
          background: var(--muted);
        }

        .notice {
          background: var(--muted);
          color: var(--muted-fg);
        }
      `}</style>
    </div>
  );
}
