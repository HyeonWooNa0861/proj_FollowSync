import React from "react";

type Props = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export default function HelpIcon({
  size = 20,
  strokeWidth = 2,
  className,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M9.5 9a2.5 2.5 0 115 0c0 1.667-2.5 1.667-2.5 3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}
