"use client";

import React, { useState } from "react";

import SettingsDrawer from "./settings/SettingsDrawer";
import GuideModal from "./guide/GuideModal";
import DeveloperModal from "./developer/DeveloperModal";
import HelpIcon from "./icons/Help_icon";
import DeveloperIcon from "./icons/Developer_icon";
import MenuIcon from "./icons/Menu_icon";
import Container from "./layout/Container";

export default function Header() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);
  const [openDeveloper, setOpenDeveloper] = useState(false);

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b backdrop-blur bg-background/80">
        <Container className="flex h-14 items-center justify-between">
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="페이지 새로고침"
            className="text-[17px] sm:text-xl md:text-2xl font-semibold tracking-tight hover:opacity-80 active:scale-[0.99] transition"
          >
            FollowSync
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setOpenGuide(true)}
              aria-label="도움말"
              className="rounded-lg p-2 sm:p-3 hover:bg-muted active:scale-95 transition-colors"
            >
              <HelpIcon />
            </button>

            <button
              onClick={() => setOpenDeveloper(true)}
              aria-label="개발자 정보"
              className="rounded-lg p-2 sm:p-3 hover:bg-muted active:scale-95 transition-colors"
            >
              <DeveloperIcon />
            </button>

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

      <SettingsDrawer open={openSettings} onClose={() => setOpenSettings(false)} />
      <GuideModal open={openGuide} onClose={() => setOpenGuide(false)} />
      <DeveloperModal open={openDeveloper} onClose={() => setOpenDeveloper(false)} />
    </>
  );
}
