"use client";

import Developer from "./Developer";

export default function DeveloperModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    if (!open) return null;

    return (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
        onClick={onClose}
    >
        <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-background p-6 mx-4"
        >
        <Developer />

        <style jsx>{`
          .hide-scrollbar {
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
}