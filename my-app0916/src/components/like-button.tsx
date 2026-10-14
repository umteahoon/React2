'use client'

import { useState } from 'react'

export default function LikeButton({ likes }: { likes: number }) {
  const [count, setCount] = useState<number>(likes ?? 0)
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async () => {
    setIsLiking(true)
    setCount((c) => c + 1) // 낙관적 업데이트

    await new Promise((resolve) => setTimeout(resolve, 500)) // 서버 요청 시뮬레이션

    setIsLiking(false)
  }

  return (
    <button onClick={handleLike} disabled={isLiking}>
      👍 {count}
    </button>
  )
}
