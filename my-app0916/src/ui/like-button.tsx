// src/ui/like-button.tsx
"use client";

import { useState } from "react";

export default function LikeButton({ likes }: { likes: number }) {
  const [count, setCount] = useState<number>(likes ?? 0);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  const handleLike = () => {
    if (isLiking) return;

    setIsLiking(true);
    // UI 즉시 반영 (낙관적 업데이트)
    setCount((prev) => prev + 1);

    // 가상의 네트워크 딜레이 후 상태 해제
    setTimeout(() => {
      setIsLiking(false);
    }, 500);
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLiking}
      style={{ marginTop: "10px" }}
    >
      {isLiking ? "처리 중..." : `❤️ 좋아요 ${count}`}
    </button>
  );
}
