// components/guide/GuideModal.tsx
"use client";
import Guide from "./Guide";

export default function GuideModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    // 오버레이: 화면 전체를 덮고, blur 효과 & 반투명 배경
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={onClose} // 배경 클릭 시 모달 닫기
    >
      {/* 모달 컨텐츠: 내부 클릭은 닫히지 않도록 stopPropagation */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-2xl bg-background p-6 overflow-y-auto hide-scrollbar"
      >
        {/* 닫기 버튼 제거 */}
        <Guide totalSteps={10} />
        <style jsx>{`
          /* 스크롤바 숨김 */
          .hide-scrollbar {
            scrollbar-width: none;      /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;             /* Chrome, Safari */
          }
        `}</style>
      </div>
    </div>
  );
}
