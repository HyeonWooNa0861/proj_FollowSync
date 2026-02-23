"use client";

import React, { useState } from "react";
import SettingsDrawer from "./settings/SettingsDrawer";
import GuideModal from "./guide/GuideModal";
import HelpIcon from "./icons/Help_icon";
import MenuIcon from "./icons/Menu_icon";
import Container from "./layout/Container";

export default function Header() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b backdrop-blur bg-background/80">
        {/* bg-background/80 추가 - 80% 불투명 배경 */}
        <Container className="flex h-14 items-center justify-between">
          {/* 로고: Inter 폰트 & 반응형 크기 */}
          <div className="text-[17px] sm:text-xl md:text-2xl font-semibold tracking-tight">
            FollowSync
          </div>

          {/* 우측 아이콘 그룹 */}
          <div className="flex items-center gap-1">
            {/* 도움말 아이콘 버튼: 반응형 padding */}
            <button
              onClick={() => setOpenGuide(true)}
              aria-label="도움말"
              className="rounded-lg p-2 sm:p-3 hover:bg-muted active:scale-95 transition-colors"
            >
              <HelpIcon />
            </button>

            {/* 설정 아이콘 버튼: 반응형 padding */}
            <button
              onClick={() => setOpenSettings(true)}
              aria-label="설정"
              className="rounded-lg p-2 sm:p-3 hover:bg-muted active:scale-95 transition-colors"
            >
              <MenuIcon />
            </button>
          </div>
        </Container>
      </header>

      {/* 모달/드로어 */}
      <SettingsDrawer
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
      <GuideModal
        open={openGuide}
        onClose={() => setOpenGuide(false)}
      />
    </>
  );
}