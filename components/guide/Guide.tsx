"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSettings } from "../settings/SettingsContext";

type Props = { totalSteps: number };

export default function Guide({ totalSteps }: Props) {
  const { settings } = useSettings();
  const [current, setCurrent] = useState(1);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  const steps = useMemo(() => {
    const ko = [
      "인스타그램 설정에서 Accounts Center로 이동",
      "Your information and permissions 선택",
      "Download your information 선택",
      "Some of your info 선택",
      "Connections 선택",
      "Followers and following 체크",
      "Format을 JSON으로 설정",
      "Download to device 선택",
      "Create files(내보내기 만들기) 진행",
      "ZIP 다운로드 후 이 앱에 업로드",
    ];

    const en = [
      "Open Instagram settings → Accounts Center",
      "Select Your information and permissions",
      "Select Download your information",
      "Choose Some of your info",
      "Select Connections",
      "Check Followers and following",
      "Choose format: JSON",
      "Choose Download to device",
      "Create files (export request)",
      "Download ZIP and upload here",
    ];

    const desc = settings.language === "en" ? en : ko;

    return Array.from({ length: totalSteps }).map((_, i) => {
      const idx = i + 1;
      const file = `/guide/step${String(idx).padStart(2, "0")}.png`;
      return { idx, file, text: desc[i] ?? `Step ${idx}` };
    });
  }, [settings.language, totalSteps]);

  useEffect(() => {
    const els = itemsRef.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const idx = Number(
          (visible.target as HTMLElement).dataset["step"] ?? "1"
        );
        if (idx >= 1 && idx <= totalSteps) setCurrent(idx);
      },
      { threshold: [0.3, 0.6] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [totalSteps]);

  return (
    <section className="guide-root hide-scrollbar">
      {/* 진행도 제거: .guide-progress 삭제 */}

      <div className="guide-list">
        {steps.map((s, i) => (
          <div key={s.idx}>
            <div
              ref={(el) => (itemsRef.current[i] = el)}
              data-step={s.idx}
              className="guide-card"
            >
              <div className="guide-img">
                <img src={s.file} alt={`step ${s.idx}`} />
              </div>

              {/* 가이스 스텝 번호 */}
              <div className="guide-text">
                <span className="step">{s.idx}</span>
                <p>{s.text}</p>
              </div>
            </div>

            {i !== steps.length - 1 && <div className="guide-divider" />}
          </div>
        ))}
      </div>

      <style jsx>{`
        .guide-root {
          max-height: 70vh;
          overflow-y: auto;
          background: var(--card);
          padding: 24px;
          border-radius: 24px;
          border: 1px solid var(--card-border);
        }
        .guide-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .guide-card {
          border-radius: 16px;
          border: 1px solid var(--card-border);
          background: var(--card);
          padding: 16px;
        }
        .guide-divider {
          height: 1px;
          margin: 12px 0;
          background: linear-gradient(
            to right,
            transparent,
            var(--card-border),
            transparent
          );
        }
        /* … guide-card, guide-img, guide-text 스타일 유지 … */
        .guide-img {
          width: 100%;
          aspect-ratio: 16 / 9;   
          border-radius: 12px;
          overflow: hidden;
          background: var(--muted);
          margin-bottom: 12px;
        }

        .guide-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;     
          display: block;
        }
      `}</style>
    </section>
  );
}

