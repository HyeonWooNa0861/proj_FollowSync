"use client";

import React, { useState } from "react";
import SettingsDrawer from "./settings/SettingsDrawer";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <div className="text-base font-semibold tracking-tight">
            FollowSync
          </div>

          {/* 햄버거 버튼 */}
          <button
            type="button"
            aria-label="메뉴"
            onClick={() => setOpen(true)}
            className="rounded-xl p-2 active:scale-[0.98]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <SettingsDrawer open={open} onClose={() => setOpen(false)} />

      <style jsx>{`
        header {
          border-color: var(--card-border);
          background: color-mix(in srgb, var(--bg) 85%, transparent);
        }

        button:hover {
          background: var(--muted);
        }
      `}</style>
    </>
  );
}
