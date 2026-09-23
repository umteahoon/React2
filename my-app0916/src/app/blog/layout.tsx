import React from 'react';
import Link from 'next/link';
import { posts } from './posts';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>--- Blog Layout Header ---</header>
      <nav>
        {posts.map((post, i) => (
          <React.Fragment key={post.slug}>
            {i > 0 && ' | '}
            <Link href={`/blog/${post.slug}`}>{post.slug}</Link>
          </React.Fragment>
        ))}
      </nav>
      {children}
      <footer>--- Blog Layout Footer ---</footer>
    </div>
  );
}
