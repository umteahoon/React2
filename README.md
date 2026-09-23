# React2 202230119 엄태훈

## 4주차 (2026-09-23)

*Next.js 레이아웃 구성, 동적 라우트 [slug], 쿼리 스트링 및 Link 내비게이션*

---

### 1. Creating a layout (레이아웃 만들기)

Next.js App Router에서 애플리케이션의 화면 구조를 잡을 때 적용되는 기본 규칙과 명명 관례입니다.

### 🔹 레이아웃 구성 필수 원칙
- **RootLayout 컴포넌트는 필수**: 프로젝트 최상위 루트(`app/layout.tsx` 또는 `src/app/layout.tsx`)에는 전체 애플리케이션을 감싸는 **`RootLayout`이 반드시 존재**해야 합니다. 최상위 레이아웃은 `<html>`과 `<body>` 태그를 필수로 포함해야 합니다.
- **서브페이지 레이아웃은 선택 사항**: 특정 경로 하위의 서브 레이아웃(`app/blog/layout.tsx` 등)은 필요하지 않다면 **생략해도 무방**합니다. (하위 레이아웃이 없으면 자동으로 상위 `RootLayout`만 적용됩니다.)
- **컴포넌트 명명 권장 (`RootLayout`)**: 공식 문서 예제 등에서 최상위 레이아웃을 `DashboardLayout` 등으로 표현하는 경우가 있으나, 특별한 이유가 없다면 **`RootLayout`으로 명명**하는 것이 표준 관례상 좋습니다.
- **명명 이유**: 문서 예시에서는 특정 대시보드 디렉터리를 가리킬 수 있지만, 최상위 레이아웃은 결국 **전체 라우팅 페이지를 아우르는 공통 틀**이기 때문에 명확하게 `RootLayout`으로 명명하는 것이 권장됩니다.

---

### 2. Creating a nested route (중첩 라우트 만들기)

중첩 라우트(Nested route)는 **다중 URL 세그먼트(Segments)**로 구성된 라우트입니다.

> 📌 **URL Segment란?**  
> URL에서 슬래시(`/`) 단위로 나뉘어 특정 리소스 경로를 구성하는 각 분할 영역을 의미합니다.

### 🔹 URL 세그먼트 계층 구조 예시 (`/blog/[slug]`)
세 개의 세그먼트로 구성된 경로 예시:
- **`/`** : Root Segment (최상위 루트)
- **`blog`** : Segment (일반 세그먼트)
- **`[slug]`** : Leaf Segment (트리의 맨 끝 리프 세그먼트)

### 🔹 Next.js에서의 중첩 라우트 매핑 원리
- **폴더 = URL 세그먼트**: 폴더는 URL 세그먼트에 매핑되는 경로 세그먼트를 정의합니다 (즉, **폴더 자체가 URL 세그먼트**가 됩니다).
- **파일 = 화면 UI**: `page.tsx` 및 `layout.tsx` 파일은 해당 세그먼트 경로에 실제로 표시될 UI를 구성합니다.
- **폴더 중첩 = 중첩 라우트 완성**: 디렉터리를 계층적으로 중첩하면 직관적인 중첩 라우트가 완성됩니다.

---

### 3. 중첩 라우트 생성 기본 실습 (`/blog`)

특정 URL 경로를 추가하고 외부에서 공개적으로 접근할 수 있도록 라우트를 개설하는 기본 절차입니다.

```text
📁 app/
├── 📄 layout.tsx   ──► 최상위 RootLayout
├── 📄 page.tsx     ──► URL: / (루트 홈)
└── 📁 blog/
    └── 📄 page.tsx ──► URL: /blog (공개 접근 가능한 블로그 목록 페이지)
```

1. **디렉토리 생성**: `/blog`에 대한 경로를 추가하기 위해 `src/app` 아래에 `blog` 폴더를 생성합니다.
2. **페이지 파일 추가**: 해당 폴더 내에 `page.tsx`를 생성하면 `/blog` 경로로의 공개 액세스가 가능해집니다.

---

### 4. 공식 문서 예제 복사 시 발생하는 오류 및 해결

공식 Next.js 문서의 블로그 예제 코드를 그대로 복사해 붙여넣으면 모듈 참조 에러가 발생합니다.

### 🔹 에러 발생 원인
공식 문서 코드에 작성된 `@/lib/posts` 및 `@/ui/post` 모듈이 현재 로컬 프로젝트에는 존재하지 않기 때문에 모듈을 찾을 수 없다는 컴파일 에러가 발생합니다.

### 🔹 1단계 수정: 정적 리스트 렌더링 (`src/app/blog/page.tsx`)
외부 라이브러리 참조 없이 `<li>` 태그 목록 형태로 직접 렌더링하도록 단순화합니다.

```tsx
export default function Page() {
  return (
    <ul>
      <li>Post 1</li>
      <li>Post 2</li>
      <li>Post 3</li>
    </ul>
  );
}
```

---

### 5. Creating a dynamic segment (동적 세그먼트 만들기 & [slug]의 이해)

동적 세그먼트(Dynamic Segment)를 사용하면 **데이터에서 생성된 경로**를 유연하게 만들 수 있습니다.

### 🔹 핵심 개념
- 각 blog 게시물에 대한 정적 경로를 일일이 직접 만드는 대신, 동적 세그먼트를 생성하여 **블로그 게시물 데이터를 기반으로 경로를 자동 생성**할 수 있습니다.
- **문법**: 동적 세그먼트를 생성하려면 세그먼트(폴더) 이름을 **대괄호**로 묶습니다. (예: `[segmentName]`)
  - 예: `app/blog/[slug]/page.tsx` 경로에서 `[slug]`는 동적 세그먼트입니다.

### 🔹 slug의 어원과 매핑 규칙
- **개념**: 웹사이트의 특정 페이지를 사람이 쉽게 읽을 수 있는 텍스트 형태로 식별하는 URL의 일부입니다. (신문/잡지 편집 용어 '슬러그'에서 유래)
- **Key 역할**: URL 경로 `/blog/[slug]`에서 `[slug]` 자리는 호출할 데이터 객체의 **식별자 Key(속성명)** 역할을 합니다. 따라서 대상 데이터에 `slug` 키가 반드시 존재해야 합니다.
- **이름의 유연성**: 폴더명이 반드시 `slug`일 필요는 없습니다. 만약 폴더명을 `[foo]`로 지었다면 데이터 객체에도 `foo`라는 key(필드)가 정의되어 있어야 합니다.

### 🔹 블로그 디렉토리 계층 구조
```text
app/
└── blog/
    ├── page.tsx     // 블로그 메인 (목록)
    └── [slug]/
        └── page.tsx // 블로그 상세 페이지
```

---

### 6. [slug] 접속 시 발생하는 Next.js 15 오류 및 3~5 라인 코드 해설

코드 작성 완료 후 `/blog/[slug]`(예: `/blog/nextjs`, `routing`, `ssr-ssg`, `dynamic-routes`)로 접속해 봅니다. 동작은 정상적으로 되지만 오류 메시지가 발생합니다.

### 🔹 에러 메시지
```text
Error: Route "/blog/[slug]" used `params.slug`. `params` should be awaited before using its properties.
```

### 🔹 에러 발생 원인
- 이 오류는 Next.js App Router에서 **`params`가 비동기(async) 객체처럼 다뤄지는 경우** 발생합니다.
- **Next.js 14.2 이후**로 `params`와 `searchParams`는 내부적으로 **Promise 기반 객체**일 수 있어서, 바로 쓰면 안 되고 `await`하거나 props의 구조 분해에서 미리 `await`해야 합니다.
- **현재 실습 중인 버전이 15.x이기 때문에** 발생하는 오류입니다.

### 🔹 수정된 코드의 라인별(3, 4, 5라인) 상세 설명
```tsx
3  export default async function Posts({ params }: { params: Promise<{ slug: string }> }) {
4    const { slug } = await params;     // params 해제
5    const post = posts.find((p) => p.slug === slug);
```
- **`async function` (Line 3)**: 컴포넌트 함수를 `async`로 선언해야 내부에서 비동기 처리를 위한 `await`를 쓸 수 있습니다.
- **`await`를 사용하는 이유 (Line 4)**: 서버의 데이터를 읽어올 때 발생하는 타임 딜레이(Time Delay)에 의한 참조 오류를 방지하기 위해서입니다.
  > 📌 **참고 (RESTful API)**: HTTP 프로토콜을 사용하여 자원을 식별하고 조작하는 통신 규칙을 정의하는 아키텍처 스타일입니다.
- **매개변수 구조 (`{ params }`) (Line 3)**: Next.js가 페이지를 호출할 때는 `props` 객체로 `{ params, searchParams, ... }` 같은 값들을 넘겨주는데, 여기서 필요한 `params`만 구조 분해 할당으로 받습니다.
- **TypeScript 타입 선언 (`{ params: Promise<{ slug: string }> }`)**: `params`가 `Promise`(비동기 값)임을 명시합니다. 최신 Next.js(14.2+)에서는 내부적으로 `params`를 비동기 Promise로 다루고 있습니다.
- **데이터 탐색 (Line 5)**: `await`로 언래핑한 `slug` 값을 활용하여 `posts` 더미 배열에서 일치하는 데이터를 안전하게 찾아옵니다.

---

### 7. 성능 최적화(시간 복잡도) 및 Promise 타입 명시 권장 이유

### 🔹 데이터 소스가 클 때의 처리 (`.find()` vs DB 쿼리)
- 현재 실습에서는 소량의 더미 데이터이므로 자바스크립트 내장 배열 메서드인 `.find()`를 사용했습니다.
- 하지만 **데이터 소스가 커진다면 `.find()`는 시간 복잡도가 $O(n)$이므로 DB 쿼리로 변경**해야 합니다.
  > 📌 **$O(n)$의 의미**: 알고리즘의 시간 복잡도가 입력 데이터의 크기 $n$에 비례하여 실행 시간이나 메모리 사용량이 선형적으로 증가하는 것을 의미합니다.
- **대용량 데이터 환경**: 대량의 게시글을 메모리상에서 `.find()`로 순회하면 심각한 성능 저하가 발생하므로 인덱싱된 데이터베이스 쿼리를 사용하는 것이 필수적입니다.

### 🔹 `Promise<...>` 타입 명시를 권장하는 이유
- **실제 동작**: TypeScript 코드 작성 시 `Promise<...>`를 명시하지 않고 단순 객체 타입으로 작성해도 런타임 오류 없이 동작할 수는 있습니다.
- **비동기 명확화 및 가독성**: 겉보기에는 `params`가 동기식 객체처럼 보이지만 실제로는 비동기식이라는 점을 코드상에 명확히 드러내어 **코드의 가독성**을 크게 높여줍니다.
- **TypeScript 실수 방지**: `Promise` 타입을 명시해 두면 개발자가 내부에서 `await`를 깜빡하고 작성하지 않았을 때 **TypeScript 컴파일러가 타입 불일치 에러를 사전에 잡아줍니다**.
- **결론**: 따라서 오류 발생 여부와 상관없이 **`params`에 `Promise` 타입을 명시하여 사용하는 것을 강력히 권장**합니다.

---

### 8. Rendering with search params (검색 매개변수를 사용한 렌더링)

Next.js 서버 컴포넌트 페이지에서는 URL 쿼리 파라미터(예: `?filters=item`)에 접근하기 위해 `searchParams` prop을 사용합니다.

```tsx
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = (await searchParams).filters;
  // ...
}
```

### 🔹 무엇을 언제 사용해야 하나요? (적재적소 활용법)
- **`searchParams` prop (서버 컴포넌트)**: 페이지 데이터를 로드하기 위해 검색 매개변수가 필요한 경우(예: 페이지네이션/페이징 처리, 데이터베이스 쿼리 필터링)에 사용합니다.
- **`useSearchParams` Hook (클라이언트 컴포넌트)**: 검색 매개변수가 클라이언트 브라우저에서만 사용되는 경우(예: props를 통해 이미 로딩 완료된 목록 데이터를 화면에서 즉각 필터링할 때)에 사용합니다.
- **`new URLSearchParams(window.location.search)`**: 콜백 함수나 특정 이벤트 핸들러 내부에서 전체 페이지 컴포넌트를 리렌더링하지 않고도 순수 검색 매개변수 값만 읽어올 때 활용할 수 있습니다.

### 🔹 `params` vs `searchParams` 핵심 차이 비교
| 구분 | `params` (동적 세그먼트) | `searchParams` (쿼리 스트링) |
| :--- | :--- | :--- |
| **추출 위치** | 동적 세그먼트 `[slug]` | URL의 `?` 기호 이후에 붙는 쿼리 스트링 |
| **데이터 형태** | URL의 **경로(Path) 자체에 포함된 데이터** | URL 뒤에 붙는 **`key=value` 형태의 데이터** |
| **예시** | `/blog/nextjs` ➔ `{ slug: 'nextjs' }` | `/blog?sort=latest` ➔ `{ sort: 'latest' }` |
| **렌더링 영향** | 정적 생성(SSG) 가능 (generateStaticParams 결합 시) | **해당 페이지가 무조건 동적 렌더링(Dynamic Rendering)으로 처리됨** (요청 시점마다 URL 파라미터가 달라지기 때문) |

---

### 9. 실습 전체 코드: 더미 데이터 및 중첩 레이아웃 구성

교수님 실습 화면 기준의 전체 디렉터리 구성 및 소스 코드입니다.

### 🔹 파일 구조
```text
src/app/
├── posts.tsx               # 더미 데이터 정의
├── layout.tsx              # Root Layout (공통 헤더/푸터 및 네비게이션)
├── page.tsx                # Home 메인 페이지
└── blog/
    ├── layout.tsx          # Blog 전용 Sub Layout
    ├── page.tsx            # Blog 목록 페이지 (/blog)
    └── [slug]/
        └── page.tsx        # Blog 상세 페이지 (/blog/[slug])
```

### 🔹 소스 코드 구현

#### ① 더미 데이터 파일 (`src/app/posts.tsx`)
```tsx
// dummy data

export const posts = [
  { slug: "nextjs", title: "Next.js 소개", content: "Next.js는 React 기반의 풀스택 프레임워크입니다." },
  { slug: "routing", title: "App Router 알아보기", content: "Next.js 13부터는 App Router가 도입되었습니다." },
  { slug: "ssr-ssg", title: "SSR vs SSG", content: "서버사이드 렌더링과 정적 사이트 생성의 차이를 알아봅니다." },
  { slug: "dynamic-routes", title: "동적 라우팅", content: "Next.js에서 [slug]를 활용한 라우팅 방식입니다." },
];
```

#### ② 루트 레이아웃 (`src/app/layout.tsx`)
```tsx
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>=== Root Layout Header ===</header>
        <nav>
          <Link href="/">Home</Link> | <Link href="/blog">Blog</Link> | <Link href="/blog2">Blog2</Link> | <Link href="/blog3">Blog3</Link>
        </nav>
        <main>{children}</main>
        <footer>--- Root Layout Footer ---</footer>
      </body>
    </html>
  );
}
```

#### ③ 메인 홈 페이지 (`src/app/page.tsx`)
```tsx
export default function Home() {
  return (
    <div>
      <h1>=== Root Page ===</h1>
    </div>
  );
}
```

#### ④ 블로그 서브 레이아웃 (`src/app/blog/layout.tsx`)
```tsx
import React from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>*** Blog Layout Header ***</div>
      {children}
      <div>*** Blog Layout Footer ***</div>
    </div>
  );
}
```

#### ⑤ 블로그 목록 페이지 (`src/app/blog/page.tsx`)
```tsx
import Link from "next/link";
import { posts } from "../posts";

export default function BlogPage() {
  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: "16px 0" }}>
        블로그 목록
      </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} style={{ color: "blue", textDecoration: "underline" }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### ⑥ 블로그 상세 페이지 (`src/app/blog/[slug]/page.tsx`)
```tsx
import { posts } from "../posts";

export default async function Posts({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // params 해제
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <h1>게시글을 찾을 수 없습니다!</h1>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

---

### 10. Link Component 기본 사용법

Next.js의 `<Link>`는 표준 HTML `<a>` 요소를 확장하여 구현된 React 컴포넌트이며, 라우트 간 전환에 가장 기본적이면서도 주로 권장되는 내비게이션 도구입니다.

### 🔹 핵심 기능 및 장점
- **클라이언트 사이드 내비게이션 (Client-Side Navigation)**: 일반 `<a>` 태그처럼 브라우저 전체를 새로고침(Full Reload)하지 않고, 필요한 데이터와 세그먼트만 비동기 갱신하여 빠른 SPA(Single Page Application) 경험을 제공합니다.
- **프리페칭 (Prefetching)**: 링크가 뷰포트(화면)에 진입하면 백그라운드에서 해당 목적지 라우트의 데이터를 미리 다운로드하여 즉각적인 화면 전환을 지원합니다.
- **메뉴 구성의 편의성**: 공통 헤더나 네비게이션 바 메뉴를 제작할 때 간결하게 이동 경로를 지정할 수 있습니다.

### 🔹 기본 문법 예제 (`app/page.tsx`)
```tsx
import Link from 'next/link';

export default function Page() {
  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}
```

---

### 11. Link Component의 필수 속성: `href` (required)

`<Link>` 컴포넌트에서 이동할 대상 경로 또는 URL을 전달하는 필수 prop입니다. 단순 문자열 외에도 URL 객체(Object) 형태로 세부 파라미터를 넘길 수 있습니다.

### 🔹 사용 방법 1: 단순 경로 문자열 전달
```tsx
<Link href="/about">About</Link>
```

### 🔹 사용 방법 2: URL 객체(Object) 전달
```tsx
import Link from 'next/link';

export default function Page() {
  return (
    // /about?name=test 경로로 이동
    <Link
      href={{
        pathname: '/about',
        query: { name: 'test' },
      }}
    >
      About
    </Link>
  );
}
```

### 🔹 브라우저 렌더링 결과 (DOM 변환)
Next.js의 `<Link>` 컴포넌트는 브라우저 렌더링 시 표준 HTML `<a>` 요소로 변환됩니다.
- **개발자 도구 확인 시**: `<a href="/about?name=test">About</a>`
- 검색 엔진(SEO) 크롤러는 일반 링크로 정상 수집하며, 사용자가 클릭할 때는 새로고침 없는 SPA 방식으로 라우트가 전환됩니다.

---

## 3주차 (2026-09-16)

*Next.js 메타데이터, 컴포넌트 계층 및 중첩 라우트 그룹*

---

### 1. Open Graph Protocol (오픈 그래프 프로토콜)

웹사이트 링크를 SNS(페이스북, 인스타그램, X/트위터, 카카오톡 등)나 메신저에 공유할 때 시각적인 **미리보기 카드(링크 프리뷰)**를 생성하기 위한 웹 표준 프로토콜입니다.

### 🔹 주요 특징
- **표준화 주도**: 페이스북(현 Meta)이 주도하여 정립한 규칙으로 대부분의 SNS 플랫폼에서 널리 활용됩니다.
- **플랫폼별 렌더링**: 플랫폼마다 지원 태그 범위나 표시 레이아웃에 일부 차이가 있을 수 있습니다.
- **선언 위치**: 웹 문서 `<head>` 내부의 `<meta>` 태그로 작성합니다.

### 🔹 기본 메타 태그 예시
```html
<head>
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://example.com/page.html" />
  <meta property="og:title" content="페이지 제목" />
  <meta property="og:description" content="페이지 요약 설명" />
  <meta property="og:image" content="https://example.com/image.jpg" />
  <meta property="og:site_name" content="서비스 이름" />
  <meta property="og:locale" content="ko_KR" />
</head>
```

### 🔹 핵심 속성(Property) 요약
| 속성 (Property) | 역할 | 설명 |
| :--- | :--- | :--- |
| **`og:type`** | 콘텐츠 유형 | 웹 문서의 유형 (`website`, `article` 등) |
| **`og:url`** | 표준 URL | 검색 및 공유 기준이 되는 고유 웹 주소 |
| **`og:title`** | 미리보기 제목 | 카드 최상단에 강조 노출되는 제목 |
| **`og:description`** | 요약 설명 | 제목 아래 노출되는 간략한 설명 문구 |
| **`og:image`** | 대표 이미지 | 카드에 표시될 썸네일 이미지 절대 경로 |
| **`og:site_name`** | 서비스명 | 개별 페이지를 아우르는 브랜드/웹사이트 이름 |
| **`og:locale`** | 로케일 | 문서의 표준 언어 및 국가 코드 (예: `ko_KR`) |

---

### 2. Component Hierarchy (컴포넌트 계층 구조)

Next.js App Router의 동일 세그먼트(디렉터리) 내에 위치하는 예약어 파일들은 렌더링 시 **React 컴포넌트 트리 형태로 바깥쪽에서 안쪽으로 자동 중첩(Wrapping)**됩니다.

### 🔹 중첩 순서 다이어그램
```text
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<NotFound />}>
          <Page />  <!-- 또는 병렬 라우트 fallback UI인 <Default /> -->
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

### 🔹 예약어 파일별 역할 및 특징
| 파일명 | 컴포넌트 트리 역할 | 상세 설명 |
| :--- | :--- | :--- |
| **`layout.js`** | `<Layout>` | 세그먼트 최상위 공통 UI. 라우트 이동 시 상태를 유지하며 리렌더링되지 않음 |
| **`template.js`** | `<Template>` | `layout`과 유사하나 라우트 이동 시마다 새 인스턴스를 생성하여 상태가 초기화됨 |
| **`error.js`** | `<ErrorBoundary fallback={<Error />}>` | 하위 트리의 런타임 에러를 포착하는 React Error Boundary (`'use client'` 필수) |
| **`loading.js`** | `<Suspense fallback={<Loading />}>` | React Suspense 기반 로딩 UI. 비동기 데이터 fetching 중 즉각 표시 |
| **`not-found.js`** | `<ErrorBoundary fallback={<NotFound />}>`| `notFound()` 함수 호출 또는 일치하지 않는 경로 방문 시 표시되는 404 UI |
| **`page.js`** | `<Page>` | 해당 라우트 세그먼트의 본문이 표시되는 핵심 UI 컴포넌트 |
| **`default.js`** | `<Default>` | 병렬 라우트(Parallel Routes) 사용 시 슬롯 상태 복원 실패 시 대체 렌더링되는 UI |

---

### 3. Layout vs Template 상세 비교

`layout.js`와 `template.js`는 하위 페이지를 감싸는 래퍼(Wrapper)이지만 **라우트 전환 시 컴포넌트 인스턴스 재생성 여부와 State 유지 방식**에서 중요한 차이가 있습니다.

### 🔹 핵심 차이점 비교표
| 비교 항목 | `layout.js` (기본 권장) | `template.js` |
| :--- | :--- | :--- |
| **컴포넌트 인스턴스** | 유지됨 (마운트 상태 지속) | **라우트 이동 시마다 매번 새로 생성** (언마운트 후 재마운트) |
| **React State 유지 여부** | 하위 페이지 이동 시 내부 **State 유지** | 하위 페이지 이동 시 내부 **State 초기화** |
| **DOM 리렌더링** | 변경된 하위 페이지만 교체 | 감싸고 있는 템플릿 DOM 전체를 다시 그림 |
| **`useEffect` 실행** | 최초 렌더링 시 1회만 실행 | **페이지를 이동할 때마다 `useEffect` 재실행** |
| **주요 사용 사례** | 전역 헤더, 네비게이션 바, 사이드바, 푸터 | 페이지 진입 전환 애니메이션, 방문 통계 로깅, 폼 입력 초기화 |

---

### 4. Route Groups (라우트 그룹)

소괄호 `(folderName)` 형식을 사용하여 **URL 경로에 영향을 주지 않고** 디렉터리와 레이아웃을 논리적으로 그룹화하는 기법입니다.

### 🔹 주요 목적 및 장점
- **URL 클린화**: 디렉터리 이름이 URL 세그먼트에서 완전히 제외됩니다.
  - 예: `src/app/(marketing)/about/page.tsx` ➔ `http://localhost:3000/about`
- **레이아웃 분리**: 서비스 영역별(예: 일반 사용자용 `(marketing)`, 관리자 전용 `(admin)`)로 서로 다른 레이아웃을 독립적으로 적용할 수 있습니다.

---

### 5. 다중 중첩 레이아웃 실습 (Nested Layouts)

루트 레이아웃부터 라우트 그룹 레이아웃, 세부 페이지 전용 레이아웃까지 3단계로 중첩되어 감싸지는 실제 실습 아키텍처입니다.

### 🔹 디렉터리 및 파일 구조
```text
src/app/
├── (marketing)/
│   ├── layout.tsx         # [Marketing] 그룹 공통 레이아웃
│   ├── about/
│   │   ├── layout.tsx     # [About] 전용 추가 레이아웃
│   │   └── page.tsx       # About 본문 페이지 (URL: /about)
│   └── blog/
│       └── page.tsx       # Blog 본문 페이지 (URL: /blog)
├── layout.tsx             # 루트 최상위 레이아웃
└── page.tsx               # 루트 홈 페이지 (URL: /)
```

### 🔹 레이아웃 및 페이지 코드 구현

#### ① 루트 최상위 레이아웃 (`src/app/layout.tsx`)
```tsx
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header>Root Layout Header</header>
        {children}
        <footer>Root Layout Footer</footer>
      </body>
    </html>
  );
}
```

#### ② 마케팅 그룹 레이아웃 (`src/app/(marketing)/layout.tsx`)
최상위가 아닌 하위 레이아웃에는 `<html>`, `<body>` 태그를 작성하지 않고 감싸는 컨테이너 형태로 작성합니다.

```tsx
import React from 'react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>Marketing Layout Header</div>
      {children}
      <div>Marketing Layout Footer</div>
    </div>
  );
}
```

#### ③ About 전용 레이아웃 (`src/app/(marketing)/about/layout.tsx`)
```tsx
import React from 'react';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>About Layout Header</div>
      {children}
      <div>About Layout Footer</div>
    </div>
  );
}
```

#### ④ About 본문 페이지 (`src/app/(marketing)/about/page.tsx`)
```tsx
export default function AboutPage() {
  return <div>About 페이지</div>;
}
```

### 🔹 최종 브라우저 렌더링 결과 (`/about`)
브라우저에서 `http://localhost:3000/about` 접속 시 바깥쪽 레이아웃부터 안쪽으로 차례대로 래핑되어 출력됩니다:

```text
Root Layout Header
Marketing Layout Header
About Layout Header
About 페이지
About Layout Footer
Marketing Layout Footer
Root Layout Footer
```

---

## 2주차 (2026-09-09)

*Next.js 수동 세팅, 환경 구성 및 파일 시스템 라우팅*

---

### 1. 프로젝트 수동 생성 (Manual Installation)

Next.js의 내부 구동 원리와 필수 구성 요소를 이해하기 위해 CLI 도구 없이 바닥부터 직접 프로젝트를 구축합니다.

### 🔹 프로젝트 초기화 및 핵심 라이브러리 설치
```bash
pnpm create next-app@latest

# 실습용 디렉터리 생성 및 이동
mkdir foo
cd foo

# package.json 초기화
pnpm init

# Next.js 및 React 필수 라이브러리 설치
pnpm add next react react-dom
```

---

### 2. App Router 기본 파일 및 렌더링 원리

### 🔹 루트 레이아웃 (`src/app/layout.tsx`)
애플리케이션 전체에 적용되는 공통 HTML 외곽 셸을 정의합니다. 최상위 `layout.tsx`는 반드시 `<html>`과 `<body>` 태그를 포함해야 합니다.

```tsx
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

### 🔹 메인 홈 페이지 (`src/app/page.tsx`)
루트 경로(`/`) 방문 시 렌더링되는 본문 컴포넌트입니다.

```tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}
```

### 🔹 루트 경로(`/`) 렌더링 동작 구조
사용자가 `/`에 접근하면 `layout.tsx`와 `page.tsx` 두 문서가 결합되어 완전한 페이지로 클라이언트에 제공됩니다.

```
📁 src/app/
├── 📄 layout.tsx  ──┐
│                    ├──►  🌐 브라우저 화면 (URL: /)
└── 📄 page.tsx    ──┘
```

---

### 3. 정적 리소스 관리 (`public` 디렉토리)

- 이미지, 글꼴(Font), 파비콘 등 정적 파일을 보관하기 위해 루트에 생성합니다. (선택 사항)
- `public` 디렉토리 내부의 리소스는 기본 URL(`/`)로 직접 참조할 수 있습니다.
  - 예: `public/profile.png` ➔ `/profile.png`
- `next/image` 컴포넌트를 사용하면 포맷 최적화, 반응형 리사이징, 레이아웃 이동(CLS) 방지가 자동 적용됩니다.

```tsx
import Image from 'next/image';

export default function Page() {
  return <Image src="/profile.png" alt="Profile" width={100} height={100} />;
}
```

---

### 4. 수동 설치 중 발생하는 오류 처리

### 🔹 TypeScript 타입 정의 누락 에러
- **증상**: 에디터 상에서 JSX 태그 밑에 빨간 밑줄(`JSX element implicitly has type 'any'...`) 발생.
- **원인**: TypeScript 환경에서 React 및 JSX 태그 문법을 해석할 타입 선언이 없기 때문.
- **해결**: 타입 정의 패키지를 개발용 의존성(`-D`)으로 설치합니다.
  ```bash
  pnpm add -D @types/react @types/react-dom
  ```

### 🔹 일반 설치(`dependencies`) vs 개발용 설치(`devDependencies`)
| 구분 | 일반 설치 (`pnpm add <pkg>`) | 개발용 설치 (`pnpm add -D <pkg>`) |
| :--- | :--- | :--- |
| **등록 위치** | `package.json` 내 **`dependencies`** | `package.json` 내 **`devDependencies`** |
| **용도** | 실제 서비스 런타임 실행에 필수적인 패키지 | 코드 빌드, 린팅, 타입 검사 등 개발 시에만 사용 |
| **배포 환경** | 프로덕션 빌드 결과물에 포함 및 배포 환경 설치 | `--production` 옵션 시 제외되어 번들 경량화 |
| **대표 예시** | `react`, `react-dom`, `next`, `axios` 등 | `typescript`, `@types/*`, `eslint`, `prettier` 등 |

### 🔹 이전 버전 인식 및 React Import 선언
- **현상**: JS/JSX 파일 사용 시에도 JSX 변환 오류가 발생하거나 이전 버전 환경으로 인식되는 현상.
- **해결**: 파일 상단에 `import React from 'react'`를 명시적으로 선언합니다.

### 🔹 `package.json` 실행 스크립트 추가
- **현상**: `pnpm dev` 실행 시 `ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL (Command "dev" not found)` 발생.
- **해결**: `package.json`에 스크립트를 수동 등록합니다.
  ```json
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
  ```

---

### 5. 개발 서버 실행 및 TypeScript 자동 구성

터미널에서 개발 서버 명령어를 실행합니다:
```bash
pnpm run dev
# 또는
pnpm dev
```

### 🔹 Next.js 자동 감지 메커니즘
- **TypeScript 환경 자동 감지**: 누락된 의존성(`typescript`, `@types/node`)을 백그라운드에서 자동 설치합니다.
- **`tsconfig.json` 자동 생성**: 프로젝트 루트에 Next.js 표준 TypeScript 설정 파일을 즉시 생성합니다.
- **TypeScript 버전 명시적 설치/고정**:
  ```bash
  pnpm add -D typescript@^7
  ```

---

### 6. 개발 환경 편의성 설정

### 🔹 VS Code 사용자 지정 편집기 레이블 (`.vscode/settings.json`)
App Router의 예약어 파일(`page.tsx`, `layout.tsx` 등)이 여러 개 열렸을 때 상위 폴더 경로를 표시하여 식별성을 확보합니다. (VS Code 1.88 이상 또는 Cursor 지원)

```json
{
  "workbench.editor.customLabels.patterns": {
    "**/app/**/page.tsx": "${dirname(1)}/${dirname} - page.tsx",
    "**/app/**/layout.tsx": "${dirname(1)}/${dirname} - layout.tsx",
    "**/app/**/loading.tsx": "${dirname(1)}/${dirname} - loading.tsx",
    "**/app/**/error.tsx": "${dirname(1)}/${dirname} - error.tsx",
    "**/app/**/not-found.tsx": "${dirname(1)}/${dirname} - not-found.tsx",
    "**/app/**/template.tsx": "${dirname(1)}/${dirname} - template.tsx",
    "**/app/**/default.tsx": "${dirname(1)}/${dirname} - default.tsx",
    "**/app/**/route.ts": "${dirname(1)}/${dirname} - route.ts"
  }
}
```
* **참고**: `${dirname(1)}/${dirname}` 형태로 두 폴더 깊이를 지정해야 동적 세그먼트(`blog/[id]`) 간 이름 충돌을 방지할 수 있습니다. (JetBrains 계열 IDE는 기본 자동 지원)

---

### 7. 모듈 절대 경로 별칭 (Path Aliases)

복잡한 상대 경로(`../../..`)를 간결한 절대 경로 별칭(`@/...`)으로 치환합니다.

### 🔹 `baseUrl`의 폐기와 모던 TypeScript 설정
- **문제점**: `baseUrl`은 TypeScript 6.0에서 지원 중단(Deprecated) 예고되었으며, 7.0에서 완전 삭제되었습니다.
- **임시 경고 무시**: `tsconfig.json`에 `"ignoreDeprecations": "6.0"` 추가.
- **모던 권장 방식**: `baseUrl`을 삭제하고 프로젝트 루트 기준 상대 경로(`./`)를 명시합니다.

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  }
}
```

---

### 8. 실습 프로젝트 자동 생성 (`create-next-app`)

```bash
pnpm create next-app@latest
```

### 🔹 `/src` 디렉토리 사용 여부 비교
| 구분 | `/src` 디렉토리 사용 (추천) | `/src` 디렉토리 미사용 |
| :--- | :--- | :--- |
| **구조** | 모든 소스 코드가 `src/` 폴더 내에 배치 | 코드가 프로젝트 최상단 루트에 노출 |
| **목적** | 애플리케이션 코드와 설정 파일을 명확히 격리 | 소스 코드와 설정 파일이 혼재 |
| **추천** | 대규모 프로젝트 및 실무 표준 | 간단한 토이 프로젝트 |

### 🔹 `.eslintrc.json` vs `eslint.config.mjs`
| 항목 | `.eslintrc.json` (레거시) | `eslint.config.mjs` (최신 표준) |
| :--- | :--- | :--- |
| **포맷** | JSON 기반 정적 포맷 | JavaScript 모듈 (ESM, Flat Config) |
| **유연성** | 주석, 변수, 조건문 사용 불가 | 변수, 조건문, 동적 로딩 지원으로 유연함 |
| **지원 버전** | 구버전 ESLint 지원 | **ESLint v9 이상 공식 권장 (Next.js 기본값)** |

---

### 9. Folder and File Conventions (폴더 및 파일 규칙)

### 🔹 최상위 폴더 (Top-level folders)
| 폴더명 | 영문 명칭 | 설명 |
| :--- | :--- | :--- |
| **`app`** | App Router | 최신 권장 라우팅 시스템 (`layout.tsx`, `page.tsx` 기반) |
| **`pages`** | Pages Router | 구버전(레거시) 파일 이름 기반 라우팅 시스템 |
| **`public`** | Static assets to be served | 이미지, 폰트 등 정적 리소스 제공 폴더 |
| **`src`** | Optional application source folder | 애플리케이션 코드를 격리 보관하는 선택적 소스 폴더 |

### 🔹 최상위 주요 파일 (Top-level files)
| 파일명 | 역할 및 설명 |
| :--- | :--- |
| **`next.config.js`** | 번들러, 리다이렉트, 이미지 도메인 등 Next.js 전역 설정 파일 |
| **`package.json`** | 프로젝트 의존성 라이브러리 및 실행 스크립트 정의 |
| **`instrumentation.ts`** | OpenTelemetry 및 계측, 서버 런타임 성능 모니터링 파일 |
| **`proxy.ts`** | Next.js 커스텀 요청 프록시 설정 |
| **`.env*`** | 환경 변수 설정 (`.env`, `.env.local`, `.env.production`, `.env.development`) |
| **`.eslintrc.json`** | ESLint 린트 규칙 설정 파일 (`*rc`: runtime configuration) |
| **`.gitignore`** | Git 버전 관리에서 제외할 대상 목록 정의 |
| **`next-env.d.ts`** | Next.js 전용 글로벌 TypeScript 타입 선언 파일 (자동 생성/수정 금지) |
| **`tsconfig.json`** | TypeScript 컴파일러 및 모듈 해석 설정 파일 |
| **`jsconfig.json`** | JavaScript 프로젝트용 모듈 경로 별칭 구성 파일 |

### 🔹 중첩 라우팅 (Nested routes)
Next.js App Router는 **디렉터리 구조가 곧 URL 세그먼트(URL Segments)**를 정의합니다.

- **디렉터리 중첩**: 폴더를 중첩하면 URL 세그먼트도 계층적으로 중첩됩니다.
- **레이아웃 중첩**: 상위 디렉터리의 레이아웃은 모든 하위 세그먼트를 감싸며 계층적으로 결합됩니다.
- **공개 경로**: 디렉터리 내에 `page.tsx` 또는 `route.ts`가 존재해야 실제 브라우저로 접근 가능한 경로가 됩니다.

| 파일 경로 (Path) | 브라우저 URL | 설명 (Notes) |
| :--- | :--- | :--- |
| **`app/layout.tsx`** | - | **루트 레이아웃**: 모든 경로를 감싸는 최상위 레이아웃 |
| **`app/blog/layout.tsx`** | - | **중첩 레이아웃**: `/blog` 및 그 하위 경로만 감싸는 레이아웃 |
| **`app/page.tsx`** | `/` | 루트 홈 공개 경로 |
| **`app/blog/page.tsx`** | `/blog` | 블로그 메인 공개 경로 (`app/layout` + `blog/layout` 결합) |
| **`app/blog/authors/page.tsx`** | `/blog/authors` | 블로그 작성자 목록 공개 경로 (모든 상위 레이아웃 누적 적용) |

---

## 1주차 (2026-09-02)


---

### 1. Next.js 개요 및 메타 프레임워크의 개념

### 🔹 Next.js란 무엇인가?
> *"Next.js는 풀스택 웹 애플리케이션 구축을 위한 React 프레임워크이다."*

- **메타 프레임워크(Meta-framework)**: 
  - JavaScript 라이브러리/프레임워크인 **React 위에 구축된 프레임워크**입니다.
  - React의 컴포넌트 기반 UI 구성 방식을 그대로 사용하면서, 웹 개발에 필수적인 번들러(Bundler), 컴파일러(Compiler) 등 복잡한 하위 도구 설정을 자동으로 구성해 줍니다.
  - 이를 통해 개발자는 번거로운 환경 설정 없이 비즈니스 로직과 UI 개발에 집중하여 **제품을 신속하게 개발하고 출시**할 수 있습니다.

---

### 2. 공식 문서(Docs) 구성 및 올바른 학습법

Next.js 공식 문서는 크게 3개의 카테고리로 구분되며, 목적에 맞춰 현명하게 접근해야 합니다.

| 카테고리 | 특징 및 권장 학습 방식 | 비고 |
| :--- | :--- | :--- |
| **Getting Started** | • 새 애플리케이션 생성부터 핵심 기능을 익히는 **단계별 튜토리얼**<br>• **가장 먼저 집중해서 학습해야 하는 필수 코스** | 입문 필수 |
| **Guides** | • 특정 개발 케이스나 사용 사례(Use Case)를 모아둔 영역<br>• 처음부터 완독하려 하지 말고, **필요한 사례가 있을 때 사전처럼 검색** | 케이스별 참고 |
| **API Reference** | • Next.js가 제공하는 모든 기술/API의 상세 스펙 명세서<br>• 모르는 문법이나 구체적인 옵션을 찾아보는 용도 (정독 비권장) | 레퍼런스 사전 |

> 💡 **Tip**: 기본 문서를 익힌 후 직접 프로젝트를 만들어보고 싶다면 공식 문서의 **'Learn' 코스**를 따라가 보는 것을 적극 추천합니다.

---

### 3. 프로젝트 구조 및 라우팅 시스템

### 🔹 App Router vs Pages Router

```
Next.js 라우터 변천사
┌─────────────────────────┐          ┌──────────────────────────┐
│      Pages Router       │  ───►    │        App Router        │
│  (~2023년 이전 레거시)    │          │  (2023년 정식 출시, 표준) │
└─────────────────────────┘          └──────────────────────────┘
```

1. **App Router (현재 표준 및 수업 진행 방식)**:
   - 2023년 정식 릴리즈된 이후 Next.js의 기본 표준 라우터입니다.
   - 프로젝트 생성 시(`create-next-app`) 사용 여부를 기본으로 선택하게 됩니다.
   - **신규 프로젝트는 예외 없이 App Router를 기준**으로 개발합니다.
2. **Pages Router (레거시 유지보수용)**:
   - 과거(5~6년 전 등) 제작된 구버전 프로젝트 유지보수/기능 추가 시 마주칠 수 있습니다.
   - 공식 문서 상단에서 `Using App Router` / `Pages Router` 및 버전(`v15`, `v14`, `v13`) 전환 셀렉터를 통해 레거시 문서도 열람 가능합니다.

### 🔹 파일 기반 라우팅: `layout.js`와 `page.js`
- **단위 구성**: 라우팅 폴더 내에서 **`layout.js`** 와 **`page.js`** 파일이 한 쌍을 이루어 하나의 라우트 단위를 구성합니다.
  - **`layout.js`**: 전체 공통 레이아웃 또는 특정 폴더 경로만의 고유한 레이아웃 구조를 정의 (상태 유지 및 불필요한 리렌더링 방지).
  - **`page.js`**: 해당 URL 경로에 실제로 렌더링되는 고유한 페이지 UI.

---

### 4. 서버 컴포넌트와 클라이언트 컴포넌트 (SSR & RSC)

### 🔹 서버 사이드 렌더링(SSR)의 역사와 현재
- 과거: React의 클라이언트 사이드 렌더링(CSR) 한계를 극복하고자 Next.js가 SSR을 선도적으로 구현.
- 현재: React 자체에서도 서버 사이드 렌더링 및 서버 컴포넌트(RSC) 아키텍처를 적극 도입하여 지원 중.
- *주의*: 1~2년 전 기술 서적 중 "React는 SSR이 안 되고 Next.js만 된다"는 식의 설명은 구버전 기준 설명이므로 최신 개념으로 이해해야 합니다.

### 🔹 컴포넌트 명시 및 선언
- Next.js App Router에서는 기본적으로 모든 컴포넌트가 **서버 컴포넌트(Server Component)**로 동작합니다.
- 브라우저 API(`window`, `document`), 이벤트 리스너(`onClick`), 상태/훅(`useState`, `useEffect`)이 필요한 경우 코드의 **최상단(첫 줄)**에 지시어를 명시해야 합니다:
  ```tsx
  'use client'; // 클라이언트 컴포넌트 선언

  import { useState } from 'react';

  export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>클릭: {count}</button>;
  }
  ```

---

### 5. Next.js 주요 내장 최적화 기능

### 🔹 이미지 최적화 (`next/image`)
- **수작업의 한계**: 모바일, 데스크톱, 고해상도 디스플레이(Retina)별 크기와 포맷(WebP, AVIF)을 일일이 수작업으로 리사이징하는 것은 엄청난 비용과 인력이 소모됨.
- **Next.js 자동 처리**: 
  - 원본 이미지 하나만 업로드하면 접속한 사용자의 기기, 화면 해상도, 브라우저 지원 포맷에 맞추어 **자동으로 리사이징 및 압축 최적화**하여 전송.

### 🔹 폰트 최적화 (`next/font`)
- 웹폰트 로딩 시 발생하는 레이아웃 이동(CLS) 현상을 방지하고 브라우저 로딩 속도를 극대화하도록 자동 인라인/셀프 호스팅 처리.

---

### 6. 배포 (Deployment) 및 실무 팁

- **호스팅 플랫폼**:
  - Next.js 개발사인 **Vercel**을 비롯하여 전용 최적화 배포를 지원하는 글로벌 호스팅 서비스가 다수 존재 (최근 국내 지원 플랫폼도 확대 추세).
  - 플랫폼별로 이미지/폰트 자동 최적화 처리 기능 포함 여부에 따라 호스팅 비용이나 티어에 차이가 있을 수 있음.
- **배포 방식**:
  - 기본 원리는 React 배포와 유사하며, `package.json`의 `scripts` 빌드/실행 명령어를 통해 제어.
  - GitHub Pages 외에 실무 및 토이 프로젝트에서 Vercel 등을 활용한 자동 배포 파이프라인 경험이 매우 유용.

---
