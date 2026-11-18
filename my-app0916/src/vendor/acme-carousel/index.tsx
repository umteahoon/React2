// 실제 npm의 acme-carousel 패키지 대신 사용하는 로컬 모의(mock) 모듈입니다.
// (해당 이름으로 최근 등록된 npm 패키지는 출처를 신뢰할 수 없어 설치하지 않았습니다.)
// "use client" 지시어 없이 useState/useEffect를 쓰는 서드파티 컴포넌트를 흉내 냅니다.
import { useEffect, useState } from 'react';

export type CarouselItem = {
  src: string;
  alt: string;
};

// named export: 좌우 버튼으로 직접 넘기는 기본 캐러셀
export function Carousel({ items }: { items: CarouselItem[] }) {
  const [index, setIndex] = useState(0);

  if (items.length === 0) return null;

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  return (
    <div className="acme-carousel">
      <button onClick={prev} aria-label="previous slide">
        ‹
      </button>
      <img src={items[index].src} alt={items[index].alt} />
      <button onClick={next} aria-label="next slide">
        ›
      </button>
    </div>
  );
}

// default export: 버튼 없이 일정 간격마다 자동으로 넘어가는 슬라이드
export default function Slide({
  items,
  interval = 3000,
}: {
  items: CarouselItem[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  if (items.length === 0) return null;

  return (
    <div className="acme-carousel acme-slide">
      <img src={items[index].src} alt={items[index].alt} />
    </div>
  );
}
