"use client";

import React, { useRef, useState, useEffect } from "react";
import {useSettings} from "../settings/SettingsContext"

export default function ChatZipBar() {
  const {settings} = useSettings();
  const [mounted,setMounted] =  useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);

  // ✅ 추가: 결과 리스트 상태(언팔로워 목록)
  const [unfollowers, setUnfollowers] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, [])

  const onPick = (f: File | null) => {
    setFile(f);
    setStatus(f ? (settings.language === "ko" ? `선택됨: ${f.name}` : `Selected: ${f.name}`): "");
    setUnfollowers([]); // ✅ 파일 바꾸면 이전 목록 초기화
  };

  const onSend = async () => {
    if (!file || busy) {
      setStatus(file ? status : (settings.language === "ko" ? "ZIP 파일을 먼저 선택해주세요." : "Please select a ZIP file first."));
      return;
    }

    setBusy(true);
    setStatus(settings.language === "ko" ? "서버에서 ZIP 분석 중…" : "Analyzing ZIP on server...");
    setUnfollowers([]); // ✅ 새 분석 시작할 때 초기화

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

      // ✅ 추가: 목록 저장 (없을 수도 있으니 안전하게)
      const list = Array.isArray(data.unfollowers) ? data.unfollowers : [];
      setUnfollowers(list);
      
      if (settings.language === "ko") {
        setStatus(
        `완료 | ` +
          `팔로워 ${data.followers.length}, ` +
          `팔로잉 ${data.following.length}, ` +
          `언팔로워 ${list.length}`
        );
      } else {
        setStatus(
          `Done | ` +
            `Followers ${data.followers.length},` +
            `Following ${data.following.length},` +
            `Unfollowers ${list.length}`
        )
      }
      
    } catch (e: any) {
      setStatus(e?.message ?? "분석에 실패했어요. ZIP 파일을 확인해주세요.");
      setUnfollowers([]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl bg-card p-2 shadow-sm">
      {status && (
        <div className="mb-2 rounded-xl border px-4 py-2 text-sm shadow-sm">
          {status}
        </div>
      )}

      {/* ✅ 추가: 언팔로워 목록 (접기/펼치기, 최소 UI) */}
      {unfollowers.length > 0 && (
        <details className="mb-2 rounded-xl border px-4 py-2 text-sm shadow-sm">
          <summary className="cursor-pointer select-none">
            {!mounted || settings.language === "ko" 
              ? `언팔로워 목록 보기 (${unfollowers.length})` 
              : `View Unfollowers List (${unfollowers.length})`}
          </summary>

          <div className="mt-2 max-h-64 overflow-auto">
            <ul className="space-y-1">
              {unfollowers.map((name) => (
                <li key={name} className="flex items-center justify-between">
                  <span>@{name}</span>
                  <a
                    href={`https://www.instagram.com/${name}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs underline opacity-80 hover:opacity-100"
                  >
                    {settings.language === "ko" ? "프로필" : "Profile"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </details>
      )}

      <div className="flex items-center gap-2 rounded-2xl border p-2 shadow-sm">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="h-11 w-11 rounded-xl"
        >
          +
        </button>

        <div className="flex h-11 flex-1 items-center rounded-xl px-4 text-sm">
          {file ? file.name : (!mounted || settings.language === "ko" ? "ZIP 파일을 선택하시요" : "Select a ZIP file")}
        </div>

        <button
          type="button"
          onClick={onSend}
          disabled={busy}
          className="h-11 w-11 rounded-xl"
        >
          ▶
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
