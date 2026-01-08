"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSettings } from "../settings/SettingsContext";

type Props = { totalSteps: number };

export default function Guide({ totalSteps }: Props) {
  const { settings } = useSettings();
  const [current, setCurrent] = useState(1);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const wrapperRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const steps = useMemo(() => {
    const ko = [
      "인스타그램 설정에서 계정 센터로 이동",
      "내 정보 및 권한 선택",
      "내 정보 내보내기 선택",
      "내보내기 만들기 선택",
      "기기로 내보내기 선택",
      "정보 맞춤 설정 및 형식 변환",
      "팔로워 및 팔로잉 체크",
      "형식을 JSON으로 설정",
      "내보내기 시작 선택",
      "ZIP 다운로드 후 이 앱에 업로드",
    ];

    const en = [
      "Open Instagram settings → Accounts Center",
      "Select Your information and permissions",
      "Select Export your information",
      "Select Create export",
      "Select Export to device",
      "Change Customize information and Format",
      "Check Followers and following",
      "Choose format: JSON",
      "Select Start export",
      "Download ZIP and upload here",
    ];

    const desc = settings.language === "en" ? en : ko;
    const langDir = settings.language === "en" ? "en" : "ko";

    return Array.from({ length: totalSteps }).map((_, i) => {
      const idx = i + 1;
      const file = `/guide/${langDir}/step${String(idx).padStart(2, "0")}.png`;
      return { idx, file, text: desc[i] ?? `Step ${idx}` };
    });
  }, [settings.language, totalSteps]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = itemsRef.current.filter(Boolean) as HTMLDivElement[];
    
    if (!container || cards.length === 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const containerRect = container.getBoundingClientRect();
          const containerCenter = containerRect.top + containerRect.height / 2;

          cards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + cardRect.height / 2;
            
            // 카드 중심과 컨테이너 중심 사이의 거리
            const distanceFromCenter = Math.abs(cardCenter - containerCenter);
            
            // 중심에서 200px 이내는 완전 선명, 그 이상부터 투명해지기 시작
            const threshold = 200;
            const adjustedDistance = Math.max(0, distanceFromCenter - threshold);
            
            // 조정된 거리에 따른 opacity 계산
            const maxDistance = 400;
            const progress = Math.min(1, adjustedDistance / maxDistance);
            
            // 중심에 가까울수록 1, 멀수록 0.0
            const opacity = Math.max(0.0, 1 - progress * 1.0);
            
            card.style.opacity = String(opacity);
            
            // 완전히 투명해지면 그림자와 인터랙션 제거
            if (opacity < 0.05) {
              card.style.boxShadow = "none";
              card.style.pointerEvents = "none";
              card.style.visibility = "hidden";
            } else {
              card.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.12)";
              card.style.pointerEvents = "auto";
              card.style.visibility = "visible";
            }
          });

          ticking = false;
        });

        ticking = true;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalSteps]);

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
    <section ref={containerRef} className="guide-root hide-scrollbar">
      {/* 상단 여백 */}
      <div className="spacer-top" />
      
      <div className="guide-list">
        {steps.map((s, i) => (
          <div 
            key={s.idx} 
            ref={(el) => (wrapperRefs.current[i] = el)}
            className="guide-item"
          >
            <div
              ref={(el) => (itemsRef.current[i] = el)}
              data-step={s.idx}
              className="guide-card"
            >
              <div className="guide-img">
                <img src={s.file} alt={`step ${s.idx}`} />
              </div>

              <div className="guide-text">
                <span className="step">{s.idx}</span>
                <p>{s.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 하단 여백 */}
      <div className="spacer-bottom" />

      <style jsx>{`
        .guide-root {
          max-height: 70vh;
          overflow-y: auto;
          background: var(--card);
          padding: 24px;
          border-radius: 24px;
          border: 1px solid var(--card-border);
          position: relative;
        }
        .spacer-top {
          height: calc(35vh - 200px);
          min-height: 100px;
        }
        .spacer-bottom {
          height: calc(35vh - 200px);
          min-height: 100px;
        }
        .guide-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .guide-item {
          position: relative;
        }
        .guide-card {
          border-radius: 16px;
          border: 1px solid var(--card-border);
          background: var(--card);
          padding: 16px;
          transition: opacity 0.2s ease-out, box-shadow 0.2s ease-out, visibility 0.2s ease-out;
          will-change: opacity, box-shadow, visibility;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }
        .guide-img {
          width: 100%;
          height: 280px;
          border-radius: 12px;
          overflow: hidden;
          background: var(--muted);
          margin-bottom: 12px;
        }
        .guide-img img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: var(--muted);
        }
        .guide-text {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .guide-text .step {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary);
          color: var(--primary-foreground);
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }
        .guide-text p {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          color: var(--foreground);
        }
      `}</style>
    </section>
  );
}