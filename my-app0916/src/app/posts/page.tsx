import Posts from '@/components/posts';
import { Suspense } from 'react';
import getPosts from '@/lib/getPosts';

export default function Page() {
  // 데이터 가져오는 함수를 await 하지 않습니다.
  const posts = getPosts('https://jsonplaceholder.typicode.com/posts');

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  );
}
