# React2

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

## 2주차 (2026-09-09)

*Next.js 수동 세팅, 환경 구성 및 파일 시스템 라우팅*

---

### 1. 프로젝트 수동 생성 (Manual Installation)

Next.js의 내부 구동 원리와 필수 구성 요소를 이해하기 위해 CLI 도구 없이 바닥부터 직접 프로젝트를 구축합니다.

### 🔹 프로젝트 초기화 및 핵심 라이브러리 설치
```bash
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
