"use client";

import React, { useRef, useState } from "react";

export default function ChatZipBar() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const onPick = (f: File | null) => {
    setFile(f);
    setStatus(f ? `선택됨: ${f.name}` : "");
  };

  const onSend = async () => {
    if (!file || busy) {
      setStatus(file ? status : "ZIP 파일을 먼저 선택해주세요.");
      return;
    }

    setBusy(true);
    setStatus("서버에서 ZIP 분석 중…");

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

      setStatus(
        `완료 | ` + 
        `팔로워 ${data.followers.length}, ` +
        `팔로잉 ${data.following.length}, ` +
        `언팔로워 ${data.unfollowers.length}`
      );
    } catch (e: any) {
      setStatus(e?.message ?? "분석에 실패했어요. ZIP 파일을 확인해주세요.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-3xl px-4 pb-4">
        {status && (
          <div className="mb-2 rounded-xl border px-4 py-2 text-sm shadow-sm">
            {status}
          </div>
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
            {file ? file.name : "ZIP 파일을 선택하세요"}
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
    </div>
  );
}
