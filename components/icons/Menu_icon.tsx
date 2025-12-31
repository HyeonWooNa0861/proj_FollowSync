import React from "react";

export default function MenuIcon({
  size = 22,
  strokeWidth = 2,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}
