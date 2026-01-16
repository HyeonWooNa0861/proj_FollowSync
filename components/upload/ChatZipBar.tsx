"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSettings } from "../settings/SettingsContext";

export default function ChatZipBar() {
  const { settings } = useSettings();
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [unfollowers, setUnfollowers] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onPick = (f: File | null) => {
    setFile(f);
    setStatus(
      f
        ? settings.language === "ko"
          ? `선택됨: ${f.name}`
          : `Selected: ${f.name}`
        : ""
    );
    setUnfollowers([]);
  };

  const onSend = async () => {
    if (!file || busy) {
      setStatus(
        file
          ? status
          : settings.language === "ko"
          ? "ZIP 파일을 먼저 선택해주세요."
          : "Please select a ZIP file first."
      );
      return;
    }

    setBusy(true);
    setStatus(
      settings.language === "ko"
        ? "서버에서 ZIP 분석 중…"
        : "Analyzing ZIP on server..."
    );
    setUnfollowers([]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "서버 처리 실패");
      }

      const list = Array.isArray(data.unfollowers) ? data.unfollowers : [];
      setUnfollowers(list);

      if (settings.language === "ko") {
        setStatus(
          `완료 | 팔로워 ${data.followers.length}, 팔로잉 ${data.following.length}, 언팔로워 ${list.length}`
        );
      } else {
        setStatus(
          `Done | Followers ${data.followers.length}, Following ${data.following.length}, Unfollowers ${list.length}`
        );
      }
    } catch (e: any) {
      setStatus(
        e?.message ?? "분석에 실패했어요. ZIP 파일을 확인해주세요."
      );
      setUnfollowers([]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="
        rounded-2xl p-4 shadow-xl border
        bg-zinc-900 text-zinc-100 border-zinc-800
        dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-200
      "
    >
      {/* bg-card/95 → bg-card (완전 불투명), border 추가 */}
      
      {status && (
        <div className="mb-3 rounded-xl bg-muted px-4 py-3 text-sm">
          {/* border-transparent 제거, bg-muted 추가 */}
          {status}
        </div>
      )}

      {unfollowers.length > 0 && (
        <details className="mb-3 rounded-xl bg-muted px-4 py-3 text-sm group">
          {/* border-transparent 제거, bg-muted 추가 */}
          <summary className="cursor-pointer select-none flex items-center justify-between transition-colors hover:opacity-70">
            <span>
              {!mounted || settings.language === "ko"
                ? `언팔로워 목록 보기 (${unfollowers.length})`
                : `View Unfollowers List (${unfollowers.length})`}
            </span>
            <span className="transition-transform duration-300 group-open:rotate-180">
              ▼
            </span>
          </summary>

          <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] opacity-0 group-open:opacity-100">
            <div className="overflow-hidden">
              <div className="mt-2 max-h-64 overflow-auto hide-scrollbar">
                <ul className="space-y-1">
                  {unfollowers.map((name, index) => (
                    <li
                      key={name}
                      className="flex items-center justify-between hover:bg-card rounded-lg px-2 py-1.5 transition-colors"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span>@{name}</span>
                      <a
                        href={`https://www.instagram.com/${name}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs underline opacity-80 hover:opacity-100 transition-opacity"
                      >
                        {settings.language === "ko" ? "프로필" : "Profile"}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </details>
      )}

      <div className="flex items-center gap-2 rounded-2xl bg-muted p-2">
        {/* bg 추가 */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="transition-transform duration-200 hover:rotate-90">
            +
          </span>
        </button>

        <div className="flex h-11 flex-1 items-center bg-card rounded-xl px-4 text-sm">
          {/* bg-card 추가 */}
          {file
            ? file.name
            : !mounted || settings.language === "ko"
            ? "ZIP 파일을 선택하시요"
            : "Select a ZIP file"}
        </div>

        <button
          type="button"
          onClick={onSend}
          disabled={busy}
          className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="transition-transform duration-200 hover:translate-x-1">
            {busy ? (
              <span className="animate-spin inline-block">⟳</span>
            ) : (
              "▶"
            )}
          </span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".zip"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  );
}