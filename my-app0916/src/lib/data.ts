// src/lib/data.ts
export interface Post {
  id: string;
  title: string;
  likes: number;
}

export const posts: Post[] = [
  { id: "1", title: "Next.js 서버 컴포넌트 실습", likes: 10 },
  { id: "2", title: "Client Component와 LikeButton", likes: 25 },
  { id: "3", title: "낙관적 업데이트 vs 비관적 업데이트", likes: 42 },
];
